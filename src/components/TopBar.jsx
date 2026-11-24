import { SITE } from '../data/site.js';

export default function TopBar() {
  return (
    <div className="top">
      <div className="wrap">
        <span>Learn today. Shape what comes next.</span>
        <div>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
    </div>
  );
}
