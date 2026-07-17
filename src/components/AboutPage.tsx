const BIO = [
  {
    lang: "ES",
    paragraphs: [
      "Este es mi jardín digital: un espacio para compartir quién soy y algunas de las cosas que hago.",
      "Artista visual y diseñadora. A base de mate, boulder, sol y dos gatos que sin duda manejan el estudio.",
    ],
  },
  {
    lang: "EN",
    paragraphs: [
      "This is my digital garden: a space to share who I am and some of the things I do.",
      "Visual artist and designer. Fueled by mate, bouldering, soaking up the sun, and two cats who definitely run the studio.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="about-split">
      <div className="about-photo">
        <span className="about-photo-note">Foto</span>
      </div>

      <div className="about-bio">
        {BIO.map(({ lang, paragraphs }) => (
          <section key={lang} className="about-bio-block">
            <h2 className="about-bio-lang">{lang}</h2>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
