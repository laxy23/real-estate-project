import first from "../photos/firsts.jpg";
import second from "../photos/seconds.jpg";
import thirds from "../photos/thirds.jpg";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Carousel from "react-bootstrap/Carousel";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <section id="signup">
      <Row>
        <Col md={5} className="item-1">
          <h2>
            <MdOutlineHomeWork /> <span>Elite Homes</span>
          </h2>
          <h2 className="create">Create an account</h2>
          <p>
            Do you want do buy or sell your property? You are on the right
            place!
          </p>
          <Box
            component="form"
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
              label="Name"
              variant="standard"
            />
            <TextField
              className="w-70"
              id="standard-basic"
              label="Email"
              variant="standard"
            />
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              className="w-70"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
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
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="gender w-70"
            >
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              className="w-70"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <p className="w-70 redirect">
              Don't have an account?{" "}
              <span>
                <Link to="/sign-in">Sign In</Link>
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

export default SignUp;
