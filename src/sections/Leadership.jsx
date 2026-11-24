import { useEffect, useRef, useState } from 'react';
import usePointerTilt from '../hooks/usePointerTilt.js';

// Animated chairman portrait: wipes in when scrolled into view, tilts on hover.
function ChairmanPortrait() {
  const figureRef = useRef(null);
  const photoRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(false);
  usePointerTilt(figureRef, photoRef, { xVar: '--crx', yVar: '--cry', maxX: 10, maxY: 12 });

  useEffect(() => {
    const el = figureRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return undefined;
    }
    setAnimate(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figureRef} className={`chair${animate ? ' anim' : ''}${inView ? ' is-in' : ''}`}>
      <span className="chair-ring" aria-hidden="true" />
      <span className="chair-frame" aria-hidden="true" />
      <div className="chair-photo" ref={photoRef}>
        <img
          src="/assets/img/chairmen/chairman.jpg"
          alt="Akhil V Raj, Chairman of Zenith Educate"
          width="1198"
          height="1313"
          loading="lazy"
        />
        <span className="chair-sheen" aria-hidden="true" />
      </div>
      <span className="chair-quote" aria-hidden="true">“</span>
      <figcaption className="chair-badge">
        <b>Akhil V Raj</b>
        <small>Chairman · Zenith Educate</small>
      </figcaption>
    </figure>
  );
}

export default function Leadership() {
  return (
    <section className="section wrap" id="leadership">
      <div className="eyebrow">PEOPLE &amp; PURPOSE</div>
      <h2>
        Guidance from <em>experience.</em>
      </h2>
      <div className="about">
        <ChairmanPortrait />
        <div>
          <h3>Chairman's message</h3>
          <p>Dear Students, Parents, and Well-Wishers,</p>
          <p>
            Zenith's published message describes a 25-year journey from a small coaching centre to a multidisciplinary
            institute spanning Banking, SSC, CUET and professional training in SAP, Tally, Accounting, data science, AI
            and Logistics. Its stated focus is building character, confidence and careers through experienced faculty,
            modern teaching methods and student-centred support.
          </p>
          <b>Akhil V Raj</b>
          <p>Chairman, Zenith Educate</p>
        </div>
      </div>
      <div className="about" style={{ marginTop: '48px' }}>
        <img
          src="/assets/img/teacher/lekshmi.jpg"
          alt="Lekshmi P S, Senior Faculty at Zenith Educate"
          width="1037"
          height="1517"
          loading="lazy"
          style={{ objectPosition: 'center 22%' }}
        />
        <div>
          <h3>Lekshmi P S</h3>
          <p>Senior Faculty · Zenith Educate</p>
          <p>The original site describes her experience in competitive-exam training and student mentoring.</p>
        </div>
      </div>
    </section>
  );
}
