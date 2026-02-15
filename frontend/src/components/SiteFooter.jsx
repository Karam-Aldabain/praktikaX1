import React from "react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#E2E2D2]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-[#243447] sm:flex-row sm:px-6 lg:px-8">
        <div className="font-semibold text-[#141D26]">PraktikaX Legal</div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/impressum" className="font-semibold hover:text-[#C51F5D]">
            Impressum
          </a>
          <a href="/terms-of-use" className="font-semibold hover:text-[#C51F5D]">
            Terms of Use
          </a>
          <a href="/privacy-policy" className="font-semibold hover:text-[#C51F5D]">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

