import { useLang } from "@/contexts/LanguageContext";
import { ImageIcon, MessageSquareQuote } from "lucide-react";

const SocialProof = () => {
  const { t } = useLang();

  return (
    <section className="section-padding bg-section-tint">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Projekte & Eindrücke", "Projects & Impressions")}
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Photo placeholder */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
            <ImageIcon size={40} className="text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Fotos & Projektbilder folgen", "Photos & project images coming soon")}
            </p>
          </div>

          {/* Testimonial placeholder */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
            <MessageSquareQuote size={40} className="text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Elternstimmen folgen", "Parent testimonials coming soon")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
