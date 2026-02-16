import React from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { useLocalTheme } from "../hooks/use-local-theme";

export default function SiteFooter() {
  const { theme } = useLocalTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={[
        "border-t",
        isDark ? "border-white/10 bg-[#141D26] text-[#E2E2D2]" : "border-black/10 bg-[#E2E2D2] text-[#141D26]",
      ].join(" ")}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div>
          <h3 className="text-2xl font-extrabold leading-tight">Praktix</h3>
          <p
            className={[
              "mt-3 max-w-[240px] text-sm leading-relaxed",
              isDark ? "text-[#E2E2D2]/85" : "text-[#243447]/85",
            ].join(" ")}
          >
            Join us in exploring real-world projects, mentorship, and career opportunities.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <SocialLink href="#" label="Facebook" dark={isDark}>
              <Facebook size={17} />
            </SocialLink>
            <SocialLink href="mailto:info@praktix.eu" label="Email" dark={isDark}>
              <Mail size={17} />
            </SocialLink>
            <SocialLink href="#" label="WhatsApp" dark={isDark}>
              <WhatsAppIcon />
            </SocialLink>
            <SocialLink href="#" label="LinkedIn" dark={isDark}>
              <Linkedin size={17} />
            </SocialLink>
            <SocialLink href="#" label="Instagram" dark={isDark}>
              <Instagram size={17} />
            </SocialLink>
          </div>
        </div>

        <FooterCol title="Explore">
          <FooterLink href="/for-individuals" dark={isDark}>For Individuals</FooterLink>
          <FooterLink href="/for-organizations" dark={isDark}>For Organizations</FooterLink>
          <FooterLink href="/insights" dark={isDark}>Insights</FooterLink>
          <FooterLink href="/about" dark={isDark}>About</FooterLink>
        </FooterCol>

        <FooterCol title="Participate">
          <FooterLink href="/contact" dark={isDark}>Become a Partner</FooterLink>
          <FooterLink href="/contact" dark={isDark}>Become a Co-Host</FooterLink>
          <FooterLink href="/contact" accent dark={isDark}>
            Become an Expert
          </FooterLink>
        </FooterCol>

        <div>
          <h4 className="text-2xl font-extrabold leading-tight">Connect</h4>
          <div className="mt-3 flex flex-col gap-2.5">
            <FooterLink href="/contact" dark={isDark}>Contact Us</FooterLink>
            <FooterLink href="/contact" dark={isDark}>FAQ</FooterLink>
          </div>
        </div>

        <FooterCol title="Quick Links">
          <FooterLink href="/#method" dark={isDark}>Our Partners</FooterLink>
          <FooterLink href="/#experts" dark={isDark}>Our Experts</FooterLink>
          <FooterLink href="/#stories" dark={isDark}>Success Stories</FooterLink>
        </FooterCol>

        <div
          className={[
            "col-span-full mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t pt-4",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          <FooterLink href="/impressum" dark={isDark}>Impressum</FooterLink>
          <FooterLink href="/terms-of-use" dark={isDark}>Terms of Use</FooterLink>
          <FooterLink href="/privacy-policy" dark={isDark}>Privacy Policy</FooterLink>
          <span className={["text-[15px] font-medium", isDark ? "text-[#E2E2D2]/65" : "text-[#243447]/65"].join(" ")}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="text-2xl font-extrabold leading-tight">{title}</h4>
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, accent = false, dark = false }) {
  return (
    <a
      href={href}
      className={[
        "text-[17px] font-medium leading-snug transition-colors hover:text-[#C51F5D]",
        accent ? "text-[#C51F5D]" : dark ? "text-[#E2E2D2]/80" : "text-[#243447]/80",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function SocialLink({ href, label, children, dark = false }) {
  const brand = {
    Facebook: { bg: "#1877F2", border: "#1877F2" },
    Email: { bg: "#243447", border: "#243447" },
    WhatsApp: { bg: "#25D366", border: "#25D366" },
    LinkedIn: { bg: "#0A66C2", border: "#0A66C2" },
    Instagram: { bg: "#E4405F", border: "#E4405F" },
  }[label] || { bg: dark ? "#243447" : "#E2E2D2", border: dark ? "#3B4D63" : "#C9CCBF" };

  return (
    <a
      href={href}
      aria-label={label}
      style={{
        backgroundColor: brand.bg,
        borderColor: brand.border,
      }}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border text-white shadow-[0_8px_20px_rgba(20,29,38,0.18)] transition",
        "hover:scale-[1.04] hover:brightness-105",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 11.8c0 4.6-3.8 8.4-8.4 8.4-1.5 0-2.9-.4-4.1-1l-3.7 1 1-3.6a8.3 8.3 0 0 1-1.2-4.2C3.6 7.8 7.4 4 12 4s8 3.8 8 7.8Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.8c-.2.1-.7 1-.7 1.3 0 .3.5 1.3 1.1 2 .7.9 1.9 1.9 3.1 2.4.5.2 1 .3 1.3.2.4-.1 1.1-.8 1.2-1.1.1-.2.1-.3 0-.4l-1.3-.6a.5.5 0 0 0-.6.1l-.4.5c-.1.1-.2.1-.3.1-.5-.2-1.6-1-2.1-1.6-.1-.1-.1-.2 0-.3l.3-.4a.6.6 0 0 0 0-.7l-.6-1.2c-.1-.2-.2-.3-.4-.3h-.6Z"
        fill="currentColor"
      />
    </svg>
  );
}


