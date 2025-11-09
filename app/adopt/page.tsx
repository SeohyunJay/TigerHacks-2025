"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Planet, getRandomPlanet } from "@/lib/api";

type GameState = "idle" | "playing" | "complete";

type Debris = {
  id: number;
  orbitIndex: 1 | 2 | 3;
  angle: number;
  removed: boolean;
  speed: number;
  direction: 1 | -1;
  sprite: "trash" | "satellite" | "asteroid";
};

function createInitialDebris(count: number): Debris[] {
  const debrisArray: Debris[] = [];

  for (let i = 0; i < count; i++) {
    const orbitIndex = ((i % 3) + 1) as 1 | 2 | 3;
    const angle = Math.random() * 360;

    const baseSpeedMap: Record<1 | 2 | 3, number> = {
      1: 40,
      2: 28,
      3: 20,
    };
    const speed = baseSpeedMap[orbitIndex];

    const direction: 1 | -1 = Math.random() < 0.5 ? 1 : -1;

    const sprites: Debris["sprite"][] = ["trash", "satellite", "asteroid"];
    const sprite = sprites[Math.floor(Math.random() * sprites.length)];

    debrisArray.push({
      id: i,
      orbitIndex,
      angle,
      removed: false,
      speed,
      direction,
      sprite,
    });
  }

  return debrisArray;
}

function getDebrisPosition(orbitIndex: 1 | 2 | 3, angle: number) {
  const radiusMap: Record<1 | 2 | 3, number> = {
    1: 130,
    2: 180,
    3: 230,
  };
  const radius = radiusMap[orbitIndex];

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return {
    top: `calc(50% + ${y}px)`,
    left: `calc(50% + ${x}px)`,
  };
}

function getPlanetVideoId(name: string): string | null {
  switch (name) {
    case "Saturn":
      return "wXr6yUDTUsA";
    case "Earth":
      return "uAwTWAC0vt0";
    case "Jupiter":
      return "43CsIpzkF0c";
    case "Mars":
      return "Ruo_uZHeLls";
    default:
      return null;
  }
}

