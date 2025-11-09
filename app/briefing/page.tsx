"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DebrisStats, getDebrisStats } from "@/lib/api";

type RealNewsArticle = {
  id: string;
  title: string;
  source: string;
  date?: string;
  url: string;
  summary: string;
};

type RealNewsVideo = {
  id: string;
  title: string;
  url: string;
  note?: string;
};

const REAL_NEWS_LEAD: RealNewsArticle = {
  id: "fox-china",
  title:
    "Chinese astronauts stranded after suspected debris strike on return capsule",
  source: "Fox News",
  date: "Nov 6, 2025",
  url: "https://www.foxnews.com/world/chinese-astronauts-stranded-space-after-debris-strikes-return-capsule-during-mission",
  summary:
    "A crew on China’s Tiangong space station had their return delayed while engineers assess damage believed to be caused by tiny fragments of orbital debris.",
};

const REAL_NEWS_ARTICLES: RealNewsArticle[] = [
  {
    id: "express-threat",
    title:
      "Space junk flying at tens of thousands of mph is a genuine threat to life on Earth",
    source: "Daily Express",
    date: "Feb 1, 2025",
    url: "https://www.the-express.com/news/space-news/162170/space-junk-threat-warning-life-of-earth-expert",
    summary:
      "A space-physics expert warns that growing clouds of space debris increase the risk of dangerous re-entries and calls on launch providers to take more responsibility.",
  },
  {
    id: "bbc-space-junk",
    title: "BBC space junk coverage and orbital traffic reports",
    source: "BBC News – Space junk topic",
    url: "https://www.bbc.com/news/topics/c5y9wr365gmt",
    summary:
      "A collection of BBC reporting on how broken satellites and rocket parts are cluttering orbit and raising collision risks.",
  },
  {
    id: "sun-balloon",
    title: "NASA ‘space junk’ balloon winds up on Texas farm",
    source: "The Sun",
    url: "https://www.the-sun.com/tech/15328023/nasa-space-junk-balloon-texas-farm/",
    summary:
      "An experimental NASA balloon linked to space or atmospheric research ended up on a farm in Texas, illustrating how hardware can unexpectedly return to Earth.",
  },
];

const REAL_NEWS_VIDEOS: RealNewsVideo[] = [
  {
    id: "4GHalpMJ5mQ",
    title: "Space junk explainer (YouTube video)",
    url: "https://www.youtube.com/watch?v=4GHalpMJ5mQ",
    note: "Short video overview of how space junk forms and why it’s hard to clean up.",
  },
  {
    id: "31OgUc7OwOM",
    title: "Space debris and satellite risks (YouTube video)",
    url: "https://www.youtube.com/watch?v=31OgUc7OwOM",
    note: "Video segment discussing how debris clouds threaten satellites and human spaceflight.",
  },
];

export default function DebrisBriefingPage() {
  const [stats, setStats] = useState<DebrisStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const s = await getDebrisStats();
      setStats(s);
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Space Trash & Debris Newsletter</h1>
      <p className="page-subtitle">
        Before you send your little WALL•E-inspired bot into orbit, here's the
        real-world situation: how much junk is up there and how it's
        already affecting missions.
      </p>

      {/* REAL-NEWS FRONT PAGE */}
      <div className="card frontpage">
        <div className="badge" style={{ marginBottom: "0.75rem" }}>
          <span>📊</span>
          <span>Debris Newsletter</span>
        </div>
        <div className="frontpage-header">
          <div className="frontpage-masthead">
            <div className="frontpage-name">THE ORBITAL OBSERVER</div>
            <div className="frontpage-kicker">
              Special Edition · Space Junk in the Headlines
            </div>
          </div>
          <div className="frontpage-meta">
            <span>Last Updated: 11/8/2025</span>
          </div>
        </div>

        <div className="frontpage-grid">
          {/* Lead story */}
          <section className="frontpage-lead">
            <h2 className="frontpage-lead-title">{REAL_NEWS_LEAD.title}</h2>
            <div className="frontpage-lead-meta">
              <span>{REAL_NEWS_LEAD.source}</span>
              {REAL_NEWS_LEAD.date && (
                <>
                  <span className="frontpage-dot">•</span>
                  <span>{REAL_NEWS_LEAD.date}</span>
                </>
              )}
            </div>
            <p className="frontpage-lead-summary">
              {REAL_NEWS_LEAD.summary}
            </p>
            <a
              href={REAL_NEWS_LEAD.url}
              target="_blank"
              rel="noreferrer"
              className="frontpage-link"
            >
              Read full article ↗
            </a>
          </section>

          {/* Sidebar: other articles */}
          <aside className="frontpage-sidebar">
            <h3 className="frontpage-sidebar-heading">
              Elsewhere in the debris field
            </h3>
            <ul className="frontpage-list">
              {REAL_NEWS_ARTICLES.map((article) => (
                <li key={article.id} className="frontpage-list-item">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="frontpage-link frontpage-link-strong"
                  >
                    {article.title}
                  </a>
                  <div className="frontpage-list-meta">
                    <span>{article.source}</span>
                    {article.date && (
                      <>
                        <span className="frontpage-dot">•</span>
                        <span>{article.date}</span>
                      </>
                    )}
                  </div>
                  <p className="frontpage-list-summary">{article.summary}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Video row */}
        <section className="frontpage-videos">
          <h3 className="frontpage-videos-heading">Video desk</h3>
          <div className="frontpage-videos-grid">
            {REAL_NEWS_VIDEOS.map((video) => (
              <article key={video.id} className="frontpage-video">
                <div className="frontpage-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="frontpage-video-text">
                  <div className="frontpage-video-title">{video.title}</div>
                  {video.note && (
                    <p className="frontpage-video-note">{video.note}</p>
                  )}
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="frontpage-link"
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* STATS CARD */}
      <div className="card">
        {loading && <p style={{ marginTop: "0.8rem" }}>Booting console…</p>}

        {!loading && stats && (
          <>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Tracked Objects</div>
                <div className="stat-value">
                  {stats.totalObjects.toLocaleString()}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Estimated Tiny Fragments</div>
                <div className="stat-value">
                  {stats.smallFragmentsEstimate.toLocaleString()}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Total Mass in Orbit</div>
                <div className="stat-value">
                  {stats.massTons.toLocaleString()} tons
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Data Mode</div>
                <div className="stat-value">{stats.updated}</div>
              </div>
            </div>

            <p style={{ fontSize: "0.86rem", marginTop: "0.8rem" }}>
              Even a fragment just a few millimeters across can punch a hole in
              a satellite when it&apos;s moving at several kilometers per
              second. If we don&apos;t change how we treat orbit, future robots
              might end up cleaning space the way WALL·E cleaned Earth.
            </p>
          </>
        )}
      </div>

      {/* CTA card */}
      <div
        className="card"
        style={{
          marginTop: "1.2rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1 1 280px", fontSize: "0.9rem" }}>
          <h2 style={{ marginTop: 0, marginBottom: "0.4rem" }}>
            Ready to help clean this up?
          </h2>
          <p style={{ margin: 0 }}>
            These headlines are from the real world. Next, you'll learn & adopt a
            planet and try to keep its orbit clear of debris in our mini-game.
          </p>
        </div>
        <div>
          <Link href="/adopt">
            <button className="btn">🧹 Go to Learn & Cleanup Mission</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
