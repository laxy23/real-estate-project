import { Row, Col, Container } from "react-bootstrap";
import { FaSearchLocation } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { BsHouseDoor } from "react-icons/bs";
import { GiVikingLonghouse } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const cities = [
    {
      value: "Location",
      label: "Location",
    },
    {
      value: "Zenica",
      label: "Zenica",
    },
    {
      value: "Sarajevo",
      label: "Sarajevo",
    },
    {
      value: "Tuzla",
      label: "Tuzla",
    },
    {
      value: "Mostar",
      label: "Mostar",
    },
    {
      value: "Banja Luka",
      label: "Banja Luka",
    },
    {
      value: "Bihać",
      label: "Bihać",
    },
    {
      value: "Bosanski Brod",
      label: "Bosanski Brod",
    },
    {
      value: "Neum",
      label: "Neum",
    },
  ];
  const types = [
    {
      value: "Type",
      label: "Type of home",
    },
    {
      value: "Apartment",
      label: "Apartment",
    },
    {
      value: "House",
      label: "House",
    },
    {
      value: "Commercial property",
      label: "Commercial property",
    },
    {
      value: "Weekend house",
      label: "Weekend house",
    },
    {
      value: "Land",
      label: "Land",
    },
  ];
  const categories = [
    {
      value: "Categories",
      label: "Categories",
    },
    {
      value: "For Rent",
      label: "For Rent",
    },
    {
      value: "For Sale",
      label: "For Sale",
    },
    {
      value: "Holiday Rent",
      label: "Holiday Rent",
    },
  ];

  return (
    <section id="header" className="mb-6">
      <div className="overlay"></div>
      <Container>
        <Row>
          <Col md={12} className="item-1">
            <div className="text-container">
              <h2>Discover a place you will love to live!</h2>
              <p>
                Connect with more than 75 million renters looking for new homes
                using our comperhensive marketing platform...
              </p>
            </div>
            <div className="bg-light input-container">
              {/* Cities */}
              <div className="select-container">
                <div className="icon">
                  <ImLocation2 />
                </div>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  defaultValue="Location"
                  helperText="Please select your location"
                  variant="standard"
                >
                  {cities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {/* Types */}
              <div className="select-container">
                <div className="icon">
                  <BsHouseDoor />
                </div>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  defaultValue="Type"
                  helperText="Please select your type"
                  variant="standard"
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {/* Categories */}
              <div className="select-container">
                <div className="icon">
                  <GiVikingLonghouse />
                </div>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  defaultValue="Categories"
                  helperText="Please select your category"
                  variant="standard"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="search-icon">
                <button className="search-btn">
                  <FaSearchLocation />
                </button>
              </div>
            </div>
            <div className="number-container">
              <div className="item">
                <h3>1500+</h3>
                <p>Property Ready</p>
              </div>
              <div className="item">
                <h3>500+</h3>
                <p>Happy Customer</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Header;
