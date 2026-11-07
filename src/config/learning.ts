// The five-step learning path (plan appendix "So lernen Kinder"). These steps describe how
// skills grow; they are not course levels. Colours are the step-* tokens, used only here.

export const learningSteps = [
  {
    key: "build",
    name: "Build",
    area: "Mechanik",
    line: "Bauen, erleben, ausprobieren – von der Idee zum funktionierenden Modell.",
  },
  { key: "think", name: "Think", area: "Coding", line: "Logisch denken, programmieren, Probleme lösen." },
  { key: "control", name: "Control", area: "Sensorik", line: "Sensoren nutzen, Umwelt verstehen, Roboter steuern." },
  {
    key: "automate",
    name: "Automate",
    area: "Robotik",
    line: "Abläufe automatisieren, komplexere Projekte realisieren.",
  },
  {
    key: "innovate",
    name: "Innovate",
    area: "KI & Zukunftstechnologien",
    line: "Eigene Ideen entwickeln und Lösungen für reale Herausforderungen gestalten.",
  },
] as const;

/** Static class names so Tailwind can see them. */
export const stepColor: Record<(typeof learningSteps)[number]["key"], string> = {
  build: "bg-step-build",
  think: "bg-step-think",
  control: "bg-step-control",
  automate: "bg-step-automate",
  innovate: "bg-step-innovate",
};
