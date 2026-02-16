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
      q: t("Braucht mein Kind Vorkenntnisse?", "Does my child need prior experience?"),
      a: t("Nein – wir starten so, dass jedes Kind schnell ins Tun kommt.", "No — we start in a way that every child gets going quickly."),
    },
    {
      q: t("Welche Materialien nutzt ihr?", "What materials do you use?"),
      a: t("LEGO® Education SPIKE™ Prime (Motoren, Sensoren, intelligenter Hub), Scratch-Blöcke + später Python.", "LEGO® Education SPIKE™ Prime (motors, sensors, smart hub), Scratch blocks + later Python."),
    },
    {
      q: t("Kann mein Kind später Python / fortgeschrittene Programmierung lernen?", "Can my child learn Python / advanced programming later?"),
      a: t("Ja – wir bauen zuerst starke Grundlagen (Logik, Struktur, Debugging), dann folgt Python natürlich.", "Yes — we first build strong fundamentals (logic, structure, debugging), then Python follows naturally."),
    },
    {
      q: t("Wie melde ich mich an?", "How do I sign up?"),
      a: t(
        "Ganz einfach per E-Mail. Schreiben Sie uns kurz an info@mintventures.de – gerne mit dem Alter Ihres Kindes, eventueller Vorerfahrung und Ihrer zeitlichen Verfügbarkeit. Wir melden uns persönlich mit passenden Vorschlägen zurück.",
        "Simply by email. Write to us at info@mintventures.de — ideally with your child's age, any prior experience, and your availability. We'll get back to you personally with suitable suggestions."
      ),
    },
    {
      q: t("Für wen sind die Kurse geeignet? Nur für Familien in Bonn?", "For whom are the courses suitable? Only for families in Bonn?"),
      a: t(
        "Unsere Kurse finden vor Ort in Bonn statt. Viele Familien kommen auch aus Köln, Sankt Augustin und der Umgebung. Der Standort ist gut erreichbar, und Eltern empfinden den Weg in der Regel als unkompliziert.",
        "Our courses take place on site in Bonn. Many families also join us from Cologne, Sankt Augustin, and the surrounding area. The location is easy to reach, and parents generally find the commute straightforward."
      ),
    },
  ];

  return (
    <section id="faq" className="section-padding bg-tint-purple">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Häufige Fragen", "Frequently Asked Questions")}
        </h2>
        <Accordion type="single" collapsible className="mt-5">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary transition-colors">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
