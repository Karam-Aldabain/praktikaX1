import React from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#E2E2D2] text-[#141D26]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div>
          <h3 className="text-2xl font-extrabold leading-tight">Praktix</h3>
          <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-[#243447]/85">
            Join us in exploring real-world projects, mentorship, and career opportunities.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <SocialLink href="#" label="Facebook">
              <Facebook size={17} />
            </SocialLink>
            <SocialLink href="mailto:info@praktix.eu" label="Email">
              <Mail size={17} />
            </SocialLink>
            <SocialLink href="#" label="WhatsApp">
              <WhatsAppIcon />
            </SocialLink>
            <SocialLink href="#" label="LinkedIn">
              <Linkedin size={17} />
            </SocialLink>
            <SocialLink href="#" label="Instagram">
              <Instagram size={17} />
            </SocialLink>
          </div>
        </div>

        <FooterCol title="Explore">
          <FooterLink href="/for-individuals">For Individuals</FooterLink>
          <FooterLink href="/for-organizations">For Organizations</FooterLink>
          <FooterLink href="/insights">Insights</FooterLink>
          <FooterLink href="/about">About</FooterLink>
        </FooterCol>

        <FooterCol title="Participate">
          <FooterLink href="/contact">Become a Partner</FooterLink>
          <FooterLink href="/contact">Become a Co-Host</FooterLink>
          <FooterLink href="/contact" accent>
            Speaker Applications
          </FooterLink>
        </FooterCol>

        <div>
          <h4 className="text-2xl font-extrabold leading-tight">Connect</h4>
          <div className="mt-3 flex flex-col gap-2.5">
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/contact">Press</FooterLink>
            <FooterLink href="/contact">FAQ</FooterLink>
          </div>
        </div>

        <FooterCol title="Quick Links">
          <FooterLink href="/#method">Our Partners</FooterLink>
          <FooterLink href="/#experts">Our Experts</FooterLink>
          <FooterLink href="/#stories">Success Stories</FooterLink>
        </FooterCol>

        <div className="col-span-full mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-black/10 pt-4">
          <FooterLink href="/impressum">Impressum</FooterLink>
          <FooterLink href="/terms-of-use">Terms of Use</FooterLink>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
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

function FooterLink({ href, children, accent = false }) {
  return (
    <a
      href={href}
      className={[
        "text-[17px] font-medium leading-snug transition-colors hover:text-[#C51F5D]",
        accent ? "text-[#C51F5D]" : "text-[#243447]/80",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/55 text-[#243447] transition hover:border-[#C51F5D]/45 hover:text-[#C51F5D]"
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


