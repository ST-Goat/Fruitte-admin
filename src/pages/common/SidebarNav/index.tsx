import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link, useLocation } from "react-router-dom";
import { LogoHeader } from "../../../layouts/NavBar";

import { menuItems } from "shared/menu.item";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({
  NavBar,
  children,
}: {
  NavBar: any;
  children: any;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <NavBar sideBarExpend={open} handleExpendSideBar={handleDrawerOpen} />
      </AppBar>
      <Drawer
        sx={{ "& .MuiDrawer-paper": { boxShadow: 8 } }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <div className="flex flex-grow justify-center">
            {open && <LogoHeader />}
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menu) => {
            return (
              <Link to={menu.to} key={menu.key}>
                <ListItem
                  sx={{
                    background:
                      location.pathname === menu.to ? "#483729" : "#ffffff",
                    color:
                      location.pathname === menu.to ? "#ffffff" : "#483729",
                    "&:hover": {
                      backgroundColor:
                        location.pathname === menu.to
                          ? "#483729"
                          : "transparent",
                      color:
                        location.pathname === menu.to ? "#ffffff" : "#483729",
                    },
                  }}
                  button
                >
                  {!open && (
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === menu.to ? "#ffffff" : "#483729",
                        "&:hover": {
                          opacity: 0.6,
                        },
                      }}
                    >
                      {menu.icon ? <menu.icon /> : ""}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    sx={{
                      "&:hover": {
                        opacity: 0.6,
                      },
                    }}
                  >
                    {t(menu.label)}
                  </ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
