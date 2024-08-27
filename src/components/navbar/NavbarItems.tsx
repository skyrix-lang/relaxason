import { Center, Menu } from "@mantine/core";
import { FunctionComponent } from "react";
import { ILink } from "./Navbar.tsx";
import classes from "../../styles/Navbar.module.css";
import { IconChevronDown } from "@tabler/icons-react";

interface NavbarButtonProps {
  links: ILink[];
}

const NavbarItems: FunctionComponent<NavbarButtonProps> = ({ links }) => {
  return links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
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
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });
};

export default NavbarItems;
