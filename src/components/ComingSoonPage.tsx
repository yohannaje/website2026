interface Props {
  label: string;
  sub?: string;
}

export default function ComingSoonPage({ label, sub }: Props) {
  return (
    <section className="shop-page">
      <div className="shop-inner">
        <p className="shop-eyebrow">{label}</p>
        <h2 className="shop-title">Coming soon</h2>
        {sub && <p className="shop-sub">{sub}</p>}
        <a href="mailto:yohanna.j.e@gmail.com" className="shop-link">
          yohanna.j.e@gmail.com →
        </a>
      </div>
    </section>
  );
}
