// Embedded YouTube player. YouTube requires a referrer (otherwise it shows
// "Error 153 – video player configuration error"), so we send it explicitly.
export default function YouTubePlayer({ id, title, className }) {
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&origin=${encodeURIComponent(
    window.location.origin,
  )}`;
  return (
    <div className={className}>
      <iframe
        src={src}
        title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
