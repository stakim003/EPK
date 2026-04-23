"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Menu, X } from "lucide-react";
import gsap from "gsap";

const BG    = "#F5F3EE";
const INK   = "#0A0A0A";
const MUTED = "rgba(0,0,0,0.38)";
const FAINT = "rgba(0,0,0,0.22)";
const RULE  = "rgba(0,0,0,0.09)";
const NAV_H = 52;

const TABS = [
  { id: "bio",        label: "Bio" },
  { id: "stats",      label: "Stats & Reach" },
  { id: "campaigns",  label: "Campaign" },
  { id: "interviews", label: "Interviews" },
  { id: "shows",      label: "Notable Shows" },
  { id: "services",   label: "Services" },
  { id: "booking",    label: "Get In Touch" },
];

const INTERVIEWS = [
  { src: "/interviews/nl-times.mov", title: "NL Times",   year: "2025", label: "Canada" },
  { src: "/interview-1.mp4",         title: "Come Spin!", year: "2024", label: "Interview" },
  { src: "/interviews/yammat-fm.mp4", title: "Yammat FM",  year: "2025", label: "Croatia" },
];

const BIO =
  "Changing Currents is more than a DJ; he is a global cultural catalyst. Having successfully transitioned from a viral sensation to a proven headliner, he has solidified his physical draw with back-to-back sold-out London shows and headline tours across India, South America, and Canada. His unique ability to convert digital momentum into physical demand makes him one of the most commercially compelling creative voices in the UK right now. Supported by a highly engaged global audience of over 119,000, Changing Currents bridges the gap between online influence and real-world cultural impact.";

const SERVICES = [
  { category: "On-Camera",            items: "Modelling (Editorial & Commercial) | Acting" },
  { category: "Live Experience",      items: "DJ Sets | Event Appearances" },
  { category: "Digital Partnerships", items: "Social Media Campaigns | Brand Ambassadorships" },
  { category: "Content Creation",     items: "UGC | Bespoke Creative" },
];

const SHOWS = [
  { venue: "Glastonbury",          location: "",          date: "2025", note: "Festival" },
  { venue: "Phonox, London",       location: "",          date: "2025", note: "Sold Out" },
  { venue: "South America Tour",   location: "",          date: "2025", note: "Headline" },
  { venue: "India Tour",           location: "",          date: "2026", note: "Headline" },
  { venue: "Canada Tour",          location: "",          date: "2024", note: "Sold Out" },
  { venue: "Heineken, Kingston Jamaica", location: "", date: "2024", note: "Brand Event" },
  { venue: "Nairobi, Kenya",       location: "",          date: "2024", note: "Headline" },
];

const STATS = [
  { number: "119K", label: "Instagram" },
  { number: "158K", label: "TikTok" },
  { number: "26K",  label: "SoundCloud" },
];

const INSTA_TOP = [
  { caption: "On top of the world 🥹 Mashup ID ~ JusJay",                          views: "3.3M", likes: "245K", saves: "22K", comments: "3.3K", url: "https://www.instagram.com/reel/C0wgSjcIOm1/?igsh=czM3dDVvN20wbnN6" },
  { caption: "Full set up now on my youtube! @fzn.ent . MASHU...",                  views: "3M",   likes: "180K", saves: "20K", comments: "3K",   url: "https://www.instagram.com/reel/C3Iff_1o9tC/?igsh=MTJmMWdnNGVydzQycw==" },
  { caption: "The week before I played to thousands at Glastonbury...",              views: "2.8M", likes: "189K", saves: "6K",  comments: "1.7K", url: "https://www.instagram.com/reel/DL7rC59Ijjn/?igsh=Z3Nkc2N6OXJzczly" },
  { caption: "I play music from all around the world, it's a journey...",           views: "2.1M", likes: "127K", saves: "20K", comments: "722",  url: "https://www.instagram.com/reel/C6txYVtIlrJ/?igsh=MXU1eWpxajdzbmQ5YQ==" },
  { caption: "Bringing this energy to Amsterdam 👇",                                views: "2M",   likes: "153K", saves: "14K", comments: "475",  url: "https://www.instagram.com/reel/DFKzExhyyML/?igsh=bWFzYnYyOWJrcDNx" },
  { caption: "I was ready JT ~ Day 2 of posting untill @boilerroom...",             views: "2M",   likes: "100K", saves: "18K", comments: "347",  url: "https://www.instagram.com/reel/C5GrfNko_ES/?igsh=dGJkdnN6a2xvbm5l" },
  { caption: "My love for Punjabi music has been going on for years...",            views: "1.4M", likes: "109K", saves: "10K", comments: "309",  url: "https://www.instagram.com/reel/C_n6IH5oa9e/?igsh=dXBpbTg0bHNnbDdu" },
  { caption: "COMBINAAAATION",                                                       views: "1.4M", likes: "84K",  saves: "11K", comments: "757",  url: "https://www.instagram.com/reel/C6eWdiFoXrT/?igsh=MTI0MGR6ZW1xcjl0dw==" },
  { caption: "luv u london <3",                                                      views: "1.2M", likes: "68K",  saves: "7K",  comments: "761",  url: "https://www.instagram.com/reel/DF-xoUcIFrw/?igsh=MWFwbTk3M3p1b2s2bw==" },
  { caption: "I'm always making friends with the crowd 🤣❤️ M...",                 views: "1.1M", likes: "91K",  saves: "18K", comments: "259",  url: "https://www.instagram.com/reel/C_qQQwqI4Ee/?igsh=ODRxZDFzdW5reTVp" },
];

