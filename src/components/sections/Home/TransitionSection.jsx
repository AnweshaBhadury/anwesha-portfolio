"use client";

const WORDS = [
  "Web Design",
  "Machine Learning",
  "Frontend Dev",
  "Open Source",
  "Problem Solving",
  "System Design",
  "Research",
  "Innovation",
];

const TRACK = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

export default function TransitionSection() {
  return (
    <>
      <style jsx global>{`
        .ts-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;

          /*
            Smooth cinematic blending
          */
          background:
            linear-gradient(
              to bottom,
              rgba(5,5,10,0) 0%,
              rgba(10,10,15,0.96) 18%,
              rgba(10,10,15,0.96) 82%,
              rgba(10,10,15,0) 100%
            );

          padding: 48px 0;

          /*
            Reduced overlap so socials/buttons
            don't get hidden
          */
          margin-top: -40px;
          margin-bottom: -70px;

          z-index: 2;

          /*
            IMPORTANT
            prevents blocking clicks
          */
          pointer-events: none;
        }

        /* ATMOSPHERIC PURPLE GLOW */

        .ts-glow {
          position: absolute;

          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);

          width: 75%;
          height: 180%;

          background:
            radial-gradient(
              ellipse at center,
              rgba(124, 58, 237, 0.10) 0%,
              rgba(124, 58, 237, 0.05) 35%,
              transparent 75%
            );

          filter: blur(40px);

          pointer-events: none;

          z-index: 0;
        }

        /* SIDE FADES */

        .ts-fade-sides {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              #05050a 0%,
              transparent 8%,
              transparent 92%,
              #05050a 100%
            );

          pointer-events: none;

          z-index: 4;
        }

        /* ROW CONTAINER */

        .ts-rows {
          position: relative;

          z-index: 2;

          display: flex;
          flex-direction: column;

          gap: 4px;

          padding: 18px 0;

          transform: skewY(-3deg) translateY(-10px);

          opacity: 0.9;

          mix-blend-mode: screen;
        }

        /* ROW */

        .ts-row {
          display: flex;
          width: max-content;
          line-height: normal;
          will-change: transform;
        }

        .ts-row-1 {
          animation: tsScrollLeft 28s linear infinite;
        }

        .ts-row-2 {
          animation: tsScrollRight 34s linear infinite;
        }

        .ts-row-3 {
          animation: tsScrollLeft 22s linear infinite;
          animation-delay: -8s;
        }

        /* ITEM */

        .ts-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          padding: 9px 26px;

          font-family: "Bebas Neue", "Outfit", sans-serif;

          font-size: clamp(0.72rem, 1vw, 0.9rem);

          letter-spacing: 0.22em;

          text-transform: uppercase;

          white-space: nowrap;

          user-select: none;

          color: rgba(139, 92, 246, 0.42);

          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .ts-item:nth-child(even) {
          color: rgba(167, 139, 250, 0.62);
        }

        .ts-row-2 .ts-item {
          color: rgba(124, 58, 237, 0.28);
          font-size: clamp(0.65rem, 0.9vw, 0.8rem);
        }

        .ts-row-2 .ts-item:nth-child(even) {
          color: rgba(139, 92, 246, 0.45);
        }

        .ts-row-3 .ts-item {
          color: rgba(109, 40, 217, 0.20);
          font-size: clamp(0.60rem, 0.8vw, 0.72rem);
        }

        .ts-row-3 .ts-item:nth-child(even) {
          color: rgba(124, 58, 237, 0.32);
        }

        .ts-item:hover {
          color: rgba(220, 190, 255, 0.95);
          transform: translateY(-2px);
        }

        /* DIAMOND */

        .ts-diamond {
          width: 4px;
          height: 4px;

          background: rgba(124, 58, 237, 0.55);

          transform: rotate(45deg);

          flex-shrink: 0;
        }

        /* ANIMATIONS */

        @keyframes tsScrollLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes tsScrollRight {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {
          .ts-wrap {
            margin-top: -20px;
            margin-bottom: -50px;
            padding: 30px 0;
          }

          .ts-item {
            padding: 8px 18px;
            letter-spacing: 0.16em;
          }

          .ts-rows {
            transform: skewY(-2deg);
          }
        }

        /* REDUCED MOTION */

        @media (prefers-reduced-motion: reduce) {
          .ts-row-1,
          .ts-row-2,
          .ts-row-3 {
            animation: none;
          }
        }
      `}</style>

      <div className="ts-wrap" aria-hidden="true">

        {/* PURPLE GLOW */}
        <div className="ts-glow" />

        {/* MARQUEE ROWS */}
        <div className="ts-rows">

          <div className="ts-row ts-row-1">
            {TRACK.map((w, i) => (
              <span key={i} className="ts-item">
                <span className="ts-diamond" />
                {w}
              </span>
            ))}
          </div>

          <div className="ts-row ts-row-2">
            {[...TRACK].reverse().map((w, i) => (
              <span key={i} className="ts-item">
                <span className="ts-diamond" />
                {w}
              </span>
            ))}
          </div>

          <div className="ts-row ts-row-3">
            {TRACK.map((w, i) => (
              <span key={i} className="ts-item">
                <span className="ts-diamond" />
                {w}
              </span>
            ))}
          </div>

        </div>

        {/* SIDE FADE */}
        <div className="ts-fade-sides" />

      </div>
    </>
  );
}