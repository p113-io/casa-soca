import { useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { SwipeableDrawer, SvgIcon } from "@mui/material";

import {
  Sheet,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemContent,
  Box,
} from "@mui/joy";

import { Menu as MenuIcon, KeyboardArrowRight } from "@mui/icons-material";

import { ModeSwitcher } from "../Theme";
import Logo from "../assets/logo.svg?react";
// css
const css = {
  main: {
    backgroundColor: "transparent",
  },
  logo: {
    fontSize: 140,
  },
  drawer: {
    width: "100vw",
    height: "100vh",
  },
  switchMode: {
    cursor: "pointer",
    width: "auto",
    backgroundColor: "transparent",
    borderColor: "unset",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "unset",
    },
    "&:focus": {
      backgroundColor: "transparent",
      borderColor: "unset",
      outline: "none !important",
    },
  },
};

////////////////////
// Menulist component
// Require:
//   menu: an array
//   toggleDrawer: a function
//   navigate: a function
// Render:
//   MenuList component with menu items
//   ModeSwitcher component for switching between light and dark
//   Logo component for logo
//   Menu component for menu
//   Footer component for footer
////////////////////

const MenuList = ({ menu, toggleDrawer }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    toggleDrawer(false);
    navigate(path);
  };

  return (
    <Box
      sx={css.drawer}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem key={"logo"}>
          <ListItemButton onClick={() => handleClick("/")}>
            <SvgIcon
              sx={css.logo}
              color="primary"
              component={Logo}
              inheritViewBox
            />
          </ListItemButton>
        </ListItem>
        {menu?.length > 0 &&
          menu.map((m, i) => (
            <ListItem key={"m" + i}>
              <ListItemButton onClick={() => handleClick(m.path)}>
                <ListItemContent>{m.title}</ListItemContent>
                <KeyboardArrowRight />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <ModeSwitcher sx={{ width: "100%" }} />
    </Box>
  );
};

// propTypes for MenuList
MenuList.propTypes = {
  menu: propTypes.array,
  toggleDrawer: propTypes.func,
};

////////////////////
// Menu component
// Require:
//   menu: an array of menu items
// Render:
//   Menu component with menu items
////////////////////

const Menu = ({ menu }) => {
  const [open, setOpen] = useState(false);
  const anchor = "left";

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Sheet sx={css.main}>
      <IconButton size="40" variant="soft" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <MenuList menu={menu} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </Sheet>
  );
};
//
// propTypes for Menu
Menu.propTypes = {
  menu: propTypes.array.isRequired,
};

export default Menu;
