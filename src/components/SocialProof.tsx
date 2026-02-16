import { useLang } from "@/contexts/LanguageContext";
import { ImageIcon, MessageSquareQuote } from "lucide-react";

const SocialProof = () => {
  const { t } = useLang();

  return (
    <section className="section-padding bg-gradient-to-b from-background to-soft-purple/4">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Projekte & Eindrücke", "Projects & Impressions")}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/15 bg-card/50 p-10 text-center">
            <ImageIcon size={36} className="text-primary/25" />
            <p className="mt-2.5 text-sm text-muted-foreground">
              {t("Fotos & Projektbilder folgen", "Photos & project images coming soon")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soft-purple/15 bg-card/50 p-10 text-center">
            <MessageSquareQuote size={36} className="text-soft-purple/25" />
            <p className="mt-2.5 text-sm text-muted-foreground">
              {t("Elternstimmen folgen", "Parent testimonials coming soon")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
