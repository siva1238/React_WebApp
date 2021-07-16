import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/User/Home";
import Login from "./pages/Login";
import AllUsers from "./components/User/All-Users";
import Products from "./components/Product/Product-List";
import Product from "./components/Product/Add-Product";
import TodoList from "./components/ToDo-List/TodoList";
import HocInfo from "./components/HOC/HocInfo";
import Features from "./components/ES6/ES-Features";
import User from "./pages/Signup";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/home" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={AllUsers} />
        <Route path="/user/" component={User} />
        <Route path="/products" component={Products} />
        <Route path="/product" component={Product} />
        <Route path="/todo" component={TodoList} />
        <Route path="/hoc" component={HocInfo} />
        <Route path="/features" component={Features} />
      </Switch>
    </Router>
  );
}

export default App;
