"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "../../shared/navbar";
import styles from "./HomeHero.module.css";

// ── icon components (unchanged) ──────────────────────────────────────────────
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

// ── component ────────────────────────────────────────────────────────────────
export default function HeroHome() {
  const hpRef       = useRef(null);
  const chipRef     = useRef(null);
  const nameRef     = useRef(null);
  const titleRef    = useRef(null);
  const descRef     = useRef(null);
  const btnsRef     = useRef(null);
  const socialsRef  = useRef(null);
  const photoRef    = useRef(null);
  const glowRef     = useRef(null);
  const shapeRef    = useRef(null);
  const gridRef     = useRef(null);
  const heroGlowRef = useRef(null);
  const btnPrimRef  = useRef(null);
  const btnOutRef   = useRef(null);

  useEffect(() => {

  (async () => {

    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const { SplitText } = await import("gsap/SplitText");

    gsap.registerPlugin(
      ScrollTrigger,
      SplitText
    );

    // ── SPLIT TEXT ─────────────────────────────────────

    const splitName = new SplitText(
      nameRef.current,
      { type: "chars" }
    );

    const splitTitle = new SplitText(
      titleRef.current,
      {
        type: "words, lines",
        linesClass: "line-wrap",
      }
    );

    splitTitle.lines.forEach((l) => {

      l.style.overflow = "hidden";
      l.style.display = "block";

    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    // ── INITIAL STATES ─────────────────────────────────

    gsap.set(
      [gridRef.current, heroGlowRef.current],
      { opacity: 0 }
    );

    // PHOTO STATIC
    gsap.set(photoRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    });

    // SHAPE STATIC
    gsap.set(shapeRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
    });

    gsap.set(
      [glowRef.current?.children ?? []],
      {
        opacity: 0,
        scale: 0.4,
      }
    );

    gsap.set(chipRef.current, {
      opacity: 0,
      x: -24,
    });

    gsap.set(splitName.chars, {
      opacity: 0,
      y: 16,
      rotateX: -40,
    });

    gsap.set(splitTitle.words, {
      opacity: 0,
      y: "110%",
      skewX: 6,
    });

    gsap.set(descRef.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(btnsRef.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(socialsRef.current, {
      opacity: 0,
      x: -16,
    });

    // ── GRID + GLOW ────────────────────────────────────

    tl.to(
      gridRef.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      heroGlowRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      0.1
    );

    tl.to(
      [glowRef.current?.children ?? []],
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: "power2.out",
      },
      0.15
    );

    // ── CHIP ──────────────────────────────────────────

    tl.to(
      chipRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: "back.out(2)",
      },
      0.5
    );

    // ── NAME ──────────────────────────────────────────

    tl.to(
      splitName.chars,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,

        duration: 0.55,

        stagger: {
          each: 0.032,
          ease: "power2.out",
        },

        ease: "back.out(1.4)",
      },
      0.65
    );

    // ── TITLE ─────────────────────────────────────────

    tl.to(
      splitTitle.words,
      {
        opacity: 1,
        y: "0%",
        skewX: 0,

        duration: 0.65,

        stagger: {
          each: 0.06,
          ease: "power3.out",
        },
      },
      0.95
    );

    // ── DESC + BUTTONS + SOCIALS ─────────────────────

    tl.to(
      descRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
      },
      1.5
    );

    tl.to(
      btnsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.6)",
      },
      1.65
    );

    tl.to(
      socialsRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
      1.8
    );

    // ── MAGNETIC BUTTONS ─────────────────────────────

    [btnPrimRef.current, btnOutRef.current].forEach((btn) => {

      if (!btn) return;

      btn.addEventListener("mousemove", (e) => {

        const r = btn.getBoundingClientRect();

        const dx =
          (e.clientX - r.left - r.width / 2) * 0.38;

        const dy =
          (e.clientY - r.top - r.height / 2) * 0.38;

        gsap.to(btn, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: "power2.out",
        });

      });

      btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        });

      });

    });

    // ── SOCIAL ICON BOUNCE ───────────────────────────

    socialsRef.current
      ?.querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("mouseenter", () => {

          gsap.fromTo(
            link,

            { y: 0 },

            {
              y: -6,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            }
          );

        });

      });

  })();

}, []);
  return (
    <div className={styles.hp} ref={hpRef}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroGrid}  ref={gridRef}></div>
        <div className={styles.heroGlow}  ref={heroGlowRef}></div>

        {/* LEFT */}
        <div className={styles.heroLeft}>

          <div ref={chipRef} className={styles.chip}>
            <span className={styles.chipDot}></span>
            Available For Work
          </div>

          <div>
            <p ref={nameRef} className={styles.heroName}>Anwesha Bhadury</p>

            <h1 ref={titleRef} className={styles.heroTitle}>
              COMPUTER <br />
              <span className={styles.outline} data-outline>SCIENCE</span>
              <br />
              <span className={styles.smallLine}>Student &amp; Developer</span>
            </h1>
          </div>

          <p ref={descRef} className={styles.heroDesc}>
            Computer Science student passionate about building
            modern web applications, intelligent systems,
            and impactful digital experiences.
            Experienced in startup environments and
            hackathon-winning projects.
          </p>

          <div ref={btnsRef} className={styles.heroBtns}>
            <a href="#projects" className={styles.btnPrimary} ref={btnPrimRef}>
              Projects →
            </a>
            <a href="#contact" className={styles.btnOutline} ref={btnOutRef}>
              Hire Me ↗
            </a>
          </div>

          <div ref={socialsRef} className={styles.socials}>
            <span className={styles.socialLabel}>Find Me</span>
            <a href="https://github.com/"    target="_blank" rel="noopener noreferrer" className={styles.socialLink}><GitHubIcon /></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><InstagramIcon /></a>
            <a href="https://linkedin.com/"  target="_blank" rel="noopener noreferrer" className={styles.socialLink}><LinkedInIcon /></a>
          </div>

        </div>

        {/* RIGHT */}
        <div className={styles.heroRight}>
          <div ref={glowRef}>
            <div className={`${styles.ambientGlow} ${styles.glow1}`}></div>
            <div className={`${styles.ambientGlow} ${styles.glow2}`}></div>
          </div>

          <div className={styles.floatingShape} ref={shapeRef}></div>

          <div
            className={styles.photoWrap}
            ref={photoRef}
          >
            <Image
              src="/media/images/hero.jpeg"
              alt="Anwesha Bhadury"
              fill
              priority
              sizes="(max-width: 900px) 70vw, 44vw"
              style={{ objectFit: "cover", objectPosition: "50% -5%" }}
            />
          </div>
        </div>

      </section>
    </div>
  );
}