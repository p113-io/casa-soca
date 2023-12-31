import propTypes from "prop-types";

import {
  Sheet
} from '@mui/joy';
import { css } from './css';

import loadable from '@loadable/component';
///////////////////
// Header component
// Require:
//   toggleDrawer: a function
// Render:
//   children: a node
////////////////

const Header = loadable(() => import('./header'));

///////////////////
// Footer component
// Require:
//   toggleDrawer: a function
// Render:
//   children: a node
////////////////

const Footer = loadable(() => import('./footer'));

// css
const csdds = {
  "main": {
    width: '98vw',
   
  }
};

///////////////////
// Layout component
// Require:
//   children: a node
// Render:
//   children: a node 
////////////////

const Layout = ({children}) => {
  const variant="soft";
  const color="primary";
  return (
    <Sheet
      variant={variant}
      color={color}
      sx={css.layout}
    >
      <Header />
      {children}
      <Footer />

    </Sheet>

  )
};
// propTypes for Layout 
propTypes.Layout = {
  children: propTypes.node.isRequired
};

export default Layout;