const TIKTOK_TOP = [
  { views: "4.5M", likes: "427K", shares: "22K", saves: "77K", comments: "1,765", url: "https://vm.tiktok.com/ZNRbL1wEP/" },
  { views: "2.4M", likes: "379K", shares: "8,963", saves: "49K", comments: "3,517", url: "https://vm.tiktok.com/ZNRbLM7gD/" },
  { views: "1.9M", likes: "223K", shares: "9,986", saves: "27K", comments: "670",   url: "https://vm.tiktok.com/ZNRbLRmeJ/" },
  { views: "1.7M", likes: "187K", shares: "3,781", saves: "23K", comments: "998",   url: "https://vm.tiktok.com/ZNRbLko5B/" },
  { views: "1.5M", likes: "223K", shares: "18K",   saves: "18K", comments: "1,155", url: "https://vm.tiktok.com/ZNRbLkrD6/" },
  { views: "1.3M", likes: "111K", shares: "4,311", saves: "20K", comments: "1,354", url: "https://vm.tiktok.com/ZNRbLFbKp/" },
  { views: "1.1M", likes: "114K", shares: "7,166", saves: "14K", comments: "535",   url: "https://vm.tiktok.com/ZNRbL8WA3/" },
  { views: "1M",   likes: "103K", shares: "5,822", saves: "18K", comments: "364",   url: "https://vm.tiktok.com/ZNRbLdct1/" },
  { views: "829K", likes: "127K", shares: "5,065", saves: "14K", comments: "281",   url: "https://vm.tiktok.com/ZNRbLJp23/" },
  { views: "747K", likes: "107K", shares: "3,847", saves: "11K", comments: "204",   url: "https://vm.tiktok.com/ZNRbL1TMU/" },
];

const SOUNDCLOUD_TOP = [
  { title: "Miss Pony x Miss Fatty (Devin & Changing Currents Mashup)",                           plays: "928K", url: "https://soundcloud.com/changing-currents/miss-pony-x-miss-fatty-devin-changing-currents-mashup-1" },
  { title: "Like A Star X Bicycle (Changing Currents Mashup)",                                    plays: "318K", url: "https://soundcloud.com/changing-currents/like-a-star-x-bicycle-changing-currents-mashup" },
  { title: "Ginger Me X MJ (Changing Currents Mashup)",                                           plays: "261K", url: "https://soundcloud.com/changing-currents/chamos-move-ya-bodychanging-currents-tiktok-mashup" },
  { title: "One Man X Don't Cha (Changing Currents Mash Up)",                                     plays: "189K", url: "https://soundcloud.com/changing-currents/one-man-x-dont-cha-changing-currents-mash-up" },
  { title: "Whine & Kotch X Rock Your Body X Beautiful (Changing Currents X Spinelli Mashup)",    plays: "143K", url: "https://soundcloud.com/changing-currents/whine-kotch-x-rock-your-body-x-beautiful-changing-currents-x-spinelli-mashup" },
];

const YOUTUBE_TOP = [
  { title: "Changing Currents Full Set @ FZN Brighton",                         views: "67K", likes: "2.3K", url: "https://www.youtube.com/watch?v=-8VOTv9HLg8" },
  { title: "Cure And The Cause X Fever (Changing Currents Mashup)",             views: "40K", likes: "720",  url: "https://www.youtube.com/watch?v=yp7WDJfVFO4" },
  { title: "Show #704 (Changing Currents Takeover) — Soulection Radio",        views: "22K", likes: "574",  url: "https://www.youtube.com/watch?v=yUXp8OPg5Wo" },
];

// ── Drop your video files into /public and update these ──
const BRAND_VIDEOS = [
  { src: "/brand-shoot-1.mp4", brand: "Oscar Deen", year: "2024", label: "Campaign Shoot" },
  { src: "",                   brand: "Brand Name", year: "2024", label: "Campaign Shoot" },
  { src: "",                   brand: "Brand Name", year: "2024", label: "Campaign Shoot" },
];

// ── Shoot photos / layout ─────────────────────────────────
const SHOOT_PHOTOS = [
  "/shoots/DSC03692.jpg",
  "/shoots/DSC09311.jpeg",
  "/shoots/DSC09460.jpg",
  "/shoots/DSC09157.jpeg",
  "/shoots/DSC09629.jpeg",
  "/shoots/DSC09834.jpg",
  "/shoots/DSC03048.jpg",
  "/shoots/DSC03120.jpg",
  "/shoots/DSC09535.jpg",
  "/shoots/IMG_6929.JPG",
  "/shoots/883419850018.jpg",
  "/shoots/97B0C32F-0B5A-4493-99DB-B46D6A4423A4.JPG",
  "/shoots/PHOTO-2024-03-02-15-48-23 2.jpg",
];

// Per-image objectPosition overrides (default is "center")
const SHOOT_POSITIONS: Record<string, string> = {
  "/shoots/DSC03048.jpg": "top",
};

// Layout pattern: "full" = full height, "pair" = two stacked half-height
const SHOOT_LAYOUT: ("full" | "pair")[] = [
  "full", "pair", "full", "full", "pair", "full", "pair", "full",
];

// ── useIsMobile hook ─────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ── Stats section component ───────────────────────────────
type StatPlatform = "instagram" | "tiktok" | "soundcloud" | "youtube";

const PREVIEW = 4;

