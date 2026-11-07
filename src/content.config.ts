import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { achievement, event, faq, organization, person, product, run } from "@/content/schemas";

// One YAML file per entry; the file name is the entry id (and the URL slug where there is one).
const yaml = (dir: string) => glob({ pattern: "*.yaml", base: `./src/content/${dir}` });

export const collections = {
  products: defineCollection({ loader: yaml("products"), schema: product }),
  runs: defineCollection({ loader: yaml("runs"), schema: run }),
  events: defineCollection({ loader: yaml("events"), schema: event }),
  people: defineCollection({ loader: yaml("people"), schema: person }),
  organizations: defineCollection({ loader: yaml("organizations"), schema: organization }),
  achievements: defineCollection({ loader: yaml("achievements"), schema: achievement }),
  faqs: defineCollection({ loader: yaml("faqs"), schema: faq }),
};
