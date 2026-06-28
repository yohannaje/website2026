import { Envelope, InstagramLogo } from "@phosphor-icons/react";

export type Tab = "illustration" | "shop" | "about";

interface Props {
  active: Tab;
  onSelect: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "illustration", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "about", label: "About" },
];

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-top">
          <div
            className="sidebar-logo"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/yhnn/Frame%2041.jpg')",
            }}
          />

          <img src="/logo.png" alt="YHNN" className="sidebar-brand-img" />

          <p className="sidebar-bio">
            Visual artist & designer chasing movement and shape. Fueled by
            🇦🇷 mate, bouldering, soaking up the sun and two cats who
            definitely run the studio.
          </p>

          <nav className="sidebar-nav">
            {TABS.map((t) => (
              <a
                key={t.id}
                href="#"
                className={`sidebar-link ${active === t.id ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(t.id);
                }}
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <a
            href="https://instagram.com/y.h.n.n"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-icon"
            title="@y.h.n.n"
          >
            <InstagramLogo size={16} weight="light" />
          </a>
          <a
            href="mailto:yohanna.j.e@gmail.com"
            className="sidebar-icon"
            title="Contact"
          >
            <Envelope size={16} weight="light" />
          </a>
        </div>
      </div>
    </aside>
  );
}
