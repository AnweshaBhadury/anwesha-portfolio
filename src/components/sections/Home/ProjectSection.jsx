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

  /* The scene is tall — provides scroll runway */
  .stack-scene {
    position: relative;
    z-index: 1;
  }

  /* The stage sticks for the full scroll runway */
  .stack-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    perspective: 1200px;
      align-items: flex-start;
      justify-content: center;
        padding-top: 45px;  
    overflow: hidden;
    background: #0a0a0f;
  }

  /* top/bottom fade so cards feel embedded */
  .stack-stage::before,
  .stack-stage::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 100px;
    z-index: 10;
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

  /* Each card sits in the same absolute position — fully overlapping */
  .project-card {
  position: absolute;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  will-change: transform, opacity;
}
    .card-inner {
  width: 92vw;
  height: 88vh;

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

  /* counter — top right of stage */
  .card-counter {
    position: absolute;
    top: 2rem;
    right: 2.5rem;
    z-index: 20;
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    user-select: none;
  }
  .card-counter em { font-style: normal; color: #7c3aed; }

  @media (max-width: 640px) {
    .card-inner { grid-template-columns: 1fr; }
    .card-image { min-height: 200px; }
  }
`;
const projects = [
  {
    id: 1,
    number: "01",
    title: "PII Masking System — Hackathon Winner",
    desc:
      "Award-winning web application that detects and masks Personally Identifiable Information (PII) from images and documents in real time using OCR and computer vision techniques.",
    tags: ["Python", "OpenCV", "EasyOCR", "Streamlit", "AI"],
    color: "#7c3aed",
    img: "/media/images/pii.png",
    link: "https://github.com/AnweshaBhadury/INNOVA-PII-MASKING-Hackathon",
  },

  {
    id: 2,
    number: "02",
    title: "Institute Management System",
    desc:
      "Full-stack system for managing student records, attendance, and academic workflows with structured database operations and user-friendly interfaces.",
    tags: ["Python", "Database", "CRUD", "System Design"],
    color: "#0ea5e9",
    img: "/media/images/IMS1.png",
    link: "https://github.com/AnweshaBhadury/Institute_Management_System",
  },

  {
    id: 3,
    number: "03",
    title: "Dataset Quality Analyzer",
    desc:
      "Tool for evaluating dataset completeness, consistency, and validity with automated checks to improve machine learning data reliability.",
    tags: ["Python", "Data Analysis", "Pandas", "ML"],
    color: "#10b981",
    img: "/media/images/DQA1.png",
    link: "https://github.com/AnweshaBhadury/Dataset-Quality-Analyser",
  },

  {
    id: 4,
    number: "04",
    title: "Personal Portfolio Website",
    desc:
      "Modern responsive portfolio built using Next.js with animations, project showcase, and contact functionality to present professional work.",
    tags: ["Next.js", "React", "CSS", "UI/UX"],
    color: "#f59e0b",
    img: "/media/images/ppw1.png",
    link: "#",
  },
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  useEffect(() => {
    const n = projects.length;

    const update = () => {
      if (!sceneRef.current) return;

      const rect = sceneRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // scrolled px into the scene (0 at top, n*vh at bottom)
      const scrolled = -rect.top;

      // progress: 0.0 → n.0  (each integer = one card fully in place)
      // Each card owns exactly 1 * vh of scroll distance
      const progress = Math.max(0, Math.min(scrolled / vh, n));

      setActiveIndex(Math.min(Math.floor(progress), n - 1));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // t = how far through this card's own scroll window we are
        // t < 0 : card hasn't come up yet (it's underneath, invisible)
        // t 0→1 : card is transitioning (going from front → back)
        // t > 1 : card is fully in the past (scaled back, mostly gone)
        const t = progress - i;

        let scale, translateY, opacity, zIndex;

        if (t <= 0) {
          // ── not reached yet ──
          // Card sits perfectly flat behind, completely hidden
          // Only the very next card (t is just slightly below 0) fades in
          // as it emerges — gives a clean "come from behind" feel
          const emerge = Math.max(0, t + 0.08) / 0.08; // 0→1 in last 8% of previous card
          scale      = 1;
          translateY = 0;
          opacity    = emerge;                  // invisible until its moment
          zIndex     = i;                       // behind everything

        } else if (t < 1) {
          // ── ACTIVE — this card is animating out ──
          // Directly tied 1:1 to scroll — no easing so it feels physical
          scale      = 1 - t * 0.13;           // 1.0 → 0.87
          translateY = -t * 35;                // slight upward drift as it recedes
          opacity    = 1 - t * 0.6;            // 1.0 → 0.4 then gone
          zIndex     = n + 10;                 // on top of everything

        } else {
          // ── passed — fully in the back ──
          const gone = t - 1;                  // 0 → ...
          scale      = Math.max(0.82, 0.87 - gone * 0.02);
          translateY = -35 - gone * 10;
          opacity    = Math.max(0, 0.4 - gone * 0.6);
          zIndex     = n - i;
        }

        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.opacity   = String(Math.max(0, opacity));
        card.style.zIndex    = String(zIndex);
      });
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // paint initial state
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="projects" className="projects-section">

      {/* Header scrolls past normally */}
      <div className="section-header">
        <span className="section-tag">Selected Work</span>
        <h2 className="section-title">My <span>Projects</span></h2>
      </div>

      {/*
        scene height = n * 100vh
        → each card gets exactly one full viewport-height of scroll travel
        → user scrolls at exactly their own speed, effect is 1:1 with finger
      */}
      <div
        className="stack-scene"
        ref={sceneRef}
        style={{ height: `${(projects.length + 1) * 100}vh` }}
      >
        <div className="stack-stage">

          {/* counter */}
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

                <div className="card-image">
                  <img src={project.img} alt={project.title} loading="lazy" />
                  <div
                    className="card-image-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}44 0%, transparent 55%)`,
                    }}
                  />
                </div>

                <div className="card-content">
                  <div>
                    <p className="card-number" style={{ color: project.color }}>
                      PROJECT {project.number}
                    </p>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.desc}</p>
                    <div className="card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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