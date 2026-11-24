import { useRef } from 'react';
import { Link } from 'react-router-dom';
import usePointerTilt from '../hooks/usePointerTilt.js';
import { CountUp } from '../components/Reveal.jsx';

export default function Hero() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const innerRef = useRef(null);
  usePointerTilt(heroRef, innerRef, { xVar: '--rx', yVar: '--ry', maxX: 14, maxY: 22, measureRef: sceneRef, clamp: 0.8 });

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow hero-in" style={{ '--i': 0 }}>
            EDUCATION THAT MOVES YOU FORWARD
          </div>
          <h1>
            <span className="hero-line hero-in" style={{ '--i': 1 }}>
              Your next chapter
            </span>
            <span className="hero-line hero-in" style={{ '--i': 2 }}>
              starts with <em>learning.</em>
            </span>
          </h1>
          <p className="hero-in" style={{ '--i': 3 }}>
            Coaching for Bank, SSC, Railway &amp; CUET exams and job-ready courses in Accounting, IT and Logistics –
            taught in English &amp; Malayalam at PMG Junction, Thiruvananthapuram.
          </p>
          <div className="actions hero-in" style={{ '--i': 4 }}>
            <Link className="btn" to="/admissions#apply">
              Book free counselling
            </Link>
            <a className="hero-link" href="#programmes">
              Explore courses →
            </a>
          </div>
          <div className="proof hero-in" style={{ '--i': 5 }}>
            <div>
              <b>
                <CountUp value={25} suffix="+" duration={1400} delay={700} /> years
              </b>
              <small>guiding students</small>
            </div>
            <div>
              <b>
                <CountUp value={1200} suffix="+" duration={1800} delay={700} />
              </b>
              <small>students cracked exams</small>
            </div>
            <div>
              <b>Online &amp; classroom</b>
              <small>morning · evening · weekend</small>
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
