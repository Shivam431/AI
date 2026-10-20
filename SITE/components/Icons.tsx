import React from "react";

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function TerminalIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="20" height="20" className={className} style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function CpuIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="24" height="24" className={className} style={{ width: "24px", height: "24px", minWidth: "24px", minHeight: "24px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  );
}

export function LayersIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="24" height="24" className={className} style={{ width: "24px", height: "24px", minWidth: "24px", minHeight: "24px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="24" height="24" className={className} style={{ width: "24px", height: "24px", minWidth: "24px", minHeight: "24px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ZapIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="24" height="24" className={className} style={{ width: "24px", height: "24px", minWidth: "24px", minHeight: "24px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function BriefcaseIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="20" height="20" className={className} style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function GraduationCapIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="24" height="24" className={className} style={{ width: "24px", height: "24px", minWidth: "24px", minHeight: "24px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

export function MailIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="20" height="20" className={className} style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px", flexShrink: 0, ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

export function BotIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="20" height="20" className={className} style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export function SendIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function XIcon({ className = "w-4 h-4", style }: IconProps) {
  return (
    <svg width="16" height="16" className={className} style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function MessageSquareIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg width="20" height="20" className={className} style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px", ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
