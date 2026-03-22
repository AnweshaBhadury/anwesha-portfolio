"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── FOOTER WRAPPER ── */
  .footer {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    color: #fff;
    position: relative;
    overflow: hidden;
  }

  /* grid texture — same as projects section */
  .footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* purple glow blob bottom-center */
  .footer-glow {
    position: absolute;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── CTA BAND ── */
  .footer-cta {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 90px 24px 70px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .footer-cta-eyebrow {
    display: inline-block;
    font-size: 0.74rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #a855f7;
    border: 1px solid rgba(168,85,247,0.3);
    padding: 0.26rem 0.85rem;
    border-radius: 100px;
    margin-bottom: 1.4rem;
  }

  .footer-cta-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 5.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 1.6rem;
  }
  .footer-cta-heading .accent { color: #7c3aed; }

  .footer-cta-sub {
    font-size: clamp(0.88rem, 1.1vw, 1rem);
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    max-width: 420px;
    margin: 0 auto 2.4rem;
    line-height: 1.7;
  }

  .footer-cta-btns {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-cta-primary {
    background: #7c3aed;
    color: #fff;
    padding: 0.82rem 2rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-cta-primary:hover {
    background: #a855f7;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(124,58,237,0.4);
  }

  .btn-cta-outline {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 0.82rem 2rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
    cursor: pointer;
  }
  .btn-cta-outline:hover {
    border-color: #7c3aed;
    color: #fff;
    transform: translateY(-2px);
  }

  /* ── MAIN FOOTER GRID ── */
  .footer-body {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    padding: 60px 6vw 50px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  @media (max-width: 900px) {
    .footer-body { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .footer-body { grid-template-columns: 1fr; gap: 2rem; padding: 40px 6vw 36px; }
  }

  /* brand col */
  .footer-brand {}
  .footer-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: -0.03em;
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 1rem;
  }
  .footer-logo-dot { color: #7c3aed; font-size: 1.8rem; line-height: 0; }

  .footer-brand-desc {
    font-size: 0.86rem;
    line-height: 1.75;
    color: rgba(255,255,255,0.38);
    font-weight: 300;
    max-width: 260px;
    margin-bottom: 1.6rem;
  }

  .footer-socials {
    display: flex;
    gap: 0.7rem;
  }
  .footer-social {
    width: 36px; height: 36px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
    font-size: 0.85rem;
  }
  .footer-social:hover {
    border-color: #7c3aed;
    color: #fff;
    background: rgba(124,58,237,0.18);
    transform: translateY(-2px);
  }

  /* nav cols */
  .footer-col-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1.2rem;
  }

  .footer-col-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }
  .footer-col-links a {
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    transition: color 0.2s, padding-left 0.2s;
    display: inline-block;
  }
  .footer-col-links a:hover {
    color: #fff;
    padding-left: 4px;
  }

  /* availability pill */
  .footer-available {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.76rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    border: 1px solid rgba(16,185,129,0.3);
    background: rgba(16,185,129,0.07);
    padding: 0.3rem 0.75rem;
    border-radius: 100px;
    margin-top: 1.2rem;
  }
  .footer-available-dot {
    width: 7px; height: 7px;
    background: #10b981;
    border-radius: 50%;
    animation: fpulse 2s infinite;
  }
  @keyframes fpulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(1.5); }
  }

  /* ── BOTTOM BAR ── */
  .footer-bottom {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 6vw;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .footer-copy {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.22);
    font-weight: 300;
  }
  .footer-copy span { color: #7c3aed; }

  .footer-back-top {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,255,255,0.3);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;
    background: none;
    border: none;
  }
  .footer-back-top:hover {
    color: #a855f7;
    transform: translateY(-2px);
  }
  .footer-back-top svg {
    transition: transform 0.2s;
  }
  .footer-back-top:hover svg {
    transform: translateY(-3px);
  }

  /* ── reveal animation ── */
  .footer-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .footer-reveal.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`;

const navLinks = [
  { label: "Home",      href: "#" },
  { label: "About",     href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Blog",      href: "#" },
  { label: "Contact",   href: "#" },
];

const services = [
  { label: "Web Design",      href: "#" },
  { label: "UI/UX Design",    href: "#" },
  { label: "Brand Identity",  href: "#" },
  { label: "Prototyping",     href: "#" },
  { label: "Figma to Code",   href: "#" },
];

const contact = [
  { label: "anwesha@email.com",  href: "mailto:anwesha@email.com" },
  { label: "LinkedIn",           href: "#" },
  { label: "Dribbble",           href: "#" },
  { label: "Behance",            href: "#" },
];

// Social icons
const SocialFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const SocialInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const SocialLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const SocialDribbble = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
  </svg>
);

export default function Footer() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  // Intersection observer for reveal animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (i) => (el) => {
    revealRefs.current[i] = el;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-glow" />

      {/* ── BIG CTA ── */}
      <div
        className="footer-cta footer-reveal"
        ref={addReveal(0)}
        style={{ transitionDelay: "0s" }}
      >
        <span className="footer-cta-eyebrow">Open to Opportunities</span>
        <h2 className="footer-cta-heading">
          Let us Build<br />
          Something <span className="accent">Great</span>
        </h2>
        <p className="footer-cta-sub">
          Have a project in mind? I would love to hear about it. Let us turn your ideas
          into beautiful, functional digital experiences.
        </p>
        <div className="footer-cta-btns">
          <a href="mailto:anwesha@email.com" className="btn-cta-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send a Message
          </a>
          <a href="#" className="btn-cta-outline">
            View My Resume ↗
          </a>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        className="footer-body footer-reveal"
        ref={addReveal(1)}
        style={{ transitionDelay: "0.1s" }}
      >
        {/* Brand */}
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            EMMY<span className="footer-logo-dot">•</span>
          </a>
          <p className="footer-brand-desc">
            A passionate web designer crafting visually stunning and user-friendly
            digital experiences — one pixel at a time.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="Facebook"><SocialFacebook /></a>
            <a href="#" className="footer-social" aria-label="Instagram"><SocialInstagram /></a>
            <a href="#" className="footer-social" aria-label="LinkedIn"><SocialLinkedIn /></a>
            <a href="#" className="footer-social" aria-label="Dribbble"><SocialDribbble /></a>
          </div>
          <div className="footer-available">
            <span className="footer-available-dot" />
            Available for freelance
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="footer-col-title">Navigation</p>
          <ul className="footer-col-links">
            {navLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="footer-col-title">Services</p>
          <ul className="footer-col-links">
            {services.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="footer-col-title">Get In Touch</p>
          <ul className="footer-col-links">
            {contact.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} <span>Anwesha Bhadury</span>. All rights reserved.
        </p>
        <button className="footer-back-top" onClick={scrollToTop} aria-label="Back to top">
          Back to top
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>
    </footer>
  );
}