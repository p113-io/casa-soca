import React, {useState} from 'react';
import './App.css';
import 'unfonts.css';

import loadable from '@loadable/component';
import {
  BrowserRouter as Router,
} from "react-router-dom";

///////////////
// Theme
////////////
const Theme = loadable(() => import('./Theme'));

///////////////
// Routes
////////////
const Routes = loadable(() => import('./Routes'));

//////////////
// Layout
///////////

const Layout = loadable(() => import('./layout/layout'));

//////////////
// App
///////////

const  App = () => {
  return (
      <Theme>
          <Router>
            <Layout  >
              <Routes />
            </Layout>
          </Router>
      </Theme>
  );
}

export default App;