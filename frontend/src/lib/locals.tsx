"use client";

import { usePathname } from "next/navigation";

const localeRTLList = ["ar", "he"];

export function useIsRTL() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // assumes /en/some-page

  const isRTL = localeRTLList.includes(locale);

  return {
    isRTL,
    alignLeft: isRTL ? "right" : "left",
    alignRight: isRTL ? "left" : "right",
  };
}
