import { useState } from "react";

type Lang = "ES" | "EN";

const EMAIL = "yohanna.j.e@gmail.com";

const BIO: { lang: Lang; paragraphs: string[] }[] = [
  {
    lang: "ES",
    paragraphs: [
      "Hola! Mi nombre es Yohanna. Nací en Argentina y actualmente disfruto de mi estudio en Córdoba, España.",
      "En mi trabajo exploro la relación entre forma, color y naturaleza a través de composiciones que habitan el límite entre la representación y la abstracción. Encuentro inspiración en los paisajes abiertos, los elementos orgánicos y la observación de lo cotidiano. Busco crear imágenes que transmitan calma, libertad y una sensación de refugio.",
      "En los últimos años, mi interés se ha expandido más allá de la imagen, explorando cómo estos mismos principios pueden trasladarse a los objetos y cómo estos pueden evocar emociones y experiencias similares.",
      "Todo esto a base de mate, boulder, sol y dos gatos que, sin duda, manejan el estudio :-)",
      "Si te interesa conversar sobre algún proyecto, colaborar o simplemente charlar, no dudes en contactarme.",
    ],
  },
  {
    lang: "EN",
    paragraphs: [
      "Hi! My name is Yohanna. I was born in Argentina and currently work from my studio in Córdoba, Spain.",
      "Through my work, I explore the relationship between form, color, and nature through compositions that exist somewhere between representation and abstraction. I find inspiration in open landscapes, organic elements, and the observation of everyday life. My goal is to create images that evoke a sense of calm, freedom, and refuge.",
      "In recent years, my interest has expanded beyond image-making, exploring how these same principles can be translated into objects, and how they can carry the same emotions and experiences into physical spaces.",
      "All of this is fueled by mate, bouldering, sunshine, and two cats who undoubtedly run the studio :-)",
      "If you'd like to discuss a project, collaborate, or simply say hello, I'd love to hear from you.",
    ],
  },
];

export default function AboutPage() {
  const [active, setActive] = useState<Lang>("ES");

  return (
    <div className="about-split">
      <div className="about-photo">
        <span className="about-photo-note">Foto</span>
      </div>

      <div className="about-bio">
        <div className="about-bio-langs">
          {BIO.map(({ lang }, i) => (
            <span key={lang}>
              {i > 0 && <span className="about-bio-sep">/</span>}
              <button
                type="button"
                className={`about-bio-lang ${lang === active ? "is-active" : ""}`}
                aria-pressed={lang === active}
                onClick={() => setActive(lang)}
              >
                {lang}
              </button>
            </span>
          ))}
        </div>

        {BIO.find((b) => b.lang === active)!.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <a className="about-bio-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
