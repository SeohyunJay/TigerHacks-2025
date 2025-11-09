"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import type { Planet } from "@/lib/api";

export default function MissionPhotoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [planet, setPlanet] = useState<Planet | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("adoptedPlanet");
      if (stored) {
        try {
          setPlanet(JSON.parse(stored));
        } catch {
          setPlanet(null);
        }
      }
    }

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setCameraReady(true);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError(
          "Could not access your camera. Please check browser permissions."
        );
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    if (typeof window === "undefined") return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = planet?.imageUrl || "/planet-fallback.png";

    img.onload = () => {
      const size = width * 0.22;
      const x = width - size - 40;
      const y = height - size - 40;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, size, size);
      ctx.restore();

      const planetName = planet?.name || "Your Planet";
      ctx.font =
        "32px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'";
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "rgba(15,23,42,0.9)";
      ctx.lineWidth = 4;

      const title = `Guardian of ${planetName}`;
      const subtitle = "Planet Learned and Orbit Stabilized";

      ctx.strokeText(title, 42, 60);
      ctx.fillText(title, 42, 60);

      ctx.font =
        "22px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'";
      ctx.strokeText(subtitle, 42, 100);
      ctx.fillText(subtitle, 42, 100);

      const dataUrl = canvas.toDataURL("image/png");
      setPhotoDataUrl(dataUrl);
    };
  };

  const handleDownload = () => {
    if (!photoDataUrl) return;
    const a = document.createElement("a");
    a.href = photoDataUrl;
    const safeName = (planet?.name || "planet")
      .toLowerCase()
      .replace(/\s+/g, "_");
    a.download = `mission_guardian_${safeName}.png`;
    a.click();
  };

  const handleRetake = () => {
    setPhotoDataUrl(null);
  };

  return (
    <div className="page">
      <h1 className="page-title">Mission Polaroid</h1>
      <p className="page-subtitle">
        Like the humans on the Axiom taking photos, snap a mission picture with
        your learned/adopted planet after your cleanup bot has made its orbit
        safe.
      </p>

      <div className="card" style={{ marginBottom: "1.2rem" }}>
        <div className="badge">
          <span>📷</span>
          <span>Mission Photo</span>
        </div>

        {planet ? (
          <p style={{ fontSize: "0.9rem", marginTop: "0.7rem" }}>
            You&apos;re the guardian of <strong>{planet.name}</strong>. Take
            your official mission photo to celebrate a safer orbit.
          </p>
        ) : (
          <p style={{ fontSize: "0.9rem", marginTop: "0.7rem" }}>
            No adopted planet found. You can still try the camera, or go back to
            the Adopt page to pick a world and clean its orbit.
          </p>
        )}

        {cameraError && (
          <p style={{ color: "#fecaca", fontSize: "0.86rem" }}>{cameraError}</p>
        )}

        <div
          style={{
            marginTop: "1rem",
            display: photoDataUrl ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <div className="video-frame">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="video-element"
            />
            <div className="planet-overlay">
              <img
                src={planet?.imageUrl || "/planet-fallback.png"}
                alt={planet?.name || "Planet"}
              />
            </div>
          </div>
          <button
            className="btn"
            onClick={handleCapture}
            disabled={!cameraReady}
          >
            {cameraReady ? "📸 Take Mission Photo" : "Loading camera…"}
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {photoDataUrl && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.9rem",
            }}
          >
            <img
              src={photoDataUrl}
              alt="Mission photo"
              className="photo-preview"
            />
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button className="btn" onClick={handleDownload}>
                ⬇️ Download Photo
              </button>
              <button className="btn btn-secondary" onClick={handleRetake}>
                🔁 Retake
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                marginTop: "0.4rem",
              }}
            >
              <NextImage
                src="/walle.png"
                alt="Cleanup bot"
                width={70}
                height={80}
              />
              <span style={{ fontSize: "0.85rem" }}>
                Mission complete! Your orbit is clean – directive fulfilled.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
