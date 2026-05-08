"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .projects-section {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    color: #fff;
    position: relative;
  }
  .projects-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }
  .section-header {
    text-align: center;
    padding: 90px 0 60px;
    position: relative;
    z-index: 2;
  }
  .section-tag {
    display: inline-block;
    font-size: 0.76rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #a855f7;
    border: 1px solid rgba(168,85,247,0.35);
    padding: 0.28rem 0.9rem;
    border-radius: 100px;
    margin-bottom: 0.9rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .section-title span { color: #7c3aed; }

  /* ── Stack scene ── */
  .stack-scene {
    position: relative;
    z-index: 1;
  }
  .stack-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #0a0a0f;
  }
  .stack-stage::before,
  .stack-stage::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 120px;
    z-index: 50;
    pointer-events: none;
  }
  .stack-stage::before {
    top: 0;
    background: linear-gradient(to bottom, #0a0a0f 0%, transparent 100%);
  }
  .stack-stage::after {
    bottom: 0;
    background: linear-gradient(to top, #0a0a0f 0%, transparent 100%);
  }

  /* ── Card ── */
  .project-card {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    /* GSAP controls transform/opacity */
    will-change: transform, opacity;
  }
  .card-inner {
    width: 92vw;
    max-width: 1240px;
    height: 82vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #13111f;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
  }
  .card-image {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .card-image img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s ease;
  }
  .project-card:hover .card-image img { transform: scale(1.06); }
  .card-image-overlay { position: absolute; inset: 0; }
  .card-content {
    padding: 2.6rem 2.2rem 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-number {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    margin-bottom: 0.55rem;
  }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.25rem, 2.2vw, 1.65rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 0.85rem;
    color: #fff;
  }
  .card-desc {
    font-size: 0.87rem;
    line-height: 1.72;
    color: rgba(255,255,255,0.48);
    font-weight: 300;
    margin-bottom: 1.5rem;
    flex: 1;
  }
  .card-tags {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  .tag {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 0.22rem 0.65rem;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.11);
    color: rgba(255,255,255,0.55);
    background: rgba(255,255,255,0.04);
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn-view {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    font-weight: 500;
    color: #fff;
    background: #7c3aed;
    border: none;
    padding: 0.52rem 1.05rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    text-decoration: none;
  }
  .btn-view:hover { background: #a855f7; transform: translateY(-1px); }
  .card-arrow {
    width: 36px; height: 36px;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.45);
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
    cursor: pointer;
    font-size: 1rem;
  }
  .card-arrow:hover { border-color: #7c3aed; color: #a855f7; transform: rotate(45deg); }

  /* ── Counter ── */
  .card-counter {
    position: absolute;
    top: 2rem;
    right: 2.5rem;
    z-index: 60;
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    user-select: none;
  }
  .card-counter em { font-style: normal; color: #7c3aed; }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .project-card { padding: 18px; }
    .card-inner {
      width: 100%;
      height: auto;
      min-height: 82vh;
      grid-template-columns: 1fr;
      border-radius: 22px;
    }
    .card-image { height: 240px; min-height: 240px; }
    .card-content { padding: 1.5rem 1.3rem 1.4rem; }
    .card-title { font-size: 1.2rem; }
    .card-desc { font-size: 0.82rem; margin-bottom: 1.1rem; }
    .tag { font-size: 0.64rem; padding: 0.2rem 0.55rem; }
    .btn-view { font-size: 0.76rem; padding: 0.46rem 0.88rem; }
    .card-counter { top: 1.2rem; right: 1.2rem; font-size: 0.7rem; }
  }
`;

const projects = [
  {
    id: 1,
    number: "01",
    title: "PII Masking System — Hackathon Winner",
    desc: "Award-winning web application that detects and masks Personally Identifiable Information (PII) from images and documents in real time using OCR and computer vision techniques.",
    tags: ["Python", "OpenCV", "EasyOCR", "Streamlit", "AI"],
    color: "#7c3aed",
    img: "/media/images/pii.png",
    link: "https://github.com/AnweshaBhadury/INNOVA-PII-MASKING-Hackathon",
  },
  {
    id: 2,
    number: "02",
    title: "Institute Management System",
    desc: "Full-stack system for managing student records, attendance, and academic workflows with structured database operations and user-friendly interfaces.",
    tags: ["Python", "Database", "CRUD", "System Design"],
    color: "#0ea5e9",
    img: "/media/images/IMS1.png",
    link: "https://github.com/AnweshaBhadury/Institute_Management_System",
  },
  {
    id: 3,
    number: "03",
    title: "Dataset Quality Analyzer",
    desc: "Tool for evaluating dataset completeness, consistency, and validity with automated checks to improve machine learning data reliability.",
    tags: ["Python", "Data Analysis", "Pandas", "ML"],
    color: "#10b981",
    img: "/media/images/DQA1.png",
    link: "https://github.com/AnweshaBhadury/Dataset-Quality-Analyser",
  },
  {
    id: 4,
    number: "04",
    title: "Personal Portfolio Website",
    desc: "Modern responsive portfolio built using Next.js with animations, project showcase, and contact functionality to present professional work.",
    tags: ["Next.js", "React", "CSS", "UI/UX"],
    color: "#f59e0b",
    img: "/media/images/ppw1.png",
    link: "#",
  },
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const gsapCtxRef = useRef(null);

  /* ── Inject styles ── */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  /* ── GSAP ScrollTrigger setup ── */
  useEffect(() => {
    let ScrollTriggerLib;

    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod   = await import("gsap/ScrollTrigger");
      const gsap    = gsapMod.gsap || gsapMod.default;
      ScrollTriggerLib = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTriggerLib);

      const n     = projects.length;
      const cards = cardRefs.current;

      // ── Hard-set every card's resting state ─────────────────────────
      // Card 0  → fully visible in the center (the "active" starting card)
      gsap.set(cards[0], { y: 0, scale: 1, opacity: 1, zIndex: n });
      // Cards 1…n-1 → waiting below, full size & opacity so reverse looks right
      for (let i = 1; i < n; i++) {
        gsap.set(cards[i], { y: "100vh", scale: 1, opacity: 1, zIndex: i });
      }

      // ── One timeline per adjacent pair ──────────────────────────────
      // Transition i covers scroll range  [i × vh  →  (i+1) × vh]
      // relative to the top of sceneRef.
      //
      // Because we use `fromTo` for BOTH cards in BOTH directions:
      //   • forward  scroll → entering rises up,  leaving shrinks back
      //   • backward scroll → GSAP auto-reverses: entering drops back down,
      //                        leaving grows back to normal  ✓
      for (let i = 0; i < n - 1; i++) {
        const leaving  = cards[i];       // currently on screen → goes backward
        const entering = cards[i + 1];  // waiting below       → comes up

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:            sceneRef.current,
            start:              () => `top+=${i * window.innerHeight}px top`,
            end:                () => `top+=${(i + 1) * window.innerHeight}px top`,
            scrub:              1,          // lag = 1 s → silky physical feel
            invalidateOnRefresh: true,      // recomputes px offsets on resize
            onUpdate: (self) => {
              // Keep the counter in sync while scrubbing in either direction
              setActiveIndex(self.progress < 0.5 ? i : i + 1);
            },
          },
        });

        // ── Phase 1 (first half of scroll): leaving card exits first ─
        // Shrinks back, slides up, fades out completely.
        tl.fromTo(
          leaving,
          { y: 0,   scale: 1,    opacity: 1, zIndex: n },
          { y: -60, scale: 0.80, opacity: 0, zIndex: n,
            ease: "power2.inOut", duration: 1 },
          0     // starts at timeline position 0
        );

        // ── Phase 2 (second half of scroll): entering card rises ──────
        // Only begins after leaving card has fully exited.
        tl.fromTo(
          entering,
          { y: "100vh", scale: 1, opacity: 1, zIndex: n + 1 },
          { y: 0,       scale: 1, opacity: 1, zIndex: n + 1,
            ease: "power2.out", duration: 1 },
          1     // starts at timeline position 1 (sequentially after leaving)
        );
      }

      ScrollTriggerLib.refresh();
    };

    init();

    return () => {
      if (ScrollTriggerLib) ScrollTriggerLib.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <span className="section-tag">Selected Work</span>
        <h2 className="section-title">
          My <span>Projects</span>
        </h2>
      </div>

      {/*
        The scene is (n × 100vh) tall — as the user scrolls through it,
        the sticky stage pins to the viewport and GSAP scrubs the transitions.
      */}
      <div
        className="stack-scene"
        ref={sceneRef}
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="stack-stage" ref={stageRef}>
          {/* Floating counter */}
          <div className="card-counter">
            <em>{String(activeIndex + 1).padStart(2, "0")}</em>
            &thinsp;/&thinsp;
            {String(projects.length).padStart(2, "0")}
          </div>

          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="card-inner">
                {/* Image */}
                <div className="card-image">
                  <img src={project.img} alt={project.title} />
                  <div
                    className="card-image-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}44 0%, transparent 55%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="card-content">
                  <div>
                    <p className="card-number" style={{ color: project.color }}>
                      PROJECT {project.number}
                    </p>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.desc}</p>
                    <div className="card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view"
                    >
                      View Project
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <div className="card-arrow">↗</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}