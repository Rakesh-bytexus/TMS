import React, { Suspense, useState } from "react";
import { Login, ForgetPassword } from "./components/login";
import { Redirect, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginContext, PrivateRoute } from "./components/private-routes";
import { DashboardPage } from "./components/dashboard-page";
import NavigationBar from "./components/navigation-bar";
import BuildLoadForm from "./components/build-load";

interface AppProps {
  tabActive?: number;
}
function App({ tabActive }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(Cookies.get("isLoggedIn") || "false")
  );
  const setLogin = (data: boolean) => {
    const status = data.toString();
    Cookies.set("loggedIn", status);
    setIsLoggedIn(data);
  };
  return (
    <>
      <Suspense fallback="Loading...">
        <LoginContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            loading,
            setLoading,
          }}
        >
          <NavigationBar />
          <Switch>
            <PrivateRoute
              exact={true}
              path="/dashboard"
              component={DashboardPage}
            />
            <Route exact={true} path="/">
              {isLoggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <Login loginStatus={setLogin} />
              )}
            </Route>
            <Route path="/forgetpassword">
              <ForgetPassword />
            </Route>
            <Route path="/build-load">
              <BuildLoadForm tabActive={tabActive} />
            </Route>
          </Switch>
        </LoginContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
