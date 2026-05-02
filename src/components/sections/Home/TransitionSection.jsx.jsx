"use client";

import styles from "./TransitionSection.module.css";

const MARQUEE_TEXT = [
  "Building Systems",
  "Solving Problems",
  "Shipping Code",
  "Learning Constantly",
  "Designing Solutions",
  "Pushing Boundaries",
];

export default function TransitionSection() {
  const items = [...MARQUEE_TEXT, ...MARQUEE_TEXT];

  return (
    <div className={styles.transition}>
      {/* Top fade — white → transparent */}
      <div className={styles.fadeTop} />

      {/* Marquee strip */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeGlow} />
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeInner}>
            {items.map((text, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} />
                {text}
              </span>
            ))}
          </div>
          <div className={styles.marqueeInner} aria-hidden="true">
            {items.map((text, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade — transparent → dark */}
      <div className={styles.fadeBottom} />
    </div>
  );
}