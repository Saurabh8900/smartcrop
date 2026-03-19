"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <LanguageProvider>{children}</LanguageProvider>
    </SessionProvider>
  );
}
