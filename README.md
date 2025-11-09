This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# TigerHacks-2025

## Inspiration

We all know WALL•E as the little robot cleaning up a trash-covered Earth.  
I wanted to imagine: **what if WALL•E's next mission was in orbit?**

Space debris is a real, growing problem – defunct satellites, rocket parts, and tiny fragments flying around Earth at thousands of miles per hour. That felt like the perfect mix of **serious science + playful storytelling** for 2025 TigerHacks.

So I built **Trash to Stars: WALL•E's EVE-olution Mission** as a small, interactive experience where anyone can:

- **Learn** about real space junk incidents and risks  
- **Play** a mini-game to clean up orbital debris  
- **Celebrate** with a "mission polaroid" photo with their adopted planet  

---

## What it does

The project is a small Next.js web app with three main experiences:

### 1. Newsletter – "Orbital Observer" news page  
- A **newspaper-style front page** that highlights real articles and videos about real space debris issues.  
- A **Debris Snapshot** panel that summarizes key numbers (tracked objects, tiny fragments, total mass in orbit).
- The goal is to set the tone: this looks like WALL•E's world, but the headlines come from **real space missions and risks**.

### 2. Learn & Adopt & Clean – orbit cleanup mini-game  
- You **learn about & adopt a planet** (Earth, Mars, Jupiter, or Saturn) with real scientific data: distance, orbital period, temperature, and a short description.  
- Next to it is a **circular orbit mini-game**:
  - Debris objects (trash cans, satellites, and asteroids) move around the planet on three orbits.
  - You clear space junk by clicking on the moving debris until the orbit is completely clean.
- Each planet also has an embedded **YouTube explainer video** so users can learn more while they play.

When you finish cleaning, the adopted planet is saved locally so it can be used in the final step.

### 3. Mission Polaroid – camera + planet sticker  
- The site uses the **laptop's webcam** via the browser's `getUserMedia` API.  
- When you take a photo:
  - The app captures the current video frame to an HTML `<canvas>`.
  - It overlays a **circular sticker** of your adopted planet in the corner.
  - It renders text like _"Guardian of Mars – Planet Learned and Orbit Stabilized"_ on top.
- You can then **download the final image** as your "mission polaroid," just like the humans on the Axiom.

---

## How I built it

- The app is built with **Next.js + React + TypeScript**, using the App Router.
- Styling is done with **custom CSS** in `globals.css` to create:
  - A starry, sci-fi UI  
  - Newspaper-style layouts  
  - Circular orbit and debris visuals  
- The **orbit game** uses:
  - Simple math (angles + radii) to place debris in a circle around the planet  
  - `requestAnimationFrame` to animate debris positions smoothly over time  
  - Click handlers to "remove" debris and track remaining pieces  
- The **mission photo** uses:
  - The **MediaDevices `getUserMedia` API** to access the webcam  
  - An off-screen **HTML `<canvas>`** to draw the video frame, planet image, and text overlays  
  - `canvas.toDataURL()` to generate a downloadable PNG  
- I use **`localStorage`** to remember which planet you adopted and cleaned so it can appear in the mission photo.

---

## Challenges I ran into

- **Webcam handling & retakes**  
  Getting the camera to start reliably, then behave correctly when taking and retaking photos, meant being careful with:
  - Not unmounting the `<video>` element too early  
  - Stopping media tracks correctly on unmount  
  - Handling permission errors and browser behavior differences  

- **Orbit animation that feels "alive" but simple**  
  I didn’t use a physics engine—just angles and speeds—so I had to tune:
  - Different speeds for each orbit  
  - Random directions and starting angles  
  to make it feel playful rather than too static or too chaotic.

- **Balancing theme vs. accuracy**  
  I wanted a strong WALL•E vibe without making everything purely fictional. That’s why:
  - The visual style is playful and Pixar-inspired  
  - The **headlines and videos are pulled from real space debris stories** to ground the experience in reality.

---

## What I learned

- How to combine **front-end animations, real-world data, and storytelling** into a cohesive experience in the theme of **Space**.  
- Practical experience with:
  - The **MediaDevices API** and camera permissions  
  - **Canvas drawing** and compositing for custom images  
  - Structuring a small multi-page app in **Next.js (App Router)**  
- How much **UX and visuals** matter when teaching something serious like orbital debris—people are more engaged when it feels like a little story instead of just charts.

---

## What’s next

If I had more time, I'd love to:

- Pull **live debris data** from a real API (e.g., NORAD/space-track or ESA datasets) instead of mocked stats.  
- Add more **planets and exoplanets**, each with their own difficulty level and unique debris patterns.  
- Introduce **scoring, levels, and badges** for multiple cleanup missions.  
- Build a classroom mode where students can compare how "clean" their orbits are after a certain time limit.  

Trash to Stars is a small step, but I hope it makes people think:  
if WALL•E had to clean up Earth, maybe we should take better care of orbit too!

---

## Credits

- **Project & development**  
  Designed and built by _Seohyun Kim_ for **TigerHacks 2025**.

- **Inspiration**  
  - Disney·Pixar's *WALL•E* (for overall story/theme inspiration)  
  - Real news coverage on space debris and orbital junk

- **Artwork & visuals**  
  - Background and UI styling inspired by classic sci-fi control panels and starfield imagery.
  - https://www.livescience.com/space/its-time-to-clean-up-space-junk-before-orbits-become-unusable-according-to-new-esa-report
  - https://reason.com/2022/11/15/wall-e/
  - https://www.dlr.de/en/ar/topics-missions/space-safety/space-debris
  - https://www.nasa.gov/
  - https://easydrawingguides.com/how-to-draw-an-asteroid/
  - https://pixabay.com/illustrations/satellite-universe-space-astronomy-6811254/
  - https://www.dreamstime.com/illustration/trash.html
  - https://www.artstation.com/artwork/Dxgn4e
  - https://vsbattles.fandom.com/wiki/EVE_(WALL-E)

- **Data & educational content**  
  - Realistic planet facts (Earth, Mars, Jupiter, Saturn) based on publicly available astronomy sources.  
  - Space debris incidents and risks based on news articles and videos linked in the **Orbital Observer** page.

- **Technologies**  
  - **Next.js**, **React**, **TypeScript**  
  - HTML5 **Canvas** API  
  - **MediaDevices.getUserMedia** (webcam)  
  - LocalStorage  
  - Git & GitHub
