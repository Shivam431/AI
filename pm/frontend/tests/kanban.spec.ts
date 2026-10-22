import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Clear localStorage before each test
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("shows sign in screen when unauthenticated", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  await expect(page.getByLabel("Username")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.locator('[data-testid^="column-"]')).toHaveCount(0);
});

test("rejects invalid credentials", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("wrongpassword");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByTestId("auth-error")).toContainText("Invalid credentials");
  await expect(page.locator('[data-testid^="column-"]')).toHaveCount(0);
});

test("authenticates with valid credentials, loads kanban, and logs out", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Kanban should now appear
  await expect(page.getByRole("heading", { name: "Kanban Studio" })).toBeVisible();
  await expect(page.locator('[data-testid^="column-"]')).toHaveCount(5);
  await expect(page.getByText("Signed in as user")).toBeVisible();

  // Log out
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  await expect(page.locator('[data-testid^="column-"]')).toHaveCount(0);
});

test("adds a card to a column when signed in", async ({ page }) => {
  const cardTitle = `Playwright card ${Date.now()}`;
  await page.goto("/");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  const firstColumn = page.locator('[data-testid^="column-"]').first();
  await firstColumn.getByRole("button", { name: /add a card/i }).click();
  await firstColumn.getByPlaceholder("Card title").fill(cardTitle);
  await firstColumn.getByPlaceholder("Details").fill("Added via e2e.");
  await firstColumn.getByRole("button", { name: /add card/i }).click();
  await expect(firstColumn.getByText(cardTitle)).toBeVisible();
});

test("moves a card between columns when signed in", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  const card = page.getByTestId("card-card-1");
  const targetColumn = page.getByTestId("column-col-review");
  const cardBox = await card.boundingBox();
  const columnBox = await targetColumn.boundingBox();
  if (!cardBox || !columnBox) {
    throw new Error("Unable to resolve drag coordinates.");
  }

  await page.mouse.move(
    cardBox.x + cardBox.width / 2,
    cardBox.y + cardBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    columnBox.x + columnBox.width / 2,
    columnBox.y + 120,
    { steps: 12 }
  );
  await page.mouse.up();
  await expect(targetColumn.getByTestId("card-card-1")).toBeVisible();
});

test("persists board state across page reloads via backend API", async ({ page }) => {
  const uniqueCardTitle = `Persistent Card ${Date.now()}`;
  await page.goto("/");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Rename first column to 'Priorities'
  const firstColumn = page.locator('[data-testid^="column-"]').first();
  const titleInput = firstColumn.getByLabel("Column title");
  await titleInput.clear();
  await titleInput.fill("Priorities");

  // Add a unique persistent card
  await firstColumn.getByRole("button", { name: /add a card/i }).click();
  await firstColumn.getByPlaceholder("Card title").fill(uniqueCardTitle);
  await firstColumn.getByPlaceholder("Details").fill("Stored in SQLite backend.");
  await firstColumn.getByRole("button", { name: /add card/i }).click();
  await expect(firstColumn.getByText(uniqueCardTitle)).toBeVisible();

  // Reload the browser page
  await page.reload();

  // Verify persistence from the database
  const reloadedFirstColumn = page.locator('[data-testid^="column-"]').first();
  await expect(reloadedFirstColumn.getByLabel("Column title")).toHaveValue("Priorities");
  await expect(page.getByText(uniqueCardTitle)).toBeVisible();
});

test("opens AI chat sidebar and interacts with the assistant", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Click AI Assistant button
  await page.getByRole("button", { name: "AI Assistant" }).click();
  const sidebar = page.getByTestId("ai-sidebar");
  await expect(sidebar).toBeVisible();

  // Verify initial greeting
  await expect(sidebar.getByText(/Hello! I am your AI project manager/i)).toBeVisible();

  // Mock /api/ai/chat route to test UI chat interaction and automatic board updates
  await page.route("/api/ai/chat", async (route) => {
    const json = {
      status: "success",
      message: "I have added a new Urgent task to your board.",
      boardUpdate: {
        columns: [
          { id: "col-backlog", title: "Backlog", cardIds: ["card-urgent-ai"] },
          { id: "col-discovery", title: "Discovery", cardIds: [] },
          { id: "col-progress", title: "In Progress", cardIds: [] },
          { id: "col-review", title: "Review", cardIds: [] },
          { id: "col-done", title: "Done", cardIds: [] },
        ],
        cards: {
          "card-urgent-ai": {
            id: "card-urgent-ai",
            title: "Urgent AI Feature",
            details: "Generated by AI assistant.",
          },
        },
      },
    };
    await route.fulfill({ json });
  });

  // Type message to AI
  await sidebar.getByPlaceholder(/Ask AI to add or organize cards/i).fill("Create an urgent feature card");
  await sidebar.getByRole("button", { name: "Send" }).click();

  // Assistant message displayed in sidebar
  await expect(sidebar.getByText("I have added a new Urgent task to your board.")).toBeVisible();

  // Board automatically updated with AI structured output
  await expect(page.getByText("Urgent AI Feature")).toBeVisible();

  // Close sidebar
  await sidebar.getByRole("button", { name: "Close assistant" }).click();
  await expect(sidebar).not.toBeVisible();
});
