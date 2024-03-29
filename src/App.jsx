import React from "react";

import classes from "./App.module.scss";

import { routersPath } from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { publicRouter, privateRouter } from "./router/router";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <div className={classes.App}>
      <Router>
        {!isAuth ? (
          <Routes>
            {publicRouter.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
            <Route path="*" element={<Navigate to={routersPath.LOGIN} />} />
          </Routes>
        ) : (
          <Routes>
            {privateRouter.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
            <Route path="*" element={<Navigate to={routersPath.HOME} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
