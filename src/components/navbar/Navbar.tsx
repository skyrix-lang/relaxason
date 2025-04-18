import { FunctionComponent } from "react";
import { Burger, Container, Drawer, Group, Image, Stack } from "@mantine/core";
import logo from "../../assets/logo_relaxason.png";
import { useDisclosure } from "@mantine/hooks";
import NavbarItems from "./NavbarItems.tsx";
import classes from "../../styles/Navbar.module.css";

export interface ILink {
  link: string;
  label: string;
  links?: ILink[];
}

interface INavbarProps {}

const Navbar: FunctionComponent<INavbarProps> = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const links: ILink[] = [
    { link: "/", label: "Accueil" },
    { link: "/mon-parcours", label: "Mon parcours" },
    { link: "/sonotherapie", label: "La sonothérapie, c'est quoi ?" },
    // {
    //   link: "/soins",
    //   label: "Soins proposés",
    //   links: [
    //     { link: "/massage-sonore", label: "Massage sonore" },
    //     { link: "/voyage-sonore-collectif", label: "Voyage sonore collectif" },
    //     {
    //       link: "/atelier-expansion-conscience",
    //       label: "Atelier d'expansion de conscience",
    //     },
    //     { link: "/drainage", label: "Drainage de bien-être" },
    //     { link: "/massage-suedois", label: "Massage suédois" },
    //     { link: "/tarifs", label: "Tarifs" },
    //   ],
    // },
    // { link: "/temoignages", label: "Témoignagnes" },
    {
      link: "/liens",
      label: "Liens et partenariats",
      links: [
        { link: "https://pontdostara.fr/", label: "Le Pont d'Ostara" },
        { link: "https://www.zen-and-sounds.com/", label: "Zen and Sounds" },
        {
          link: "https://ecole-sonotherapie.ch/",
          label: "Ecole Internationale de Sonothérapie",
        },
      ],
    },
    { link: "/contact", label: "Me contacter" },
    // { link: "/plan", label: "Plan d'accès" },
  ];

  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <a href="/" className={classes.logoContainer}>
            <Image h={55} src={logo} alt="Relaxason logo" />
          </a>

          {/* Desktop menu - visible from small breakpoint and up */}
          <Group gap={5} visibleFrom="sm">
            <NavbarItems links={links} />
          </Group>

          {/* Mobile burger button - hidden from small breakpoint and up */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            color="#1A9E8E" /* brand[7] color */
          />

          {/* Mobile drawer that appears when burger is clicked */}
          <Drawer
            opened={opened}
            onClose={close}
            title="Menu"
            padding="xl"
            size="xs"
            position="right"
            withCloseButton
            classNames={{ body: classes.drawer }}
            styles={{
              header: {
                backgroundColor: "#F5FFFA" /* mintcream background */,
                borderBottom: "1px solid #E6F9F7" /* brand[0] color */,
              },
              close: {
                color: "#1A9E8E" /* brand[7] color */,
                "&:hover": {
                  backgroundColor: "#E6F9F7" /* brand[0] color */,
                },
              },
            }}
          >
            <Stack>
              {/* Mobile version of NavbarItems */}
              <MobileNavbarItems
                links={links}
                onItemClick={close}
                currentPath={location.pathname}
              />
            </Stack>
          </Drawer>
        </div>
      </Container>
    </header>
  );
};

// Create a mobile-friendly version of NavbarItems
const MobileNavbarItems: FunctionComponent<{
  links: ILink[];
  onItemClick: () => void;
  currentPath: string;
}> = ({ links, onItemClick, currentPath }) => {
  const items = links.map((link: ILink) => {
    const isActive =
      currentPath === link.link ||
      (link.link !== "/" && currentPath.startsWith(link.link));

    if (link.links) {
      // For items with dropdown
      const nestedItems = link.links.map((nestedLink: ILink) => {
        const isNestedActive =
          currentPath === nestedLink.link ||
          (nestedLink.link !== "/" && currentPath.startsWith(nestedLink.link));

        return (
          <a
            key={nestedLink.label}
            href={nestedLink.link}
            className={`${classes.mobileNestedLink} ${isNestedActive ? classes.linkActive : ""}`}
            onClick={onItemClick}
          >
            → {nestedLink.label}
          </a>
        );
      });

      return (
        <div key={link.label}>
          <div
            className={`${classes.mobileMainLink} ${isActive ? classes.linkActive : ""}`}
          >
            {link.label}
          </div>
          <Stack ml="md" gap="xs">
            {nestedItems}
          </Stack>
        </div>
      );
    }

    // For regular links
    return (
      <a
        key={link.label}
        href={link.link}
        className={`${classes.mobileLink} ${isActive ? classes.linkActive : ""}`}
        onClick={onItemClick}
      >
        {link.label}
      </a>
    );
  });

  return <>{items}</>;
};

export default Navbar;
