import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaUserCircle, FaCity } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

function NavMenu() {
  const [show, setShow] = useState(false);

  const eliteUser = JSON.parse(localStorage.getItem("eliteuser"));

  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (eliteUser && eliteUser.name !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [eliteUser]);

  const location = useLocation();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onLogout = () => {
    localStorage.removeItem("eliteuser");
    dispatch(reset());
    window.location.reload();
    toast.success("You are logged out");
  };
  return (
    <>
      <Navbar expand="lg" id="nav">
        <Container>
          <Navbar.Brand href="/">
            <h2>
              <MdOutlineHomeWork /> <span>Elite Homes</span>
            </h2>
          </Navbar.Brand>
          <Stack spacing={8} direction="row">
            {!show ? (
              <Link to="/sign-up" className="lg-btn">
                <Button className="nav-btn" variant="outlined">
                  Login/Register
                </Button>
              </Link>
            ) : (
              ""
            )}
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button className="navBtn" onClick={toggleDrawer(anchor, true)}>
                  <GiHamburgerMenu />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  <div id="my-menu">
                    <h3>Navigation Menu</h3>

                    <ul>
                      <a
                        href="/"
                        className={location.pathname === "/" ? "set-bold" : ""}
                      >
                        <li>
                          <MdOutlineHomeWork /> <span>Home</span>
                        </li>
                      </a>
                      <a
                        href="/properties"
                        className={
                          location.pathname === "/properties" ? "set-bold" : ""
                        }
                      >
                        <li>
                          <FaCity />
                          All Properties
                        </li>
                      </a>
                      <Link
                        to="/profile"
                        className={
                          location.pathname === "/profile" ? "set-bold" : ""
                        }
                      >
                        <li>
                          <FaUserCircle />
                          Profile
                        </li>
                      </Link>
                      {!show ? (
                        <Link to="/sign-up">
                          <Button className="nav-btn" variant="outlined">
                            Login/Register
                          </Button>
                        </Link>
                      ) : (
                        ""
                      )}
                      {show ? (
                        <Button
                          className="nav-btn"
                          onClick={onLogout}
                          variant="outlined"
                        >
                          Logout
                        </Button>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </Drawer>
              </React.Fragment>
            ))}
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;
