import { Link } from 'react-router-dom';
import { useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer.jsx';
import { PlayIcon } from './VideoReel.jsx';
import { SHORTS, shortUrl } from '../data/videos.js';
import { SITE } from '../data/site.js';
import Reveal from '../components/Reveal.jsx';

const RESOURCES = [
  {
    title: 'Free study resources',
    text: 'Read or download free PDFs — current affairs, banking capsule, SSC quant sets and daily GK — right on our site.',
    to: '/resources#free-resources',
    link: 'Browse free resources →',
  },
  {
    title: 'Library',
    text: 'Competitive-exam guides, reference books, previous-year papers, mock tests, newspapers and self-study facilities.',
    to: '/resources#library',
    link: 'View library details →',
  },
  {
    title: 'Book store',
    text: 'Exam preparation books, SAP/Tally/accounting manuals, stationery and study kits, with discounts for enrolled students.',
    to: '/resources#library',
    link: 'View book store details →',
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
          {RESOURCES.map((r, i) => (
            <Reveal as="article" className="card" key={r.title} delay={i * 90}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              {r.to ? (
                <Link to={r.to}>{r.link}</Link>
              ) : (
                <a href={r.href} target="_blank" rel="noreferrer">
                  {r.link}
                </a>
              )}
            </Reveal>
          ))}
        </div>
        <ShortsGrid />
      </div>
    </section>
  );
}
