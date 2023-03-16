import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import SellProperty from "./pages/SellProperty";
import NavMenu from './components/NavMenu'
import PrivateRoute from "./components/utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <Router>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path='/sell-property' element={<PrivateRoute />}>
            <Route path="/sell-property" element={<SellProperty />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property-detail/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
