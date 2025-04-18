import { Center, Menu } from "@mantine/core";
import { FunctionComponent } from "react";
import { ILink } from "./Navbar.tsx";
import classes from "../../styles/Navbar.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

interface INavbarButtonProps {
  links: ILink[];
}

const NavbarItems: FunctionComponent<INavbarButtonProps> = ({ links }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLinkClick = (e: any, linkPath: string) => {
    // If linking to a hash on the current page
    if (linkPath.includes("#") && linkPath.split("#")[0] === currentPath) {
      e.preventDefault();
      window.location.hash = linkPath.split("#")[1];
    }
  };

  const isLinkActive = (link: string) => {
    // Check if this is the current active path
    if (link === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(link);
  };

  return links.map((link) => {
    const isActive = isLinkActive(link.link);

    const menuItems = link.links?.map((item) => {
      const itemPath = item.link.includes("http") ? item.link : item.link;
      const isItemActive = isLinkActive(itemPath);

      return (
        <Link
          key={item.link}
          to={itemPath}
          style={{ textDecoration: "none" }}
          target={item.link.includes("http") ? "_blank" : undefined}
          rel={item.link.includes("http") ? "noopener noreferrer" : undefined}
        >
          <Menu.Item
            key={item.link}
            className={isItemActive ? classes.menuItemActive : ""}
          >
            {item.label}
          </Menu.Item>
        </Link>
      );
    });

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          position="bottom"
          offset={4}
          styles={{
            dropdown: {
              backgroundColor: "#F8FDFC", // secondaryBackground
              border: "1px solid #E6F9F7", // brand[0] color
              boxShadow: "0 2px 10px rgba(0, 105, 92, 0.1)",
              borderRadius: "var(--mantine-radius-sm)",
            },
            item: {
              color: "#1A9E8E", // brand[7] color
              "&:hover": {
                backgroundColor: "#E6F9F7", // brand[0] color
                color: "#3DCFBC", // brand[5] color
              },
            },
          }}
        >
          <Menu.Target>
            <a
              href={link.link}
              className={`${classes.link} ${isActive ? classes.linkActive : ""}`}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown
                  size="0.9rem"
                  stroke={1.5}
                  style={{
                    transition: "transform 0.3s ease",
                    marginLeft: "4px",
                  }}
                  className={classes.chevron}
                />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.link}
        to={link.link}
        className={`${classes.link} ${isActive ? classes.linkActive : ""}`}
        onClick={(e) => handleLinkClick(e, link.link)}
      >
        {link.label}
      </Link>
    );
  });
};

export default NavbarItems;
