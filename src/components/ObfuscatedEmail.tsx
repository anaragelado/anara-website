"use client";

import { useEffect, useState } from "react";

// Email stored as reversed string — decoded only on the client after hydration
const ENCODED = "tp.odalegarana@ofni";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ObfuscatedEmail({ className, children }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(ENCODED.split("").reverse().join(""));
  }, []);

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
