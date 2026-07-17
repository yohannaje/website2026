export type Tab = "work" | "shop" | "about";

interface Props {
  active: Tab;
  onSelect: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "shop", label: "Shop" },
  { id: "about", label: "Bio" },
];

export default function Topbar({ active, onSelect }: Props) {
  return (
    <header className="topbar">
      <a
        href="#"
        className="topbar-brand"
        onClick={(e) => {
          e.preventDefault();
          onSelect("work");
        }}
      >
        <img src="/logo.png" alt="YHNN" className="topbar-brand-img" />
      </a>

      <nav className="topbar-nav">
        {TABS.map((t) => (
          <a
            key={t.id}
            href="#"
            className={`topbar-link ${active === t.id ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(t.id);
            }}
          >
            {t.label}
          </a>
        ))}
      </nav>

      <div className="topbar-meta">
        <a
          href="https://instagram.com/y.h.n.n"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-link"
          title="@y.h.n.n"
        >
          IG
        </a>
        <a href="mailto:yohanna.j.e@gmail.com" className="topbar-link">
          Contact
        </a>
      </div>
    </header>
  );
}
