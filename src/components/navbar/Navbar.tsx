import { FunctionComponent } from "react";
import { Group, Burger, Container, Image } from "@mantine/core";
import logo from "../../assets/free-logo.jpg";
import { useDisclosure } from "@mantine/hooks";
import NavbarItems from "./NavbarItems.tsx";
import classes from "../../styles/Navbar.module.css";

export interface ILink {
  link: string;
  label: string;
  links?: ILink[];
}

interface INavbarProps {}

const Navbar: FunctionComponent<INavbarProps> = ({}) => {
  const [opened, { toggle }] = useDisclosure(false);

  const links: ILink[] = [
    { link: "/", label: "Accueil" },
    { link: "/about#me", label: "Mon parcours" },
    { link: "/about#sonotherapie", label: "La sonothérapie, c'est quoi ?" },
    {
      link: "/soins",
      label: "Soins proposés",
      links: [
        { link: "/massage-sonore", label: "Massage sonore" },
        { link: "/voyage-sonore-collectif", label: "Voyage sonore collectif" },
        {
          link: "/atelier-expansion-conscience",
          label: "Atelier d'expansion de conscience",
        },
        { link: "/drainage", label: "Drainage de bien-être" },
        { link: "/massage-suedois", label: "Massage suédois" },
        { link: "/tarifs", label: "Tarifs" },
      ],
    },
    { link: "/temoignages", label: "Témoignagnes" },
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
    { link: "/plan", label: "Plan d'accès" },
  ];

  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <Image h={50} src={logo} />
          <Group gap={5} visibleFrom="sm">
            <NavbarItems links={links} />
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
