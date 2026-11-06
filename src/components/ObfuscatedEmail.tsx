"use client";

import { useClientValue } from "@/lib/use-client-value";

// Email stored as reversed string — decoded only on the client after hydration
const ENCODED = "tp.odalegarana@ofni";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ObfuscatedEmail({ className, children }: Props) {
  const email = useClientValue<string | null>(
    () => ENCODED.split("").reverse().join(""),
    null,
  );

  if (!email) {
    // Render a non-clickable placeholder until JS hydrates
    return (
      <span className={className} aria-label="email address">
        {children ?? "info[at]anaragelado.pt"}
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children ?? email}
    </a>
  );
}
