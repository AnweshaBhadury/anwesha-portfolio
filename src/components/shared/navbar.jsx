"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  //{ label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <>

      <nav className={styles.nav}>

        <a href="/" className={styles.navLogo}>
          Anwesha
          <span className={styles.navLogoDot}>•</span>
        </a>

        {/* DESKTOP LINKS */}

        <ul className={styles.navLinks}>

          {navLinks.map((link) => (

            <li key={link.label}>

              <a href={link.href}>
                {link.label}
              </a>

            </li>

          ))}

        </ul>

        {/* DESKTOP CTA */}

        <a href="/contact" className={styles.navCta}>
          Let us Talk
        </a>

        {/* MOBILE HAMBURGER */}

        <button
          className={styles.navHamburger}
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >

          <span />
          <span />
          <span />

        </button>

      </nav>

      {/* MOBILE SIDEBAR */}

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >

        <div className={styles.mobileMenuHeader}>

          <span className={styles.mobileLogo}>
            Anwesha
          </span>

          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

        </div>

        <div className={styles.mobileLinks}>

          {navLinks.map((link) => (

            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>

          ))}

        </div>

        <a
          href="/contact"
          className={styles.mobileCta}
        >
          Let us Talk
        </a>

      </div>

      {/* BACKDROP */}

      <div
        className={`${styles.backdrop} ${
          menuOpen ? styles.backdropShow : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

    </>

  );
}