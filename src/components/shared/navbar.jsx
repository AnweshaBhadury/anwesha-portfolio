"use client";

import { useEffect } from "react";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6vw;
    height: 72px;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(13, 13, 26, 0.45);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(124, 58, 237, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    color: #ffffff;
  }
  .nav-logo-dot {
    color: #7c3aed;
    font-size: 1.7rem;
    line-height: 0;
    margin-left: 1px;
  }

  .nav-links {
    display: flex;
    gap: 2.2rem;
    list-style: none;
  }
  .nav-links a {
    text-decoration: none;
    color: #e2d9f3;
    font-size: 0.92rem;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    transition: color 0.2s;
  }
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 2px;
    background: #a855f7;
    border-radius: 2px;
    transition: width 0.25s ease;
  }
  .nav-links a:hover { color: #a855f7; }
  .nav-links a:hover::after { width: 100%; }

  .nav-cta {
    background: #7c3aed;
    color: #fff;
    padding: 0.5rem 1.3rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .nav-cta:hover {
    background: #a855f7;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
  }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
    background: none;
    border: none;
  }
  .nav-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #e2d9f3;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
  }
`;

const navLinks = [
  { label: "Home",      href: "/"          },
  { label: "About",     href: "#about"     },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog",      href: "/blog"      },
  { label: "Contact",   href: "/contact"   },
];

export default function Navbar() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = navStyles;
    document.head.appendChild(styleTag);
    //return () => document.head.removeChild(styleTag);
  }, []);
  return (
    <nav className="nav">
      {/* Logo */}
      <a href="#home" className="nav-logo">
        Anwesha<span className="nav-logo-dot">•</span>
      </a>

      {/* Links */}
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#" className="nav-cta">Let us Talk</a>

      {/* Mobile hamburger */}
      <button className="nav-hamburger" aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}