function StatsSection() {
  const [platform, setPlatform] = useState<StatPlatform>("instagram");
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();

  // Reset showAll when platform changes
  useEffect(() => {
    setShowAll(false);
  }, [platform]);

  const platformTabs: { id: StatPlatform; label: string }[] = [
    { id: "instagram",  label: "Instagram" },
    { id: "tiktok",     label: "TikTok" },
    { id: "soundcloud", label: "SoundCloud" },
    { id: "youtube",    label: "YouTube" },
  ];

  const instaSecondary = (p: typeof INSTA_TOP[0]) => [
    { label: "Likes",    val: p.likes },
    { label: "Saves",    val: p.saves },
    { label: "Comments", val: p.comments },
  ];
  const tiktokSecondary = (p: typeof TIKTOK_TOP[0]) => [
    { label: "Likes",    val: p.likes },
    { label: "Shares",   val: p.shares },
    { label: "Comments", val: p.comments },
  ];

  // Shared "See All" / fade overlay wrapper
  const WithShowMore = ({
    totalCount,
    children,
  }: {
    totalCount: number;
    children: React.ReactNode;
  }) => (
    <div style={{ position: "relative" }}>
      {/* Extra bottom padding so last item isn't hidden behind the fade */}
      <div style={{ paddingBottom: !showAll && totalCount > PREVIEW ? 56 : 0 }}>
        {children}
      </div>
      {!showAll && totalCount > PREVIEW && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(to bottom, transparent, ${BG})`,
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 12,
        }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              zIndex: 2,
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: INK,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            See all {totalCount} →
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section id="stats" style={{ minHeight: `calc(100vh - ${NAV_H}px)`, backgroundColor: BG, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column" }}>

      {/* Section title + follower banners */}
      <div style={{ padding: isMobile ? "40px 24px 0" : "52px 80px 0", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Stats &amp; Reach</span>

        {/* Big follower numbers */}
        {isMobile ? (
          /* Mobile: 3-across grid with clamp sizes */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 40, borderTop: `1px solid ${RULE}` }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stat-item" style={{
                padding: "20px 0",
                paddingLeft: i === 0 ? 0 : 12,
                borderRight: i < STATS.length - 1 ? `1px solid ${RULE}` : "none",
              }}>
                <div style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(32px, 9vw, 52px)", color: INK, lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: 8, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 8 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: flex row */
          <div style={{ display: "flex", marginTop: 40, borderTop: `1px solid ${RULE}` }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stat-item" style={{
                flex: 1,
                padding: "28px 0 28px",
                paddingLeft: i === 0 ? 0 : 52,
                borderRight: i < STATS.length - 1 ? `1px solid ${RULE}` : "none",
              }}>
                <div style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(52px, 6vw, 88px)", color: INK, lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: 10, letterSpacing: 4, color: INK, textTransform: "uppercase", marginTop: 10 }}>{stat.label} Followers</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Platform tabs */}
      <div style={{
        display: "flex",
        padding: isMobile ? "0 24px" : "0 80px",
        marginTop: 0,
        borderBottom: `1px solid ${RULE}`,
        borderTop: `1px solid ${RULE}`,
        flexShrink: 0,
        overflowX: isMobile ? "auto" : "visible",
        scrollbarWidth: "none",
      }}>
        {platformTabs.map((tab) => (
          <button key={tab.id} onClick={() => setPlatform(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "16px 0", marginRight: isMobile ? 28 : 44,
            fontSize: 9, letterSpacing: 4, textTransform: "uppercase",
            color: platform === tab.id ? INK : MUTED,
            borderBottom: platform === tab.id ? `2px solid ${INK}` : "2px solid transparent",
            marginBottom: -1, fontFamily: "inherit",
            flexShrink: 0,
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Instagram list */}
      {platform === "instagram" && (
        <div style={{ overflowY: "auto", flex: 1 }}>
          <WithShowMore totalCount={INSTA_TOP.length}>
            {(showAll ? INSTA_TOP : INSTA_TOP.slice(0, PREVIEW)).map((post, i) => (
              <a key={i} href={post.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "0 24px" : "0 80px",
                  borderBottom: `1px solid ${RULE}`,
                  cursor: "pointer",
                  gap: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {/* Index — hide on mobile */}
                {!isMobile && (
                  <span style={{ width: 36, fontSize: 11, color: FAINT, flexShrink: 0, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                )}
                {/* Views — hero number */}
                <div style={{ width: isMobile ? "auto" : 180, padding: "18px 0", flexShrink: 0, minWidth: isMobile ? 0 : 180 }}>
                  <div style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(32px, 9vw, 52px)", color: INK, lineHeight: 1 }}>{post.views}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 6 }}>Views</div>
                  {isMobile && (
                    /* Secondary stats below views number on mobile */
                    <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                      {instaSecondary(post).map(s => (
                        <div key={s.label}>
                          <span style={{ fontFamily: "'Bootzy', serif", fontSize: 13, color: INK, lineHeight: 1 }}>{s.val}</span>
                          <span style={{ fontSize: 8, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase", marginLeft: 4 }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Caption — hide on mobile */}
                {!isMobile && (
                  <span style={{ flex: 1, fontSize: 12, color: MUTED, letterSpacing: 0.2, paddingRight: 24 }}>{post.caption}</span>
                )}
                {/* Secondary stats — desktop only inline */}
                {!isMobile && (
                  <div style={{ display: "flex", gap: 32, flexShrink: 0 }}>
                    {instaSecondary(post).map(s => (
                      <div key={s.label} style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Bootzy', serif", fontSize: 18, color: INK, lineHeight: 1 }}>{s.val}</div>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 5 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <span style={{ width: 32, fontSize: 13, color: FAINT, textAlign: "right", flexShrink: 0, alignSelf: "center" }}>↗</span>
              </a>
            ))}
          </WithShowMore>
        </div>
      )}

      {/* TikTok list */}
      {platform === "tiktok" && (
        <div style={{ overflowY: "auto", flex: 1 }}>
          <WithShowMore totalCount={TIKTOK_TOP.length}>
            {(showAll ? TIKTOK_TOP : TIKTOK_TOP.slice(0, PREVIEW)).map((post, i) => (
              <a key={i} href={post.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "0 24px" : "0 80px",
                  borderBottom: `1px solid ${RULE}`,
                  cursor: "pointer",
                  gap: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {!isMobile && (
                  <span style={{ width: 36, fontSize: 11, color: FAINT, flexShrink: 0, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                )}
                <div style={{ width: isMobile ? "auto" : 180, padding: "18px 0", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(32px, 9vw, 52px)", color: INK, lineHeight: 1 }}>{post.views}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 6 }}>Views</div>
                  {isMobile && (
                    <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                      {tiktokSecondary(post).map(s => (
                        <div key={s.label}>
                          <span style={{ fontFamily: "'Bootzy', serif", fontSize: 13, color: INK, lineHeight: 1 }}>{s.val}</span>
                          <span style={{ fontSize: 8, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase", marginLeft: 4 }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {!isMobile && <div style={{ flex: 1 }} />}
                {!isMobile && (
                  <div style={{ display: "flex", gap: 32, flexShrink: 0 }}>
                    {tiktokSecondary(post).map(s => (
                      <div key={s.label} style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Bootzy', serif", fontSize: 18, color: INK, lineHeight: 1 }}>{s.val}</div>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 5 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <span style={{ width: 32, fontSize: 13, color: FAINT, textAlign: "right", flexShrink: 0, alignSelf: "center" }}>↗</span>
              </a>
            ))}
          </WithShowMore>
        </div>
      )}

      {/* SoundCloud list */}
      {platform === "soundcloud" && (
        <div style={{ overflowY: "auto", flex: 1 }}>
          <WithShowMore totalCount={SOUNDCLOUD_TOP.length}>
            {(showAll ? SOUNDCLOUD_TOP : SOUNDCLOUD_TOP.slice(0, PREVIEW)).map((track, i) => (
              <a key={i} href={track.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "0 24px" : "0 80px",
                  borderBottom: `1px solid ${RULE}`,
                  cursor: "pointer",
                  gap: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {!isMobile && (
                  <span style={{ width: 36, fontSize: 11, color: FAINT, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                )}
                <span style={{ width: isMobile ? "auto" : 160, fontFamily: "'Bootzy', serif", fontSize: "clamp(32px, 9vw, 52px)", color: INK, lineHeight: 1, padding: "18px 0", flexShrink: 0 }}>
                  {track.plays}
                </span>
                {!isMobile && (
                  <span style={{ flex: 1, fontFamily: "'Bootzy', serif", fontSize: 22, color: INK, letterSpacing: 1 }}>{track.title}</span>
                )}
                {!isMobile && (
                  <span style={{ fontSize: 10, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Plays</span>
                )}
                <span style={{ width: 32, fontSize: 13, color: FAINT, textAlign: "right", flexShrink: 0, alignSelf: "center" }}>↗</span>
              </a>
            ))}
          </WithShowMore>
        </div>
      )}

      {/* YouTube list */}
      {platform === "youtube" && (
        <div style={{ overflowY: "auto", flex: 1 }}>
          <WithShowMore totalCount={YOUTUBE_TOP.length}>
            {(showAll ? YOUTUBE_TOP : YOUTUBE_TOP.slice(0, PREVIEW)).map((vid, i) => (
              <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "0 24px" : "0 80px",
                  borderBottom: `1px solid ${RULE}`,
                  cursor: "pointer",
                  gap: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {!isMobile && (
                  <span style={{ width: 36, fontSize: 11, color: FAINT, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                )}
                <div style={{ width: isMobile ? "auto" : 180, padding: "18px 0", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(32px, 9vw, 52px)", color: INK, lineHeight: 1 }}>{vid.views}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 5 }}>Views</div>
                  {isMobile && (
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      <div>
                        <span style={{ fontFamily: "'Bootzy', serif", fontSize: 13, color: INK }}>{vid.likes}</span>
                        <span style={{ fontSize: 8, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase", marginLeft: 4 }}>Likes</span>
                      </div>
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <span style={{ flex: 1, fontSize: 12, color: MUTED, letterSpacing: 0.2, paddingRight: 24 }}>{vid.title}</span>
                )}
                {!isMobile && (
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Bootzy', serif", fontSize: 18, color: INK, lineHeight: 1 }}>{vid.likes}</div>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: INK, textTransform: "uppercase", marginTop: 5 }}>Likes</div>
                  </div>
                )}
                <span style={{ width: 32, fontSize: 13, color: FAINT, textAlign: "right", flexShrink: 0, alignSelf: "center" }}>↗</span>
              </a>
            ))}
          </WithShowMore>
        </div>
      )}

    </section>
  );
}

// ── CampaignLayout ────────────────────────────────────────
function CampaignLayout() {
  const [playing, setPlaying] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<{ x: number; left: number } | null>(null);
  const isMobile = useIsMobile();
  const vid = BRAND_VIDEOS[0];

  const FRAME_H = isMobile ? "72vh" : `calc((100vh - ${NAV_H}px) * 0.84)`;
  const VIDEO_W = isMobile ? `calc(72vh * 9 / 16)` : `calc((100vh - ${NAV_H}px) * 0.84 * 9 / 16)`;
  const FULL_W  = isMobile ? "72vw" : "clamp(200px, 18vw, 280px)";
  const PAIR_W  = isMobile ? "78vw" : "clamp(220px, 20vw, 310px)";

  let photoIndex = 0;
  const slots = SHOOT_LAYOUT.map((type) => {
    if (type === "full") return { type, src: SHOOT_PHOTOS[photoIndex++] };
    return { type, top: SHOOT_PHOTOS[photoIndex++], bottom: SHOOT_PHOTOS[photoIndex++] };
  });

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setScrollPct((el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    dragStart.current = { x: e.clientX, left: el.scrollLeft };
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || !scrollContainerRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    scrollContainerRef.current.scrollLeft = dragStart.current.left - dx;
  };

  const onMouseUp = () => { dragStart.current = null; setDragging(false); };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>

      {/* Scroll progress bar — above photos */}
      <div style={{ padding: "14px 40px 12px", flexShrink: 0 }}>
        <div style={{ height: 1, backgroundColor: FAINT, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: -0.5, height: 2, width: `${scrollPct}%`, backgroundColor: INK, transition: "width 0.08s linear" }} />
        </div>
      </div>

      {/* Photos + right fade */}
      <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right, transparent, ${BG})`, zIndex: 2, pointerEvents: "none" }} />

        <div ref={scrollContainerRef} onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 3,
            padding: "0 0 40px 40px",
            overflowX: "auto",
            height: "100%",
            scrollbarWidth: "none",
            msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
            cursor: isMobile ? "default" : (dragging ? "grabbing" : "grab"),
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          }}>

          {/* Video */}
          <div style={{ position: "relative", width: VIDEO_W, height: FRAME_H, flexShrink: 0, backgroundColor: "#0a0a0a", cursor: dragging ? "grabbing" : "pointer", overflow: "hidden" }}
            onClick={(e) => {
              if (dragging) { e.preventDefault(); return; }
              if (!videoRef.current) return;
              if (videoRef.current.paused) { videoRef.current.play(); } else { videoRef.current.pause(); }
              setPlaying(!playing);
            }}
          >
            <video ref={videoRef} src={vid.src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} playsInline onEnded={() => setPlaying(false)} />
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={16} color="#fff" style={{ marginLeft: 2 }} />
                </div>
              </div>
            )}
            <div style={{ position: "absolute", bottom: 20, left: 20 }}>
              <p style={{ margin: 0, fontFamily: "'Bootzy', serif", fontSize: 22, color: "#fff", lineHeight: 1 }}>{vid.brand}</p>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginTop: 5 }}>{vid.label} — {vid.year}</p>
            </div>
          </div>

          {/* Gap between video and photos */}
          <div style={{ width: 24, flexShrink: 0 }} />

          {/* Editorial photo panels — lazy loaded */}
          {slots.map((slot, i) => {
            if (slot.type === "full") {
              return (
                <div key={i} style={{ width: FULL_W, height: FRAME_H, flexShrink: 0, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slot.src} alt="" loading="lazy" decoding="async" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: SHOOT_POSITIONS[slot.src] ?? "center", display: "block" }} />
                </div>
              );
            }
            const pair = slot as { type: "pair"; top: string; bottom: string };
            return (
              <div key={i} style={{ width: PAIR_W, height: FRAME_H, flexShrink: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pair.top} alt="" loading="lazy" decoding="async" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: SHOOT_POSITIONS[pair.top] ?? "center", display: "block" }} />
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pair.bottom} alt="" loading="lazy" decoding="async" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: SHOOT_POSITIONS[pair.bottom] ?? "center", display: "block" }} />
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

