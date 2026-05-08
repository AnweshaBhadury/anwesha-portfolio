"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.css";

const experienceData = [
  {
    id: 1,
    role: "Freelancer – Senior Associate",
    company: "Erfolgwerke",
    period: "Sep 2025 – Present",
    points: [
      "Built backend using Sanity CMS, Node.js and React",
      "Delivered production-level projects",
      "Performed testing, debugging, and communication",
    ],
    side: "left",
  },
  {
    id: 2,
    role: "Summer Intern",
    company: "IIT Guwahati",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Implemented Prim's Algorithm using Fibonacci Heap",
      "Optimized priority queue operations",
      "Conducted research work",
    ],
    side: "right",
  },
  {
    id: 3,
    role: "Hackathon Winner",
    company: "Innova Hackathon 2025",
    period: "2025",
    points: [
      'Team leader of "404 Not Found"',
      "Built AI-based PII masking system",
    ],
    side: "left",
  },
];

const educationData = [
  {
    id: 1,
    degree: "B.Tech – Computer Science and Engineering",
    institution: "Government College of Engineering and Textile Technology",
    period: "2023 – 2027",
    detail: "CGPA: 8.36",
    side: "left",
  },
  {
    id: 2,
    degree: "Higher Secondary (Science)",
    institution: "SKS Public School",
    period: "Apr 2020 – Mar 2023",
    detail: "Grade: 90.0%",
    side: "right",
  },
  {
    id: 3,
    degree: "Secondary Education",
    institution: "SKS Public School",
    period: "Apr 2017 – Mar 2020",
    detail: "Grade: 96.7%",
    side: "left",
  },
  {
    id: 4,
    degree: "Primary & Middle School Education",
    institution: "Eastern Railway High School",
    period: "Jan 2011 – Mar 2017",
    detail: "",
    side: "right",
  },
];

function useIntersection(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  },);

  return [ref, visible];
}

function TimelineItem({ item, index, type }) {
  const [ref, visible] = useIntersection();
  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      className={`${styles.timelineItem} ${isLeft ? styles.itemLeft : styles.itemRight} ${visible ? styles.itemVisible : ""}`}
      style={{ "--delay": `${index * 0.15}s` }}
    >
      <div className={styles.timelineDotWrapper}>
        <span className={styles.dot} />
        <span className={styles.dotRing} />
      </div>

      <div className={`${styles.card} ${isLeft ? styles.cardLeft : styles.cardRight}`}>
        <div className={styles.cardGlow} />
        {type === "exp" ? (
          <>
            <p className={styles.cardPeriod}>{item.period}</p>
            <h3 className={styles.cardRole}>{item.role}</h3>
            <p className={styles.cardCompany}>{item.company}</p>
            <ul className={styles.cardPoints}>
              {item.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {item.period && <p className={styles.cardPeriod}>{item.period}</p>}
            <h3 className={styles.cardRole}>{item.degree}</h3>
            {item.institution && (
              <p className={styles.cardCompany}>{item.institution}</p>
            )}
            {item.detail && <p className={styles.cardDetail}>{item.detail}</p>}
          </>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  const [ref, visible] = useIntersection();
  return (
    <div ref={ref} className={`${styles.sectionLabel} ${visible ? styles.labelVisible : ""}`}>
      <span className={styles.labelLine} />
      <span className={styles.labelText}>{children}</span>
      <span className={styles.labelLine} />
    </div>
  );
}

export default function AboutSection() {
  const [heroRef, heroVisible] = useIntersection({ threshold: 0.1 });

  return (
    <section className={styles.about} id="about">
      {/* Background grid */}
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.gradientOrb1} aria-hidden="true" />
      <div className={styles.gradientOrb2} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── ABOUT ME ── */}
        <div
          ref={heroRef}
          className={`${styles.heroBlock} ${heroVisible ? styles.heroVisible : ""}`}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            About Me
          </div>
          <h2 className={styles.heroHeading}>
            Building the future,{" "}
            <span className={styles.gradientText}>one system at a time.</span>
          </h2>
          <p className={styles.heroPara}>
            I am a Computer Science undergraduate with a sharp focus on{" "}
            <em>Artificial Intelligence</em>, <em>Machine Learning</em>, and{" "}
            <em>Data Structures</em>. My passion lies in architecting real-world
            systems that solve genuine problems — from AI-powered privacy tools
            to algorithmically-optimised graph solutions. I thrive at the
            intersection of rigorous problem-solving and continuous learning,
            always pushing to ship code that matters.
          </p>
          <div className={styles.tagRow}>
            {["AI / ML", "Data Structures", "System Design", "Research", "Open Source"].map(
              (t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        {/* ── EXPERIENCE ── */}
        <SectionLabel>Experience</SectionLabel>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine} />
          {experienceData.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="exp" />
          ))}
        </div>

        {/* ── EDUCATION ── */}
        <SectionLabel>Education</SectionLabel>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine} />
          {educationData.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="edu" />
          ))}
        </div>
      </div>
    </section>
  );
}