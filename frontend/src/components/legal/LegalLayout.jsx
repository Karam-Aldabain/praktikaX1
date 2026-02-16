import React, { useEffect } from "react";

export default function LegalLayout({ title, children }) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaName = "robots";
    let robots = document.querySelector(`meta[name="${metaName}"]`);
    const prevContent = robots?.getAttribute("content") || null;

    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", metaName);
      document.head.appendChild(robots);
    }

    document.title = `${title} | Praktix`;
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = prevTitle;
      if (prevContent) {
        robots.setAttribute("content", prevContent);
      } else {
        robots.remove();
      }
    };
  }, [title]);

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_500px_at_10%_-10%,rgba(36,52,71,0.08),transparent_60%),radial-gradient(900px_420px_at_90%_0%,rgba(197,31,93,0.10),transparent_62%),#F6F4EC] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-black/10 bg-[#FCFBF8] shadow-[0_20px_55px_rgba(20,29,38,0.10)]">
        <div className="relative border-b border-black/10 bg-[linear-gradient(135deg,#243447,#1C2733)] px-6 py-7 sm:px-10">
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(90deg,#C51F5D,transparent)]" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
        </div>
        <div className="space-y-8 px-6 py-8 text-[#141D26] sm:px-10 sm:py-10">{children}</div>
      </section>
    </main>
  );
}