// ── VideoGrid ─────────────────────────────────────────────
function VideoGrid() {
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const togglePlay = (i: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    if (playing === i) {
      v.pause();
      setPlaying(null);
    } else {
      videoRefs.current.forEach((vid, idx) => { if (idx !== i && vid) vid.pause(); });
      v.play();
      setPlaying(i);
    }
  };

  // 9:16 portrait — video height fills ~82% of the section, width derived from ratio
  const VIDEO_H = `calc((100vh - ${NAV_H}px) * 0.82)`;
  const VIDEO_W = `calc((100vh - ${NAV_H}px) * 0.82 * 9 / 16)`;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 16, padding: "0 40px 40px", overflowX: "auto", minHeight: 0 }}>
      {BRAND_VIDEOS.map((vid, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "row", flexShrink: 0, gap: 0 }}>

          {/* Video — natural portrait 9:16 */}
          <div
            style={{ width: VIDEO_W, height: VIDEO_H, position: "relative", backgroundColor: "#111", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}
            onClick={() => togglePlay(i)}
          >
            {vid.src ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={vid.src}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                playsInline
                onEnded={() => setPlaying(null)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={16} color="rgba(255,255,255,0.35)" style={{ marginLeft: 2 }} />
                </div>
                <span style={{ fontSize: 8, letterSpacing: 3, color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Coming soon</span>
              </div>
            )}
            {vid.src && playing !== i && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={16} color="#fff" style={{ marginLeft: 2 }} />
                </div>
              </div>
            )}
          </div>

          {/* Description panel — right of each video, same height */}
          <div style={{
            width: 120,
            height: VIDEO_H,
            flexShrink: 0,
            borderLeft: `1px solid ${RULE}`,
            borderRight: i < BRAND_VIDEOS.length - 1 ? `1px solid ${RULE}` : "none",
            backgroundColor: BG,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 18px 24px",
            gap: 5,
          }}>
            <p style={{ margin: 0, fontFamily: "'Bootzy', serif", fontSize: 24, color: INK, lineHeight: 1.1 }}>
              {vid.brand}
            </p>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 1.5, color: INK, textTransform: "uppercase" }}>
              {vid.label}
            </p>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 1.5, color: INK, textTransform: "uppercase" }}>
              {vid.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Hamburger Menu Overlay ────────────────────────────────
function MobileMenuOverlay({ open, onClose, onNav }: { open: boolean; onClose: () => void; onNav: (id: string) => void }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      backgroundColor: BG,
      display: "flex",
      flexDirection: "column",
      padding: "0 24px",
    }}>
      {/* Close button */}
      <div style={{ height: NAV_H, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Close menu"
        >
          <X size={22} color={INK} />
        </button>
      </div>
      {/* Nav links */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNav(tab.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: "12px 0",
              fontFamily: "'Bootzy', serif",
              fontSize: 48,
              color: INK,
              letterSpacing: 1,
              lineHeight: 1.1,
              borderBottom: `1px solid ${RULE}`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────────────────

export default function EPKPage() {
  const [activeTab, setActiveTab] = useState("bio");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    // Small delay to let overlay close before scrolling
    setTimeout(() => goTo(id), 80);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const sectionIds = ["hero", ...TABS.map((t) => t.id)];
    const onScroll = () => {
      const midY = container.clientHeight / 2;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - container.getBoundingClientRect().top <= midY) {
          current = id;
        }
      }
      setActiveTab(current === "hero" ? "bio" : current);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const bioWords = bioTextRef.current?.querySelectorAll(".bio-word");
    let bioPlayed = false;
    const bioObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && bioWords?.length && !bioPlayed) {
        bioPlayed = true;
        gsap.fromTo(bioWords,
          { opacity: 0.08, color: "rgba(0,0,0,0.08)" },
          { opacity: 1, color: "rgba(0,0,0,0.82)", stagger: 0.018, duration: 0.35, ease: "power2.out" }
        );
      }
    }, { root: container, threshold: 0.3 });
    if (bioTextRef.current) bioObs.observe(bioTextRef.current);

    let statPlayed = false;
    const statObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !statPlayed) {
        statPlayed = true;
        gsap.from(".stat-item", { opacity: 0, y: 50, scale: 0.94, stagger: 0.15, duration: 0.9, ease: "power3.out" });
      }
    }, { root: container, threshold: 0.3 });
    const statEl = document.getElementById("stats");
    if (statEl) statObs.observe(statEl);

    let servPlayed = false;
    const servObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !servPlayed) {
        servPlayed = true;
        gsap.from(".service-row", { opacity: 0, x: -40, stagger: 0.1, duration: 0.7, ease: "power3.out" });
      }
    }, { root: container, threshold: 0.3 });
    const servEl = document.getElementById("services");
    if (servEl) servObs.observe(servEl);

    let bookPlayed = false;
    const bookObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !bookPlayed) {
        bookPlayed = true;
        gsap.from(".contact-inner", { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" });
      }
    }, { root: container, threshold: 0.3 });
    const bookEl = document.getElementById("booking");
    if (bookEl) bookObs.observe(bookEl);

    return () => { bioObs.disconnect(); statObs.disconnect(); servObs.disconnect(); bookObs.disconnect(); };
  }, []);

  const bioWords = BIO.split(" ").map((word, i) => (
    <span key={i} className="bio-word" style={{ display: "inline" }}>{word}{" "}</span>
  ));

  const snap: React.CSSProperties = {
    minHeight: `calc(100vh - ${NAV_H}px)`,
  };

  return (
    <main style={{ backgroundColor: BG, color: INK, fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif" }}>

      {/* ── Mobile hamburger overlay ─────────────────── */}
      <MobileMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onNav={handleNavClick} />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: BG, borderBottom: `1px solid ${RULE}`,
        display: "flex", alignItems: "center",
        padding: isMobile ? "0" : `0 36px`,
        height: NAV_H,
      }}>

        {isMobile ? (
          /* ── Mobile nav: hamburger | CC wordmark (centered) | palm ── */
          <>
            {/* Hamburger — left */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                width: 44, height: NAV_H,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
              aria-label="Open menu"
            >
              <Menu size={22} color={INK} />
            </button>

            {/* CC wordmark — absolutely centered */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <span style={{ fontFamily: "'NeueHaas', 'Helvetica Neue', Arial, sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: INK, whiteSpace: "nowrap" }}>
                Changing Currents
              </span>
            </div>

            {/* CC emblem — right */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", paddingRight: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/epk-logo.png"
                alt=""
                style={{
                  height: 40,
                  display: "block",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </>
        ) : (
          /* ── Desktop nav: tab buttons + optional palm ── */
          <>
            <div style={{ display: "flex", overflowX: "auto" }}>
              {TABS.map((tab) => (
                <button key={tab.id} onClick={() => goTo(tab.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0 22px", height: NAV_H,
                  fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
                  color: activeTab === tab.id ? INK : "rgba(0,0,0,0.65)",
                  fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                  position: "relative", transition: "color 0.2s", flexShrink: 0,
                }}>
                  {tab.label}
                  {activeTab === tab.id && (
                    <span style={{ position: "absolute", bottom: 0, left: 20, right: 20, height: 1, backgroundColor: INK }} />
                  )}
                </button>
              ))}
            </div>
            {/* CC emblem decoration — far right */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/epk-logo.png"
                alt=""
                style={{
                  height: 30,
                  display: "block",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </>
        )}
      </nav>

      {/* ── SCROLL CONTAINER ────────────────────────── */}
      <div ref={scrollRef} style={{
        marginTop: NAV_H,
        height: `calc(100vh - ${NAV_H}px)`,
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}>

        {/* HERO */}
        {isMobile ? (
          /* Mobile hero: fixed-height image + compact text — everything visible on first load */
          <section id="hero" style={{ height: `calc(100vh - ${NAV_H}px)`, backgroundColor: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Image: exactly enough space, text block gets the rest */}
            <div style={{ height: "calc(100vh - 52px - 168px)", overflow: "hidden", flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/epk-hero.png" alt="Changing Currents" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            </div>
            {/* Bottom text block: exactly 168px */}
            <div style={{ height: 168, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", gap: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/epk-logo.png" alt="CC Logo" style={{ height: 38, display: "block", mixBlendMode: "multiply", marginBottom: 6 }} />
              <h1 style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 0.92, color: INK, margin: 0, letterSpacing: "-1px", textAlign: "center" }}>
                CHANGING<br />CURRENTS
              </h1>
              <p style={{ fontSize: 8, letterSpacing: 5, color: MUTED, textTransform: "uppercase", marginTop: 8, marginBottom: 0, textAlign: "center" }}>
                DJ &nbsp;/&nbsp; Producer
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <p style={{
                  fontFamily: "'Homemade Apple', cursive",
                  fontSize: "clamp(10px, 2.6vw, 13px)",
                  color: "rgba(0,0,0,0.4)",
                  margin: 0,
                  lineHeight: 1,
                  transform: "rotate(-3deg)",
                  display: "inline-block",
                }}>
                  cc baby!
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 3, opacity: 0.35 }}>
                  <span style={{ fontSize: 7, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Scroll</span>
                  <ChevronDown size={8} color={INK} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Desktop hero: side-by-side */
          <section id="hero" style={{ height: `calc(100vh - ${NAV_H}px)`, backgroundColor: BG, display: "flex", flexDirection: "row", overflow: "hidden", position: "relative" }}>
            <div style={{ width: "44%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", padding: "0 0 72px 32px", flexShrink: 0, zIndex: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/epk-logo.png" alt="CC Logo" style={{ width: "clamp(110px, 13vw, 165px)", marginBottom: 20, display: "block", mixBlendMode: "multiply" }} />
              <h1 style={{ fontFamily: "'Bootzy', serif", fontSize: "clamp(56px, 7vw, 108px)", lineHeight: 0.93, color: INK, margin: 0, letterSpacing: "-1px", textAlign: "center" }}>
                CHANGING<br />CURRENTS
              </h1>
              <p style={{ fontSize: 10, letterSpacing: 5, color: MUTED, textTransform: "uppercase", marginTop: 22, marginBottom: 0, textAlign: "center" }}>
                DJ &nbsp;/&nbsp; Producer
              </p>
              <p style={{
                fontFamily: "'Homemade Apple', cursive",
                fontSize: "clamp(12px, 1.3vw, 18px)",
                color: "rgba(0,0,0,0.45)",
                margin: "20px 0 0 0",
                lineHeight: 1,
                transform: "rotate(-3deg)",
                display: "inline-block",
                transformOrigin: "center center",
              }}>
                cc baby!
              </p>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/epk-hero.png" alt="Changing Currents" style={{ height: "100%", width: "100%", objectFit: "contain", objectPosition: "center bottom" }} />
            </div>
            <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, zIndex: 3 }}>
              <span style={{ fontSize: 10, letterSpacing: 4, color: INK, textTransform: "uppercase" }}>Scroll</span>
              <ChevronDown size={12} color={INK} />
            </div>
          </section>
        )}

        {/* BIO */}
        <section id="bio" style={{
          ...snap,
          borderTop: `1px solid ${RULE}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile ? "52px 24px" : "60px 80px",
        }}>
          <span style={{ display: "block", fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase", marginBottom: 44 }}>Bio</span>
          <p ref={bioTextRef} style={{
            fontSize: isMobile ? "clamp(13px, 3.5vw, 16px)" : "clamp(15px, 1.4vw, 19px)",
            lineHeight: 1.9,
            maxWidth: 820,
            margin: 0,
            color: INK,
          }}>
            {bioWords}
          </p>
        </section>

        {/* STATS */}
        <StatsSection />

        {/* CAMPAIGN */}
        <section id="campaigns" style={{ ...snap, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: isMobile ? "24px 24px 24px" : "52px 80px 36px", borderBottom: `1px solid ${RULE}`, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Campaign</span>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 9, letterSpacing: 4, color: MUTED, textTransform: "uppercase" }}>Scroll</span>
              <span style={{ fontSize: 14, color: MUTED }}>→</span>
            </div>
          </div>
          <CampaignLayout />
        </section>

        {/* INTERVIEWS */}
        <section id="interviews" style={{ ...snap, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: isMobile ? "40px 24px 28px" : "52px 80px 36px", borderBottom: `1px solid ${RULE}`, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Interviews</span>
          </div>

          {isMobile ? (
            /* Mobile: vertical stack of full-width portrait videos */
            <div style={{ display: "flex", flexDirection: "column", gap: 0, padding: "0 0 40px" }}>
              {INTERVIEWS.map((vid, i) => {
                return (
                  <div key={i} style={{ borderBottom: `1px solid ${RULE}` }}>
                    {/* Full-width 9:16 video */}
                    <div
                      style={{ width: "100%", aspectRatio: "9 / 16", position: "relative", backgroundColor: "#111", cursor: "pointer", overflow: "hidden" }}
                      onClick={(e) => {
                        const v = e.currentTarget.querySelector("video");
                        if (v) v.paused ? v.play() : v.pause();
                      }}
                    >
                      <video
                        src={vid.src}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        playsInline
                      />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Play size={16} color="#fff" style={{ marginLeft: 2 }} />
                        </div>
                      </div>
                    </div>
                    {/* Title / label / year below in a row */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "14px 24px 16px" }}>
                      <span style={{ fontFamily: "'Bootzy', serif", fontSize: 20, color: INK, lineHeight: 1.1, flex: 1 }}>{vid.title}</span>
                      <span style={{ fontSize: 9, letterSpacing: 2, color: MUTED, textTransform: "uppercase", flexShrink: 0 }}>{vid.label}</span>
                      <span style={{ fontSize: 9, letterSpacing: 2, color: FAINT, textTransform: "uppercase", flexShrink: 0 }}>{vid.year}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Desktop: horizontal scroll */
            <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 16, padding: "0 40px 40px", overflowX: "auto", minHeight: 0 }}>
              {INTERVIEWS.map((vid, i) => {
                const vH = `calc((100vh - ${NAV_H}px) * 0.82)`;
                const vW = `calc((100vh - ${NAV_H}px) * 0.82 * 9 / 16)`;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "row", flexShrink: 0 }}>
                    {/* Video */}
                    <div style={{ width: vW, height: vH, position: "relative", backgroundColor: "#111", cursor: "pointer", overflow: "hidden" }}
                      onClick={(e) => {
                        const v = e.currentTarget.querySelector("video");
                        if (v) v.paused ? v.play() : v.pause();
                      }}
                    >
                      <video
                        src={vid.src}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        playsInline
                      />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Play size={16} color="#fff" style={{ marginLeft: 2 }} />
                        </div>
                      </div>
                    </div>
                    {/* Info panel */}
                    <div style={{ width: 120, height: vH, flexShrink: 0, borderLeft: `1px solid ${RULE}`, backgroundColor: BG, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 18px 24px", gap: 5 }}>
                      <p style={{ margin: 0, fontFamily: "'Bootzy', serif", fontSize: 18, color: INK, lineHeight: 1.2 }}>
                        {vid.title}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, letterSpacing: 1.5, color: MUTED, textTransform: "uppercase" }}>
                        {vid.label}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, letterSpacing: 1.5, color: FAINT, textTransform: "uppercase" }}>
                        {vid.year}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* NOTABLE SHOWS */}
        <section id="shows" style={{ ...snap, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: isMobile ? "40px 24px 28px" : "52px 80px 36px", borderBottom: `1px solid ${RULE}`, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase" }}>Notable Shows</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 24px" : "0 80px" }}>
            {SHOWS.map((show, i) => (
              isMobile ? (
                /* Mobile: tighter rows, venue wraps, date/note stacked right */
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  borderBottom: `1px solid ${RULE}`, padding: "18px 0",
                  gap: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1 }}>
                    <span style={{ fontSize: 10, color: FAINT, width: 20, flexShrink: 0, paddingTop: 3 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Bootzy', serif", fontSize: 20, color: INK, letterSpacing: 0.5, lineHeight: 1.2 }}>
                      {show.venue}{show.location ? `, ${show.location}` : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1.5, color: INK, textTransform: "uppercase" }}>
                      {show.note}
                    </span>
                    <span style={{ fontSize: 10, letterSpacing: 1.5, color: INK, textTransform: "uppercase" }}>
                      {show.date}
                    </span>
                  </div>
                </div>
              ) : (
                /* Desktop */
                <div key={i} style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between",
                  borderBottom: `1px solid ${RULE}`, padding: "28px 0",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 40, flex: 1 }}>
                    <span style={{ fontSize: 11, color: FAINT, width: 24, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Bootzy', serif", fontSize: 28, color: INK, letterSpacing: 1 }}>
                      {show.venue}{show.location ? `, ${show.location}` : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 48 }}>
                    <span style={{ fontSize: 11, letterSpacing: 1.5, color: INK, textTransform: "uppercase", width: 130, textAlign: "right" }}>
                      {show.note}
                    </span>
                    <span style={{ fontSize: 11, letterSpacing: 1.5, color: INK, textTransform: "uppercase", width: 40, textAlign: "right" }}>
                      {show.date}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ ...snap, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", padding: isMobile ? "40px 24px" : "52px 80px" }}>
          <span style={{ display: "block", fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase", marginBottom: 44 }}>
            Talent &amp; Creative Services
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICES.map((s) => (
              isMobile ? (
                /* Mobile: category label above items, stacked */
                <div key={s.category} className="service-row" style={{ borderTop: `1px solid ${RULE}`, padding: "20px 0" }}>
                  <span style={{ display: "block", fontSize: 9, letterSpacing: 3, color: INK, textTransform: "uppercase", marginBottom: 10 }}>{s.category}</span>
                  <span style={{ fontSize: 14, color: INK, letterSpacing: 0.2, lineHeight: 1.6 }}>{s.items}</span>
                </div>
              ) : (
                /* Desktop: side-by-side */
                <div key={s.category} className="service-row" style={{ display: "flex", alignItems: "baseline", gap: 60, borderTop: `1px solid ${RULE}`, padding: "26px 0" }}>
                  <span style={{ fontSize: 10, letterSpacing: 3, color: INK, textTransform: "uppercase", width: 170, flexShrink: 0 }}>{s.category}</span>
                  <span style={{ fontSize: 15, color: INK, letterSpacing: 0.3 }}>{s.items}</span>
                </div>
              )
            ))}
            {isMobile ? (
              <div className="service-row" style={{ borderTop: `1px solid ${RULE}`, padding: "20px 0" }}>
                <span style={{ fontSize: 11, color: INK, letterSpacing: 2, textTransform: "uppercase" }}>And more</span>
              </div>
            ) : (
              <div className="service-row" style={{ borderTop: `1px solid ${RULE}`, padding: "26px 0", paddingLeft: 230 }}>
                <span style={{ fontSize: 11, color: INK, letterSpacing: 2, textTransform: "uppercase" }}>And more</span>
              </div>
            )}
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" style={{ ...snap, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "60px 24px" : "60px 80px", alignItems: isMobile ? "center" : "flex-start", textAlign: isMobile ? "center" : "left" }}>
          <div className="contact-inner" style={{ width: "100%" }}>
            <span style={{ display: "block", fontFamily: "'Bootzy', serif", fontSize: 36, letterSpacing: 3, color: INK, textTransform: "uppercase", marginBottom: 44 }}>Get In Touch</span>
            {isMobile ? (
              /* Mobile: large mailto tap target in Bootzy font */
              <a
                href="mailto:cc@changingcurrents.co.uk"
                style={{
                  display: "block",
                  fontFamily: "'Bootzy', serif",
                  fontSize: "clamp(18px, 5vw, 28px)",
                  color: INK,
                  textDecoration: "none",
                  letterSpacing: 0.5,
                  lineHeight: 1.3,
                  padding: "16px 0",
                  borderTop: `1px solid ${RULE}`,
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                cc@changingcurrents.co.uk
              </a>
            ) : (
              <>
                <p style={{ fontSize: 11, letterSpacing: 1.5, color: INK, textTransform: "uppercase", margin: "0 0 12px" }}>Contact</p>
                <p style={{ fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif", fontSize: 15, color: INK, margin: 0, letterSpacing: 0.3 }}>
                  cc@changingcurrents.co.uk
                </p>
              </>
            )}
          </div>
        </section>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${RULE}`, padding: isMobile ? "28px 24px" : "28px 80px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, letterSpacing: 3, color: FAINT, textTransform: "uppercase" }}>© Changing Currents</span>
          <span style={{ fontSize: 9, letterSpacing: 3, color: FAINT, textTransform: "uppercase" }}>@changingcurrents</span>
        </div>
      </div>
    </main>
  );
}
