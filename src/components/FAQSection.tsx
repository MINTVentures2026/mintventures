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
      q: t("Braucht mein Kind Vorkenntnisse?", "Do kids need prior experience?"),
      a: t(
        "Nein. Wir starten so, dass Kinder schnell ins Tun kommen.",
        "No. We start in a way that gets kids doing things right away."
      ),
    },
    {
      q: t("Welche Tools nutzt ihr?", "What tools do you use?"),
      a: t(
        "Blockbasiertes Programmieren (ähnlich Scratch) + Robotik-Bausteine/Sensoren.",
        "Block-based coding (Scratch-like) + robotics kits/sensors."
      ),
    },
    {
      q: t("Kann mein Kind später auch Python lernen?", "Can they learn Python later?"),
      a: t(
        "Langfristig ja – zuerst bauen wir ein stabiles Fundament mit Logik, Struktur und Debugging.",
        "Yes, after building strong fundamentals."
      ),
    },
    {
      q: t("Wie melde ich mich an?", "How to join?"),
      a: t(
        "Einfach über das Formular – ich melde mich mit einem passenden Termin zurück.",
        "Send a request via the form — I'll get back to you with a suitable time."
      ),
    },
  ];

  return (
    <section id="faq" className="section-padding bg-secondary/50">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">FAQ</h2>
        <Accordion type="single" collapsible className="mt-8">
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
