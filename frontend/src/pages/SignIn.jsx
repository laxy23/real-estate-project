import first from "../photos/firsts.jpg";
import second from "../photos/seconds.jpg";
import thirds from "../photos/thirds.jpg";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineHomeWork } from "react-icons/md";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Carousel from "react-bootstrap/Carousel";
import toast from "react-hot-toast";
import { login, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/utils/Spinner";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error("Wrong email or password", {
        id: "signinError",
      });
    }

    if (isSuccess || user) {
      toast.success("You are logged in", {
        id: "signinSuccess",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, user, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData) {
      try {
        dispatch(login(formData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section id="signup">
      <Row>
        <Col md={5} className="item-1">
          <h2>
            <MdOutlineHomeWork /> <span>Elite Homes</span>
          </h2>
          <h2 className="create">Welcome back!</h2>
          <p>Log into your account and start with great expirience.</p>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="form-group w-100"
          >
            <TextField
              className="w-70"
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              value={email}
              onChange={onChange}
            />
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              className="w-70"
              value={password}
              onChange={onChange}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="password"
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="button-container">
              <button className="primary-btn" type="submit">
                Submit
              </button>
            </div>
            <p className="w-70 redirect">
              Already have an account?{" "}
              <span>
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </p>
          </Box>
        </Col>
        <Col md={7} className="item-2">
          <Carousel fade interval={5000}>
            <Carousel.Item>
              <img className="d-block w-100" src={first} alt="First slide" />
              <div className="lay"></div>
              <Carousel.Caption>
                <h3>Elite Home</h3>
                <p>
                  Welcome to our Real Estate section, where we provide a
                  comprehensive guide to buying, selling, renting, and investing
                  in properties.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={second} alt="Second slide" />
              <div className="lay"></div>
              <Carousel.Caption>
                <h3>Need Help?</h3>
                <p>
                  Whether you are a first-time home buyer, a seasoned investor,
                  or a landlord looking for a reliable property management
                  service, we are here to help you make informed decisions and
                  achieve your goals.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={thirds} alt="Third slide" />
              <div className="lay"></div>
              <Carousel.Caption>
                <h3>Use Our Tools</h3>
                <p>
                  Our website provides a wealth of resources and tools to help
                  you navigate the real estate market with confidence.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </section>
  );
}

export default SignIn;
