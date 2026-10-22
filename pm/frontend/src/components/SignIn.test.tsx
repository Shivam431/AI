import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "@/lib/auth";
import { SignIn } from "@/components/SignIn";

const TestConsumer = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <span data-testid="user-display">{user || "guest"}</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

describe("Authentication & SignIn Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders sign in form with inputs and button", () => {
    render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error feedback on invalid credentials", async () => {
    render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/username/i), "wrong");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid credentials. Use username 'user' and password 'password'."
    );
  });

  it("logs in successfully with valid credentials and can log out", async () => {
    render(
      <AuthProvider>
        <SignIn />
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("user-display")).toHaveTextContent("guest");

    await userEvent.type(screen.getByLabelText(/username/i), "user");
    await userEvent.type(screen.getByLabelText(/password/i), "password");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByTestId("user-display")).toHaveTextContent("user");

    // Test logout
    await userEvent.click(screen.getByRole("button", { name: /log out/i }));
    expect(screen.getByTestId("user-display")).toHaveTextContent("guest");
  });
});
