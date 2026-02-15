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
    <main className="min-h-screen bg-[#F2F1E7] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-black/10 bg-[color:#E2E2D2] shadow-[0_22px_70px_rgba(20,29,38,0.10)]">
        <div className="border-b border-black/10 bg-[linear-gradient(135deg,#243447,#141D26)] px-6 py-7 sm:px-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
        </div>
        <div className="space-y-8 px-6 py-8 text-[#141D26] sm:px-10 sm:py-10">{children}</div>
      </section>
    </main>
  );
}


