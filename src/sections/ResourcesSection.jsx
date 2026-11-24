import { useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer.jsx';
import { PlayIcon } from './VideoReel.jsx';
import { SHORTS, shortUrl } from '../data/videos.js';
import { SITE } from '../data/site.js';

const RESOURCES = [
  {
    title: 'Free study resources',
    text: 'The original site describes downloadable PDFs, daily general knowledge updates, current-affairs material and mock tests.',
    href: `${SITE.originalSite}/free-resources.php`,
    link: 'Open original resource page ↗',
  },
  {
    title: 'Library',
    text: 'Competitive-exam guides, reference books, previous-year papers, mock tests, newspapers and self-study facilities.',
    href: `${SITE.originalSite}/library.php`,
    link: 'View library details ↗',
  },
  {
    title: 'Book store',
    text: 'Exam preparation books, SAP/Tally/accounting manuals, stationery and study kits are described on the original site.',
    href: `${SITE.originalSite}/library.php`,
    link: 'View book store details ↗',
  },
];

function ShortCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="short-card">
      {playing ? (
        <YouTubePlayer id={video.id} title={video.title} className="short-frame" />
      ) : (
        <button className="short-play" type="button" aria-label={`Play video: ${video.title}`} onClick={() => setPlaying(true)}>
          <img src={`https://i.ytimg.com/vi/${video.id}/oar2.jpg`} alt="" loading="lazy" />
          <span className="short-shade" aria-hidden="true" />
          <span className="short-tag" aria-hidden="true">{video.tag}</span>
          <span className="short-btn" aria-hidden="true">
            <PlayIcon size={22} />
          </span>
        </button>
      )}
      <div className="short-meta">
        <h4>{video.title}</h4>
        <a href={shortUrl(video.id)} target="_blank" rel="noopener noreferrer">
          Watch on YouTube ↗
        </a>
      </div>
    </article>
  );
}

// Grid of the channel's Shorts — each card plays inline.
export function ShortsGrid() {
  return (
    <>
      <div className="shorts-head">
        <div>
          <h3>Videos &amp; demo classes</h3>
          <p className="intro">Short videos from the Zenith Educate YouTube channel — tap any video to play it here.</p>
        </div>
        <a className="shorts-channel" href={`${SITE.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">▶</span> Subscribe on YouTube
        </a>
      </div>
      <div className="shorts-grid">
        {SHORTS.map((v) => (
          <ShortCard key={v.id} video={v} />
        ))}
      </div>
    </>
  );
}

export default function ResourcesSection() {
  return (
    <section className="section programmes" id="resources">
      <div className="wrap">
        <div className="eyebrow">LEARN BEYOND THE CLASSROOM</div>
        <h2>
          Resources, library <em>&amp; support.</em>
        </h2>
        <div className="grid">
          {RESOURCES.map((r) => (
            <article className="card" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <a href={r.href} target="_blank" rel="noreferrer">
                {r.link}
              </a>
            </article>
          ))}
        </div>
        <ShortsGrid />
      </div>
    </section>
  );
}
