import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@relaxason/core";
import logo from "../assets/logo-relaxason.png";

type PageLink = {
  label: string;
  to: "/" | "/mon-parcours" | "/sonotherapie" | "/soins" | "/contact";
  hash?: string;
};
type ExternalLink = { label: string; href: string };
type MenuGroup = {
  label: string;
  /** The section of the site the menu belongs to, for the active state. */
  section?: PageLink["to"];
  items: (PageLink | ExternalLink)[];
};
type NavItem = PageLink | MenuGroup;

export const navItems: NavItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Mon parcours", to: "/mon-parcours" },
  { label: "La sonothérapie, c'est quoi ?", to: "/sonotherapie" },
  {
    label: "Soins proposés",
    section: "/soins",
    items: [
      { label: "Massage sonore", to: "/soins", hash: "massage" },
      { label: "Voyage sonore collectif", to: "/soins", hash: "voyage" },
      {
        label: "Séminaire de reconnexion au corps et aux émotions",
        to: "/soins",
        hash: "seminaire",
      },
      { label: "Drainage manuel de bien-être", to: "/soins", hash: "drainage" },
      { label: "Massage suédois", to: "/soins", hash: "suedois" },
      { label: "Tarifs", to: "/soins", hash: "tarifs" },
    ],
  },
  {
    label: "Liens et partenariats",
    items: [{ label: "Le Pont d'Ostara", href: "https://pontdostara.fr/" }],
  },
  { label: "Me contacter", to: "/contact" },
];

const isGroup = (item: NavItem): item is MenuGroup => "items" in item;
const isExternal = (item: PageLink | ExternalLink): item is ExternalLink =>
  "href" in item;

function isActive(pathname: string, to: string | undefined) {
  if (!to) return false;
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function MenuEntry({
  item,
  className,
  onNavigate,
  prefix,
}: {
  item: PageLink | ExternalLink;
  className: string;
  onNavigate?: () => void;
  prefix?: string;
}) {
  if (isExternal(item)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {prefix}
        {item.label}
      </a>
    );
  }
  return (
    <Link
      to={item.to}
      hash={item.hash}
      className={className}
      onClick={onNavigate}
    >
      {prefix}
      {item.label}
    </Link>
  );
}

/** A desktop menu: opens on hover, on focus and on click; Escape closes it. */
function DesktopMenu({ group, active }: { group: MenuGroup; active: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- hovering opens the menu as a convenience; the button inside is the control
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        data-active={active}
        className="nav-link flex cursor-pointer items-center"
        onClick={() => setOpen(true)}
      >
        <span className="mr-[5px]">{group.label}</span>
        <ChevronDown
          aria-hidden="true"
          size={14}
          strokeWidth={1.5}
          className={`ml-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 z-10 -translate-x-1/2 pt-1"
      >
        <ul className="min-w-max rounded-sm border border-brand-50 bg-surface p-1 shadow-[0_2px_10px_rgb(0_105_92/0.1)]">
          {group.items.map((item) => (
            <li key={item.label}>
              <MenuEntry
                item={item}
                className={`nav-menu-item ${active ? "bg-brand-50 font-medium text-brand-800" : ""}`}
                onNavigate={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mobileLink =
  "block border-b border-brand-50 py-3.5 font-medium text-brand-700 transition-colors hover:text-brand-600";

/** The mobile menu: a native modal dialog, so focus stays inside it. */
function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- a click on the backdrop closes it; Escape already does
    <dialog
      ref={dialog}
      aria-label="Menu"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(20rem,100vw)] max-w-none bg-background p-0 shadow-md backdrop:bg-black/60"
    >
      <div className="flex items-center justify-between border-b border-brand-50 px-12 py-6">
        <p className="text-base text-foreground">Menu</p>
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={onClose}
          className="cursor-pointer rounded-sm p-1 text-brand-700 hover:bg-brand-50"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      <nav aria-label="Principale" className="flex flex-col gap-6 p-12">
        {navItems.map((item) => {
          if (!isGroup(item)) {
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                data-active={isActive(pathname, item.to)}
                className={`${mobileLink} data-[active=true]:font-semibold data-[active=true]:text-brand-800`}
              >
                {item.label}
              </Link>
            );
          }
          return (
            <div key={item.label}>
              <p
                className={`border-b border-brand-50 py-3.5 font-semibold text-brand-800`}
              >
                {item.label}
              </p>
              <ul className="ml-6 flex flex-col gap-3">
                {item.items.map((entry) => (
                  <li key={entry.label}>
                    <MenuEntry
                      item={entry}
                      prefix="→ "
                      onNavigate={onClose}
                      className="block py-2.5 pl-4 text-sm text-brand-700 transition-all hover:translate-x-1 hover:text-brand-600"
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </dialog>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Desktop and mobile navigation are switched with CSS breakpoints, never by
  // reading the screen size in render.
  return (
    <header className="fixed inset-x-0 top-0 z-[100] h-[70px] border-b border-brand-50 bg-background shadow-[0_2px_10px_rgb(0_105_92/0.05)]">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          <img
            src={logo}
            alt=""
            width={55}
            height={55}
            className="block h-[35px] w-auto xs:h-10 sm:h-[55px]"
          />
          <span className="mt-1 font-display text-xl leading-none font-semibold tracking-[0.5px] text-brand-700">
            {site.name}
          </span>
        </Link>

        <nav
          aria-label="Principale"
          className="hidden items-center gap-[5px] lg:flex"
        >
          {navItems.map((item) =>
            isGroup(item) ? (
              <DesktopMenu
                key={item.label}
                group={item}
                active={isActive(pathname, item.section)}
              />
            ) : (
              <Link
                key={item.label}
                to={item.to}
                data-active={isActive(pathname, item.to)}
                className="nav-link"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-haspopup="dialog"
          className="cursor-pointer rounded-sm p-2 text-brand-700 hover:bg-brand-50 lg:hidden"
        >
          <Menu aria-hidden="true" size={22} />
        </button>
      </div>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}
