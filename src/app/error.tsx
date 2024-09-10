"use client";

import { useEffect } from "react";
import axios from "axios";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    axios
      .post("https://about.digikala.com/api/v1/fel/sbm/", {
        error: String(error),
      })
      .then((res: any) => {})
      .catch((err: any) => {});
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-dvh flex flex-col gap-10 items-center justify-center">
      <span className="text-foreground/40 text-6xl">!</span>
      <h1 className="text-xl font-bold text-foreground/50">
        خطا در بارگذاری صفحه
      </h1>
      <br />
      <div
        className="rounded-xl ring-1 ring-primary p-3 text-primary gap-3 flex items-center justify-center ps-5 cursor-pointer"
        onClick={() => reset()}
      >
        تلاش مجدد
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 inline-flex"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
