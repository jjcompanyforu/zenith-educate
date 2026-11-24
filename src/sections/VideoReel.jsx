import { useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer.jsx';
import { FEATURED_VIDEO, shortUrl } from '../data/videos.js';
import { SITE } from '../data/site.js';

const PlayIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
);

export default function VideoReel() {
  const [playing, setPlaying] = useState(false);
  const { id, title } = FEATURED_VIDEO;

  return (
    <section className="section reel" id="watch">
      <div className="wrap reel-grid">
        <div className="reel-copy">
          <div className="eyebrow">WATCH ON YOUTUBE</div>
          <h2>
            See Zenith <em>in action.</em>
          </h2>
          <p>
            A quick look at CUET entrance preparation at Zenith Educate. Follow our channel for student stories, exam
            tips and updates from our Thiruvananthapuram campus.
          </p>
          <ul className="reel-points">
            <li><span>▶</span>Short, focused updates</li>
            <li><span>✓</span>CUET &amp; competitive exam guidance</li>
            <li><span>★</span>Real Zenith students and faculty</li>
          </ul>
          <div className="reel-actions">
            <a className="btn" href={shortUrl(id)} target="_blank" rel="noopener noreferrer">
              Watch on YouTube ↗
            </a>
            <a className="reel-sub" href={`${SITE.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">
              Subscribe to our channel →
            </a>
          </div>
        </div>

        <div className="reel-stage">
          <div className="reel-glow" aria-hidden="true" />
          <div className={`reel-phone${playing ? ' is-playing' : ''}`}>
            <div className="reel-notch" aria-hidden="true" />
            {playing ? (
              <YouTubePlayer id={id} title={title} className="reel-screen" />
            ) : (
              <button className="reel-screen" type="button" aria-label={`Play ${title}`} onClick={() => setPlaying(true)}>
                <img src={`https://i.ytimg.com/vi/${id}/hq2.jpg`} alt="" loading="lazy" />
                <span className="reel-shade" aria-hidden="true" />
                <span className="reel-play" aria-hidden="true">
                  <PlayIcon size={30} />
                </span>
                <span className="reel-tag" aria-hidden="true">▶ Shorts</span>
              </button>
            )}
          </div>
          <div className="reel-chip reel-chip-a" aria-hidden="true">
            <b>CUET</b>
            <small>Entrance guidance</small>
          </div>
          <div className="reel-chip reel-chip-b" aria-hidden="true">
            <span className="reel-yt">▶</span>
            <small>@ZenithEducateTrivandrum</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PlayIcon };
