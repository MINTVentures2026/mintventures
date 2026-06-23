import { useLang } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { t } = useLang();

  const faqs = [
    {
      q: t("Braucht mein Kind Vorkenntnisse?", "Does my child need previous experience?"),
      a: t(
        "Nein. Viele Kinder starten ohne Programmier- oder Robotikerfahrung. Unsere Kurse sind in verschiedene Lernstufen gegliedert: Anfänger lernen Schritt für Schritt die Grundlagen mit LEGO SPIKE Prime, während fortgeschrittene Kinder an komplexeren Projekten und Wettbewerben arbeiten können.",
        "No. Many children start without any prior programming or robotics experience. Our courses are structured into different learning levels: beginners learn the fundamentals step by step with LEGO SPIKE Prime, while more advanced children work on complex projects and competitions."
      ),
    },
    {
      q: t("Für welches Alter sind die Kurse geeignet?", "What age is the course suitable for?"),
      a: t(
        "Unsere Robotik- und Programmierkurse richten sich an Kinder im Alter von 8 bis 14 Jahren. Die meisten Teilnehmer kommen aus Bonn, Bad Godesberg, Sankt Augustin, Königswinter und Köln. Auch Kinder ohne Vorkenntnisse sind herzlich willkommen.",
        "Our robotics and programming courses are designed for children aged 8 to 14. Most participants come from Bonn, Bad Godesberg, Sankt Augustin, Königswinter and Cologne. Children without prior experience are very welcome too."
      ),
    },
    {
      q: t("Wie helfen Robotik und Programmieren Kindern?", "How do robotics and coding help children?"),
      a: t(
        "Kinder bauen Roboter, programmieren Sensoren und Motoren und entwickeln eigene Lösungen für reale Aufgabenstellungen. Dabei lernen sie strukturiertes Denken, kreatives Problemlösen, Teamarbeit und den Umgang mit technischen Herausforderungen – wichtige Zukunftskompetenzen weit über das Coden hinaus.",
        "Children build robots, program sensors and motors, and develop their own solutions to real challenges. Along the way they learn structured thinking, creative problem-solving, teamwork and how to handle technical challenges — key future skills that go far beyond coding."
      ),
    },
    {
      q: t("Was ist LEGO SPIKE Prime?", "What is LEGO SPIKE Prime?"),
      a: t(
        "LEGO Education SPIKE Prime ist ein professionelles Lernsystem für Robotik und Programmierung. Es kombiniert LEGO-Bauteile mit Motoren, Sensoren und einem intelligenten Hub. Kinder programmieren ihre Modelle visuell mit Scratch-Blöcken und können später zu Python übergehen. Alle Materialien werden von uns bereitgestellt.",
        "LEGO Education SPIKE Prime is a professional learning system for robotics and programming. It combines LEGO bricks with motors, sensors and a smart hub. Children program their models visually with Scratch blocks and can later transition to Python. All materials are provided by us."
      ),
    },
    {
      q: t("Eignen sich die Kurse für Grundschulkinder?", "Are the courses suitable for primary school children?"),
      a: t(
        "Ja. Besonders unsere Explorer-Stufe wurde für Kinder ohne Vorerfahrung entwickelt und eignet sich hervorragend für Grundschüler ab ca. 8 Jahren, die erste Erfahrungen mit Robotik und Programmierung sammeln möchten.",
        "Yes. Our Explorer level in particular is designed for children without prior experience and is ideal for primary school children from around age 8 who want to take their first steps in robotics and programming."
      ),
    },
    {
      q: t("Kann mein Kind jederzeit einsteigen?", "Can my child join at any time?"),
      a: t(
        "In der Regel ja. Da wir in kleinen Gruppen und mit gestaffelten Lernstufen arbeiten, können neue Kinder meist flexibel einsteigen, sobald ein Platz frei wird. Schreiben Sie uns einfach an info@mintventures.de – wir melden uns mit passenden Vorschlägen.",
        "Usually, yes. Because we work in small groups with tiered learning levels, new children can typically join flexibly as soon as a spot opens up. Just write to info@mintventures.de and we'll get back to you with suitable options."
      ),
    },
    {
      q: t("Wie viele Kinder sind in einer Gruppe?", "How many children are in one group?"),
      a: t(
        "Wir arbeiten bewusst in kleinen Gruppen mit etwa 6 bis 10 Kindern. So können wir individuell auf jedes Kind eingehen und genügend Raum für Fragen, Experimente und eigene Ideen schaffen.",
        "We deliberately work in small groups of around 6 to 10 children. This lets us respond to each child individually and leaves plenty of room for questions, experiments and their own ideas."
      ),
    },
    {
      q: t("Gibt es eine Probestunde?", "Is there a trial session?"),
      a: t(
        "Ja. Wir empfehlen neuen Familien eine Probestunde, damit Kinder unsere Arbeitsweise kennenlernen und herausfinden können, ob ihnen Robotik und Programmierung Spaß machen. Schreiben Sie uns dazu kurz an info@mintventures.de.",
        "Yes. We recommend a trial session for new families so children can get to know how we work and find out whether they enjoy robotics and programming. Just write to info@mintventures.de to arrange one."
      ),
    },
    {
      q: t(
        "Nehmt ihr auch Kinder aus Köln, Sankt Augustin oder Königswinter auf?",
        "Do you also accept children from Cologne, Sankt Augustin or Königswinter?"
      ),
      a: t(
        "Ja, sehr gerne. Unsere Kurse finden vor Ort in Bonn statt, und viele Familien kommen aus Köln, Sankt Augustin, Königswinter und der weiteren Umgebung. Der Standort ist gut erreichbar, und Eltern empfinden den Weg in der Regel als unkompliziert.",
        "Yes, absolutely. Our courses take place on site in Bonn, and many families come from Cologne, Sankt Augustin, Königswinter and the wider area. The location is easy to reach and parents generally find the commute straightforward."
      ),
    },
    {
      q: t("Was passiert, wenn mein Kind eine Stunde verpasst?", "What happens if my child misses a session?"),
      a: t(
        "Kein Problem. Da wir in projektbasierten Modulen arbeiten, können verpasste Inhalte in der Folgestunde aufgegriffen werden. Sprechen Sie uns bei längerer Abwesenheit gerne an – wir finden gemeinsam eine passende Lösung.",
        "No problem. Because we work in project-based modules, missed content can be picked up in the following session. If your child is away for longer, just let us know — we'll find a good solution together."
      ),
    },
  ];

  // FAQPage JSON-LD always in German for crawlers (matches site default locale).
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding bg-tint-sky">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Häufige Fragen", "Frequently Asked Questions")}
        </h2>
        <Accordion type="single" collapsible className="mt-5">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
};

export default FAQSection;
