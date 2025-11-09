"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    "nav-link" + (pathname === path ? " nav-link-active" : "");

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-mark">
            <Image
              src="/walle title.png"
              alt="WALL·E"
              width={260}
              height={70}
              priority
            />
          </div>
          <span className="nav-logo-text">
            TRASH TO STARS
            <span className="nav-logo-sub">WALL•E's EVE-olution Mission</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/briefing" className={linkClass("/briefing")}>
            Newsletter
          </Link>
          <Link href="/adopt" className={linkClass("/adopt")}>
            Learn & Adopt & Clean
          </Link>
          <Link href="/mission" className={linkClass("/mission")}>
            Mission Photo
          </Link>
        </nav>
      </div>
    </header>
  );
}