export default function AdoptAndCleanPage() {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loadingPlanet, setLoadingPlanet] = useState(true);

  const [debris, setDebris] = useState<Debris[]>([]);
  const [initialCount, setInitialCount] = useState(10);
  const [removedCount, setRemovedCount] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [recentMessage, setRecentMessage] = useState<string>("");

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    async function loadPlanet() {
      setLoadingPlanet(true);
      const p = await getRandomPlanet();
      setPlanet(p);
      setLoadingPlanet(false);
    }
    loadPlanet();
  }, []);

  useEffect(() => {
    if (gameState !== "playing") {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;
      const deltaSeconds = deltaMs / 1000;

      setDebris((prev) =>
        prev.map((d) =>
          d.removed
            ? d
            : {
                ...d,
                angle:
                  (d.angle + d.direction * d.speed * deltaSeconds + 360) % 360,
              }
        )
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [gameState]);

  const startGame = () => {
    const total = 10;
    const arr = createInitialDebris(total);
    setDebris(arr);
    setInitialCount(total);
    setRemovedCount(0);
    setGameState("playing");
    setRecentMessage(
      "Mission started – clear every piece of debris from orbit!"
    );
  };

  const handleDebrisClick = (id: number) => {
    if (gameState !== "playing") return;

    setDebris((prev) =>
      prev.map((d) =>
        d.id === id && !d.removed ? { ...d, removed: true } : d
      )
    );

    setRemovedCount((prev) => {
      const next = prev + 1;
      const remaining = initialCount - next;

      if (remaining === 0) {
        setGameState("complete");
        setRecentMessage("Orbit completely clean – fantastic work, guardian!");

        if (planet && typeof window !== "undefined") {
          window.localStorage.setItem("adoptedPlanet", JSON.stringify(planet));
        }
      } else {
        if (remaining <= 2) {
          setRecentMessage("Almost there, just a couple of pieces left!");
        } else {
          setRecentMessage("Nice hit! Keep cleaning the orbit.");
        }
      }

      return next;
    });
  };

  const remainingCount = initialCount - removedCount;

  const getStatusText = (): string => {
    if (gameState === "idle")
      return "Tap 'Start Cleanup' to begin the mission.";
    if (gameState === "playing")
      return "Objective: click every single piece of debris until the orbit is clear.";
    if (gameState === "complete")
      return "Orbit fully sanitized! Your planet is much safer now.";
    return "";
  };

  const handleNewPlanet = async () => {
    setLoadingPlanet(true);

    const currentName = planet?.name;
    const p = await getRandomPlanet(currentName);

    setPlanet(p);
    setLoadingPlanet(false);
    setGameState("idle");
    setDebris([]);
    setRemovedCount(0);
    setRecentMessage("");
  };

  return (
    <div className="page">
      <h1 className="page-title">Learn / Adopt a Planet &amp; Clean Its Orbit</h1>
      <p className="page-subtitle">
        Learn and Adopt a distant world and help cleanup robot as it chases
        drifting space junk around the planet's orbit.
      </p>

      <div
        className="card"
        style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap" }}
      >
        {/* Planet info + video */}
        <div style={{ flex: "1 1 320px", minWidth: "320px" }}>
          <div className="badge">
            <span>🪐</span>
            <span>Learn / Adopt a Planet</span>
          </div>
          {loadingPlanet && <p style={{ marginTop: "0.7rem" }}>Loading…</p>}
          {!loadingPlanet && planet && (
            <>
              <h2
                style={{
                  marginTop: "0.7rem",
                  marginBottom: "0.1rem",
                }}
              >
                {planet.name}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#e5e7eb",
                }}
              >
                {planet.type}
              </p>
              <ul style={{ marginTop: "0.6rem", paddingLeft: "1.1rem" }}>
                <li style={{ fontSize: "0.84rem" }}>
                  Orbital period:{" "}
                  {planet.yearLengthDays.toLocaleString()} Earth days
                </li>
                <li style={{ fontSize: "0.84rem" }}>
                  Distance: {planet.distanceLabel}
                </li>
                <li style={{ fontSize: "0.84rem" }}>
                  Temperature: {planet.temperature}
                </li>
              </ul>
              <p style={{ fontSize: "0.86rem", marginTop: "0.4rem" }}>
                {planet.description}
              </p>

              {/* Planet-specific video */}
              {(() => {
                const videoId = getPlanetVideoId(planet.name);
                if (!videoId) return null;
                return (
                  <div
                    style={{
                      marginTop: "0.8rem",
                      marginBottom: "0.6rem",
                      borderRadius: "0.9rem",
                      overflow: "hidden",
                      boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                      }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${planet.name} video`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              })()}

              <div
                style={{
                  marginTop: "0.4rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <button className="btn btn-secondary" onClick={startGame}>
                  🧹 Start Cleanup
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleNewPlanet}
                >
                  🎲 New Planet
                </button>
              </div>
            </>
          )}
        </div>

        {/* Orbit + game */}
        <div
          style={{
            flex: "1 1 320px",
            minWidth: "320px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <div className="orbit-container">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />

            <div className="planet-core">
              <img
                src={planet?.imageUrl || "/planet-fallback.png"}
                alt={planet?.name || "Adopted planet"}
              />
            </div>

            {debris
              .filter((d) => !d.removed)
              .map((d) => {
                const pos = getDebrisPosition(d.orbitIndex, d.angle);

                let src = "/garbage.png";
                if (d.sprite === "satellite") src = "/satellite.png";
                if (d.sprite === "asteroid") src = "/asteroid.png";

                return (
                  <img
                    key={d.id}
                    src={src}
                    alt={`${d.sprite} debris`}
                    className="debris-sprite"
                    style={pos}
                    title="Click to clean"
                    onClick={() => handleDebrisClick(d.id)}
                  />
                );
              })}
          </div>

          {/* Counters */}
          <div style={{ fontSize: "0.85rem", textAlign: "center" }}>
            <div>
              Remaining debris: <strong>{remainingCount}</strong>
            </div>
            <div>Removed: {removedCount}</div>
            <div style={{ marginTop: "0.3rem", color: "#9ca3af" }}>
              {getStatusText()}
            </div>
            {recentMessage && (
              <div style={{ marginTop: "0.4rem" }}>{recentMessage}</div>
            )}
          </div>

          <div
            style={{
              marginTop: "0.6rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              maxWidth: "360px",
            }}
          >
            <Image
              src="/walle.png"
              alt="Cleanup bot helper"
              width={80}
              height={96}
            />
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                textAlign: "left",
              }}
            >
              Your little cleanup bot is cheering you on. Tap the moving trash
              cans, satellites, and asteroids until the orbit is completely
              clear!
            </p>
          </div>
        </div>
      </div>

      {/* CTA to mission photo */}
      <div
        className="card"
        style={{
          marginTop: "1.2rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 260px", fontSize: "0.9rem" }}>
          <h2 style={{ marginTop: 0, marginBottom: "0.3rem" }}>
            Save your mission results
          </h2>
          <p style={{ margin: 0 }}>
            Once you've cleaned every piece of debris, head to the Mission
            Photo page to take an astronaut-style picture with your learned & adopted
            planet.
          </p>
        </div>
        <div>
          <Link href="/mission">
            <button
              className="btn"
              disabled={gameState !== "complete"}
              title={
                gameState !== "complete"
                  ? "Clear all debris to unlock the mission photo"
                  : "Go to mission photo"
              }
            >
              📷 Go to Mission Photo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
