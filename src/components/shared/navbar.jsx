import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home",      href: "/"          },
  { label: "About",     href: "#about"     },
  { label: "Projects", href: "#projects" },
  //{ label: "Blog",      href: "/blog"      },
  { label: "Contact",   href: "/contact"   },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.navLogo}>
        Anwesha<span className={styles.navLogoDot}>•</span>
      </a>

      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <a href="/contact" className={styles.navCta}>Let us Talk</a>

      <button className={styles.navHamburger} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}