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
      a: t(
        "Nein – wir starten so, dass jedes Kind schnell ins Tun kommt.",
        "No — we start in a way that every child gets going quickly."
      ),
    },
    {
      q: t("Welche Materialien nutzt ihr?", "What materials do you use?"),
      a: t(
        "LEGO® Education SPIKE™ Prime (Motoren, Sensoren, intelligenter Hub), Scratch-Blöcke + später Python.",
        "LEGO® Education SPIKE™ Prime (motors, sensors, smart hub), Scratch blocks + later Python."
      ),
    },
    {
      q: t("Kann mein Kind später Python / fortgeschrittene Programmierung lernen?", "Can my child learn Python / advanced programming later?"),
      a: t(
        "Ja – wir bauen zuerst starke Grundlagen (Logik, Struktur, Debugging), dann folgt Python natürlich.",
        "Yes — we first build strong fundamentals (logic, structure, debugging), then Python follows naturally."
      ),
    },
    {
      q: t("Wie melde ich mich an?", "How do I sign up?"),
      a: t(
        "Einfach über das Formular unten – teilt mir Alter, Vorerfahrung & Wohnort mit, ich schlage passende Termine vor.",
        "Simply use the form below — share age, prior experience & location, and I'll suggest suitable dates."
      ),
    },
  ];

  return (
    <section id="faq" className="section-padding bg-section-warm">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">{t("Häufige Fragen", "Frequently Asked Questions")}</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
