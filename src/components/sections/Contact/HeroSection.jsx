"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.o})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: Inter, sans-serif;

          background-image: url("/media/images/contacthero.png");
          background-size: cover;
          background-position: center;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,10,15,0.75),
            rgba(10,10,15,0.9)
          );
          z-index: 1;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          max-width: 720px;
          padding: 0 24px;
        }

        .hero-tag {
          font-size: 13px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #a855f7;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .hero-title span {
          color: #7c3aed;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
        }

      `}</style>

      <section className="hero">

        <div className="overlay" />

        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">

          <div className="hero-tag">
            CONTACT
          </div>

          <h1 className="hero-title">
            Let’s <span>Connect</span>
          </h1>

          <p className="hero-subtitle">
            Whether you have an internship opportunity,
            project idea, or collaboration in mind —
            feel free to reach out.
          </p>

        </div>

      </section>
    </>
  );
}