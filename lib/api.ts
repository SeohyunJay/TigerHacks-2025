export type DebrisStats = {
  totalObjects: number;
  massTons: number;
  smallFragmentsEstimate: number;
  updated: string;
};

export type DebrisNewspaper = {
  headline: string;
  subhead: string;
  body: string[];
};

export async function getDebrisStats(): Promise<DebrisStats> {
  return {
    totalObjects: 32000,
    massTons: 6700,
    smallFragmentsEstimate: 900000,
    updated: "Simulated from public ESA/NASA stats · no real data",
  };
}

export function generateDebrisNewspaper(stats: DebrisStats): DebrisNewspaper {
  const { totalObjects, massTons, smallFragmentsEstimate } = stats;

  const headlines = [
    "ORBITAL TRAFFIC JAM ABOVE EARTH",
    "SILENT STORM OF SPACE JUNK",
    "EARTH'S INVISIBLE TRASH RING GROWS",
  ];

  const subheads = [
    `Over ${totalObjects.toLocaleString()} tracked fragments and an estimated ${smallFragmentsEstimate.toLocaleString()} tiny pieces now crowd low Earth orbit.`,
    `Scientists estimate more than ${massTons.toLocaleString()} tons of debris circling the planet at deadly speeds.`,
    `From paint chips to defunct satellites, space junk threatens future missions and communications.`,
  ];

  const idx = Math.floor(Math.random() * headlines.length);

  return {
    headline: headlines[idx],
    subhead: subheads[idx],
    body: [
      "Space agencies around the world are sounding the alarm about orbital debris. Traveling at speeds over 7 km/s, even tiny fragments can damage satellites or threaten crewed missions.",
      "Without better cleanup strategies and smarter mission design, the risk of cascading collisions — sometimes called the Kessler Syndrome — continues to rise.",
      "Your mission today: learn about the problem, then help clean up a simulated orbit to protect your adopted world.",
    ],
  };
}

export type Planet = {
  name: string;
  type: string;
  yearLengthDays: number;
  distanceLabel: string;
  temperature: string;
  description: string;
  imageUrl: string;
};

const PLANETS: Planet[] = [
  {
    name: "Earth",
    type: "Terrestrial planet",
    yearLengthDays: 365.25,
    distanceLabel: "1 AU from the Sun (~150 million km)",
    temperature: "Average ~15 °C at the surface",
    description:
      "The only known world with liquid surface water and life. It already has a growing cloud of artificial satellites and debris in orbit.",
    imageUrl: "/planet-fallback.png",
  },
  {
    name: "Mars",
    type: "Terrestrial planet",
    yearLengthDays: 687,
    distanceLabel: "1.52 AU from the Sun (~228 million km)",
    temperature: "Cold and dry, around −60 °C on average",
    description:
      "A dusty desert world with the largest volcano and canyon in the Solar System. Future crewed missions will have to worry about both Mars dust and Earth-made space junk.",
    imageUrl: "/mars.png",
  },
  {
    name: "Jupiter",
    type: "Gas giant",
    yearLengthDays: 4333,
    distanceLabel: "5.2 AU from the Sun (~778 million km)",
    temperature: "Cloud tops around −110 °C",
    description:
      "The largest planet in the Solar System, with huge radiation belts and dozens of moons. Its strong gravity can fling comets and asteroids around like a cosmic pinball machine.",
    imageUrl: "/jupiter.png",
  },
  {
    name: "Saturn",
    type: "Gas giant with rings",
    yearLengthDays: 10759,
    distanceLabel: "9.5 AU from the Sun (~1.4 billion km)",
    temperature: "Upper atmosphere around −140 °C",
    description:
      "A gas giant famous for its bright rings, made of countless icy particles. Any long-lived missions here must carefully thread through natural and artificial debris.",
    imageUrl: "/saturn.png",
  },
];

export async function getRandomPlanet(
  excludeName?: string
): Promise<Planet> {
  const pool =
    excludeName && PLANETS.length > 1
      ? PLANETS.filter((p) => p.name !== excludeName)
      : PLANETS;

  const idx = Math.floor(Math.random() * pool.length);
  const selected = pool[idx];

  return { ...selected };
}
