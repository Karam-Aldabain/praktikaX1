import React, { useEffect, useState } from "react";

const KEY = "px_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    setVisible(saved !== "accepted");
  }, []);

  function accept() {
    window.localStorage.setItem(KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-[95] sm:left-auto sm:right-6 sm:max-w-md">
      <div className="rounded-2xl border border-white/10 bg-[#141D26]/96 p-4 text-[#E2E2D2] shadow-[0_20px_50px_rgba(0,0,0,0.30)] backdrop-blur">
        <p className="text-sm leading-relaxed text-[#E2E2D2]/85">
          We use cookies to enhance user experience and analyze traffic. See our{" "}
          <a href="/privacy-policy" className="font-bold text-[#C51F5D] underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-xl bg-[#F5C451] px-4 py-2 text-sm font-extrabold text-[#141D26] hover:bg-[#FFD36D]"
          >
            Accept
          </button>
          <a
            href="/privacy-policy"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-[#E2E2D2]/90 hover:bg-white/5"
          >
            Manage
          </a>
        </div>
      </div>
    </div>
  );
}
