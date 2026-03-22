"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import Navbar from "../../shared/navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --purple: #7c3aed;
    --purple-light: #a855f7;
    --dark: #0f0e17;
    --navy: #1a1a2e;
    --white: #ffffff;
    --gray: #6b7280;
    --bg: #fafafa;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hero-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--dark);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    padding-top: 72px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding-left: 6vw;
    padding-right: 0;
    overflow: hidden;
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* LEFT */
  .hero-left { position: relative; z-index: 2; padding-bottom: 3rem; }

  .anim { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .anim.visible { opacity: 1; transform: translateY(0); }

  .greeting {
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.1rem);
    color: var(--gray);
    margin-bottom: 0.35rem;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2.6rem, 5.5vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    margin-bottom: 1.4rem;
  }
  .hero-title .accent { color: var(--purple); }

  .hero-desc {
    font-size: clamp(0.84rem, 1.05vw, 0.94rem);
    line-height: 1.75;
    color: var(--gray);
    max-width: 420px;
    margin-bottom: 2.2rem;
    font-weight: 300;
  }

  .hero-btns {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2.8rem;
  }

  .btn-primary {
    background: var(--navy);
    color: #fff;
    padding: 0.75rem 1.6rem;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover {
    background: var(--purple);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(124,58,237,0.35);
  }

  .btn-outline {
    background: transparent;
    color: var(--purple);
    border: 1.5px solid var(--purple);
    padding: 0.73rem 1.6rem;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.2s, color 0.2s, transform 0.15s;
    cursor: pointer;
  }
  .btn-outline:hover {
    background: var(--purple);
    color: #fff;
    transform: translateY(-2px);
  }

  .socials { display: flex; gap: 0.9rem; }
  .social-link {
    width: 38px; height: 38px;
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    color: var(--gray);
    transition: border-color 0.2s, color 0.2s, transform 0.15s, background 0.2s;
  }
  .social-link:hover {
    border-color: var(--purple);
    color: var(--purple);
    transform: translateY(-2px);
    background: rgba(124,58,237,0.06);
  }

  /* RIGHT */
  .hero-right {
    position: relative;
    height: 100%;
    min-height: calc(100vh - 72px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
  }

  .blob {
    position: absolute;
    right: -5vw;
    top: 50%;
    transform: translateY(-50%);
    width: min(60vw, 580px);
    height: min(60vw, 580px);
    background: radial-gradient(ellipse at 60% 40%, #c4b5fd 0%, #7c3aed 45%, #4c1d95 100%);
    border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
    animation: blobMorph 8s ease-in-out infinite alternate;
    opacity: 0.18;
    pointer-events: none;
  }

  .arc {
  position: absolute;
  right: -2vw;
  bottom: 0;
  width: min(48vw, 520px);
  height: min(84vh, 720px);

  background: linear-gradient(
    160deg,
    #6d28d9 0%,
    #7c3aed 40%,
    #a855f7 100%
  );

  border-radius: 50% 50% 0 0 / 30% 30% 0 0;

  z-index: 1;
  opacity: 0;

  animation: arcIn 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) forwards;

  /* THIS makes the image stay inside the round shape */
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
  .hero-img-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  z-index: 2;
  opacity: 0;

  animation: imgIn 0.9s 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
}

  .hero-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;

    filter: drop-shadow(
      0 20px 40px rgba(76,29,149,0.35)
    );
}
  
  .badge {
    position: absolute;
    left: -30px;
    top: 30%;
    z-index: 3;
    background: #fff;
    border-radius: 14px;
    padding: 0.65rem 1rem;
    box-shadow: 0 8px 28px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.82rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    animation: badgeIn 0.7s 1s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .badge-dot {
    width: 8px; height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes blobMorph {
    0%   { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
    100% { border-radius: 40% 60% 45% 55% / 60% 40% 55% 45%; }
  }
  @keyframes arcIn {
    from { opacity: 0; transform: translateY(60px) scaleX(0.9); }
    to   { opacity: 1; transform: translateY(0) scaleX(1); }
  }
  @keyframes imgIn {
    from { opacity: 0; transform: translateY(50px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes badgeIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }

  @media (max-width: 768px) {
    .hero { grid-template-columns: 1fr; padding: 72px 6vw 2rem; }
    .hero-right { min-height: 55vw; margin-top: 2rem; }
    .arc { right: -6vw; width: 80vw; }
    .hero-img-wrap { width: 70vw; }
    .badge { left: 0; }
  }
`;

// SVG Icons
const GitHubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12
      c0 5.3 3.44 9.8 8.2 11.39
      .6.11.82-.26.82-.58
      0-.29-.01-1.06-.02-2.08
      -3.34.73-4.04-1.61-4.04-1.61
      -.55-1.4-1.34-1.77-1.34-1.77
      -1.09-.75.08-.74.08-.74
      1.2.08 1.83 1.23 1.83 1.23
      1.07 1.83 2.81 1.3 3.49.99
      .11-.78.42-1.3.76-1.6
      -2.67-.3-5.47-1.34-5.47-5.93
      0-1.31.47-2.38 1.23-3.22
      -.12-.3-.53-1.52.12-3.17
      0 0 1.01-.32 3.3 1.23
      .96-.27 1.98-.4 3-.4
      1.02 0 2.04.13 3 .4
      2.29-1.55 3.3-1.23 3.3-1.23
      .65 1.65.24 2.87.12 3.17
      .77.84 1.23 1.91 1.23 3.22
      0 4.6-2.8 5.63-5.48 5.92
      .43.37.81 1.1.81 2.22
      0 1.6-.01 2.89-.01 3.29
      0 .32.21.69.82.57
      C20.56 21.8 24 17.3 24 12
      24 5.37 18.63 0 12 0z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroHome() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const t = setTimeout(() => setVisible(true), 60);
    return () => {
      clearTimeout(t);
      document.head.removeChild(styleTag);
    };
  }, []);

  const delays = ["0s", "0.15s", "0.3s", "0.45s", "0.6s"];

  return (
    <div className="hero-page">
      <Navbar />

      {/* HERO */}
      <section id="home" className="hero">
        {/* LEFT */}
        <div className="hero-left">
          {[
            <p key="greeting" className="greeting">Hi, I am Anwesha Bhadury!</p>,
            <h1 key="title" className="hero-title">
              WEB <span className="accent">DESIGNER</span>
            </h1>,
            <p key="desc" className="hero-desc">
              Computer Science student with hands-on experience working with a startup, building real-world software solutions.
              Passionate about Machine Learning and driven to create intelligent systems that solve meaningful problems.
            </p>,
            <div key="btns" className="hero-btns">
              <a href="#projects" className="btn-primary">PROJECTS &lt;/&gt;</a>
              <a href="#" className="btn-outline">HIRE ME ↗</a>
            </div>,
            <div key="socials" className="socials">
              <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="social-link"><GitHubIcon /></a>
              <a href="https://www.instagram.com/anwesha_b07/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.linkedin.com/in/anwesha-bhadury-751376286/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
            </div>,
          ].map((el, i) => (
            <div
              key={i}
              className={`anim${visible ? " visible" : ""}`}
              style={{ transitionDelay: delays[i] }}
            >
              {el}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="blob" />
           {/* Arc clips the image into the rounded shape */}
          <div className="arc">
            <div className="hero-img-wrap">
              <Image
                  src="/media/images/hero.jpeg"
                  alt="Anwesha Bhadury — Web Designer"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}