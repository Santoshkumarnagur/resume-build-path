import { NavLink } from "react-router-dom";
import { FileText, Eye, Award } from "lucide-react";

const links = [
  { to: "/builder", label: "Builder", icon: FileText },
  { to: "/preview", label: "Preview", icon: Eye },
  { to: "/proof", label: "Proof", icon: Award },
];

const NavBar = () => (
  <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
    <NavLink to="/" className="font-mono text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors">
      AI Resume Builder
    </NavLink>
    <nav className="flex items-center gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-medium transition-colors ${
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`
          }
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </NavLink>
      ))}
    </nav>
    <span className="font-mono text-xs text-muted-foreground">Project 3</span>
  </header>
);

export default NavBar;
