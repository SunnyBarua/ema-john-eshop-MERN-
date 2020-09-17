import React, { createContext } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from "./Components/Shop/Shop";
import Review from "./Components/Review/Review";
import Inventory from "./Components/Inventory/Inventory";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Login from "./Components/Login/Login";
import { AuthContextProvider, PrivateRoute } from "./Components/Login/useAuth";
import Shipment from "./Components/Shipment/Shipment";
export const UserContext = createContext();
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
