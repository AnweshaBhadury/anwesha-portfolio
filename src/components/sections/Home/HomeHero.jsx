"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../../shared/navbar";
import styles from "./HomeHero.module.css";

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="18" cy="6" r="1"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7H10V9h4v1.77A6 6 0 0116 8z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function HeroHome() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.hp}>

      <Navbar />

      <section className={styles.hero}>

        <div className={styles.heroGrid}></div>
        <div className={styles.heroGlow}></div>

        {/* LEFT */}

        <div className={styles.heroLeft}>

          <div className={`${styles.fade} ${visible ? styles.in : ""}`}>

            <div className={styles.chip}>
              <span className={styles.chipDot}></span>
              Available For Work
            </div>

          </div>

          <div className={`${styles.fade} ${visible ? styles.in : ""}`}>

            <p className={styles.heroName}>
              Anwesha Bhadury
            </p>

            <h1 className={styles.heroTitle}>
              COMPUTER <br />
              <span className={styles.outline}>
                SCIENCE
              </span>
              <br />
              <span className={styles.smallLine}>
                Student & Developer
              </span>
            </h1>

          </div>

          <div className={`${styles.fade} ${visible ? styles.in : ""}`}>

            <p className={styles.heroDesc}>
              Computer Science student passionate about building
              modern web applications, intelligent systems,
              and impactful digital experiences.
              Experienced in startup environments and
              hackathon-winning projects.
            </p>

          </div>

          <div className={`${styles.fade} ${visible ? styles.in : ""}`}>

            <div className={styles.heroBtns}>

              <a href="#projects" className={styles.btnPrimary}>
                Projects →
              </a>

              <a href="#contact" className={styles.btnOutline}>
                Hire Me ↗
              </a>

            </div>

          </div>

          <div className={`${styles.fade} ${visible ? styles.in : ""}`}>

            <div className={styles.socials}>

              <span className={styles.socialLabel}>
                Find Me
              </span>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <GitHubIcon />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <InstagramIcon />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <LinkedInIcon />
              </a>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className={styles.heroRight}>

          <div className={`${styles.ambientGlow} ${styles.glow1}`}></div>
          <div className={`${styles.ambientGlow} ${styles.glow2}`}></div>

          <div className={styles.floatingShape}></div>

          <div className={styles.photoWrap}>

            <Image
              src="/media/images/hero.jpeg"
              alt="Anwesha Bhadury"
              fill
              priority
              sizes="(max-width: 900px) 70vw, 44vw"
              style={{
                objectFit:"cover",
                objectPosition:"50% -5%"
              }}
            />

          </div>

        </div>

      </section>

    </div>
  );
}