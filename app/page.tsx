"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="landing-root">
      <div className="landing-earth">
        <Image
          src="/earth with debris.jpeg"
          alt="Earth surrounded by orbital debris"
          fill
          priority
          sizes="(max-width: 768px) 80vw, 460px"
          style={{
            objectFit: "contain",
            filter: "brightness(1.2) contrast(1.1)",
          }}
        />
      </div>

      <div className="landing-walle-figure">
        <Image
          src="/walle looking at stars.jpg"
          alt="WALL·E sitting on a pile of trash looking at the sky"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 520px"
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            filter: "brightness(1.2) contrast(1.1)",
          }}
        />
      </div>

      <div className="landing-overlay" />

      <div className="landing-content">
        <h1 className="landing-title">TRASH TO STARS: 
            <br />
            WALL•E's EVE-olution Mission
        </h1>
        <p className="landing-subtitle">
          Our skies are starting to look like WALL•E's Earth. Learn & Help a small
          cleanup bot protect planets from a cloud of space junk.
        </p>
        <Link href="/briefing">
          <button className="btn landing-button">🚀 Begin Mission</button>
        </Link>
      </div>
    </div>
  );
}
