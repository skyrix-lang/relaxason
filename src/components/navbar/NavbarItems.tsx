import { Center, Menu } from "@mantine/core";
import { FunctionComponent } from "react";
import { ILink } from "./Navbar.tsx";
import classes from "../../styles/Navbar.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface INavbarButtonProps {
  links: ILink[];
}

const NavbarItems: FunctionComponent<INavbarButtonProps> = ({ links }) => {
  return links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link
        key={item.link}
        to={item.link.includes("http") ? item.link : link.link + item.link}
        style={{ textDecoration: "none" }}
      >
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.link} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });
};

export default NavbarItems;
