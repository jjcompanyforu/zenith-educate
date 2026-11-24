import { useRef } from 'react';
import usePointerTilt from '../hooks/usePointerTilt.js';

export default function Hero() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const innerRef = useRef(null);
  usePointerTilt(heroRef, innerRef, { xVar: '--rx', yVar: '--ry', maxX: 14, maxY: 22, measureRef: sceneRef, clamp: 0.8 });

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">EDUCATION THAT MOVES YOU FORWARD</div>
          <h1>
            Your next chapter
            <br />
            starts with <em>learning.</em>
          </h1>
          <p>
            Build confidence, develop in-demand skills and move closer to your goals with expert-led training at
            Zenith Educate.
          </p>
          <div className="actions">
            <a className="btn" href="#programmes">
              Explore programmes ↗
            </a>
            <a href="#about">Discover Zenith →</a>
          </div>
          <div className="proof">
            <div>
              <b>25+ years</b>
              <small>of learning experience</small>
            </div>
            <div>
              <b>Career-focused</b>
              <small>learning pathways</small>
            </div>
          </div>
        </div>

        <div className="scene" ref={sceneRef}>
          <div className="scene-inner" ref={innerRef}>
            <div className="layer s-ring" aria-hidden="true" />
            <div className="layer s-arch" aria-hidden="true" />
            <img
              className="layer s-person"
              src="/assets/img/slider/single-slide-1.png"
              alt="Smiling Zenith Educate student holding a book"
              width="504"
              height="787"
            />
            <div className="layer s-chip s-c1">
              <span className="s-ico" aria-hidden="true">✓</span>
              <span>
                <b>Career-focused</b>
                <small>learning pathways</small>
              </span>
            </div>
            <div className="layer s-badge">
              <b>25+</b>
              <small>
                YEARS OF
                <br />
                EXCELLENCE
              </small>
            </div>
            <div className="layer s-base">
              <span className="s-ico s-ico-blue" aria-hidden="true">▣</span>
              <span>
                <b>Expert-led training</b>
                <small>Accounting · Technology · Exams</small>
              </span>
            </div>
            <span className="layer s-orb s-o1" aria-hidden="true" />
            <span className="layer s-orb s-o2" aria-hidden="true" />
            <span className="layer s-orb s-o3" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="wrap hero-foot">ACCOUNTING　•　 TECHNOLOGY　•　 COMPETITIVE EXAMS　•　 CAREER SKILLS</div>
    </section>
  );
}
