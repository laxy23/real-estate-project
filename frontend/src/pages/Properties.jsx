import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PropertyItem from "../components/utils/PropertyItem";
import r1 from "../photos/r1.jpg";
import r2 from "../photos/r2.jpg";
import r3 from "../photos/r3.jpg";
import r4 from "../photos/r4.jpg";
import r5 from "../photos/r5.jpg";
import r6 from "../photos/r6.jpg";
import r7 from "../photos/r7.jpg";
import r8 from "../photos/r8.jpg";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const types = [
  "Apartment",
  "House",
  "Commercial property",
  "Weekend house",
  "Land",
];

function Properties() {
  const [value, setValue] = useState([35000, 320000]);
  const [homeType, setHomeType] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setHomeType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    setCategoryType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSlider = (event, newValue) => {
    setValue(newValue);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const citiesList = [
    "Zenica",
    "Sarajevo",
    "Tuzla",
    "Mostar",
    "Banja Luka",
    "Bihać",
    "Bosanski Brod",
    "Neum",
  ];

  const categoryList = ["For Sale", "For Rent", "Holiday Rent"];
  const roomsArr = ["1-3", "3-6", "6+"];
  const data = [
    {
      id: 1,
      image: r1,
      price: "75,000",
      title: "Luxy House Brand new",
      bedroom: 4,
      bathroom: 3,
      type: "House",
      categorie: "For Rent",
    },
    {
      id: 2,
      image: r2,
      price: "195,000",
      title: "The Awani Residence 3",
      bedroom: 6,
      bathroom: 4,
      type: "Villa",
      categorie: "For Sale",
    },
    {
      id: 3,
      image: r3,
      price: "65,000",
      title: "Gold Coast Sea View",
      bedroom: 6,
      bathroom: 5,
      type: "Apartment",
      categorie: "For Sale",
    },
    {
      id: 4,
      image: r4,
      price: "45,000",
      title: "CitraLand BSB City Center",
      bedroom: 3,
      bathroom: 1,
      type: "Apartment",
      categorie: "For Sale",
    },
    {
      id: 5,
      image: r5,
      price: "80,000",
      title: "AURORA Bukit Rancamayan",
      bedroom: 3,
      bathroom: 2,
      type: "House",
      categorie: "For Rent",
    },
    {
      id: 6,
      image: r6,
      price: "60,000",
      title: "Cluster Persada 3",
      bedroom: 3,
      bathroom: 1,
      type: "House",
      categorie: "For Sale",
    },
    {
      id: 7,
      image: r7,
      price: "50,000",
      title: "Amartha Residence, Jaya...",
      bedroom: 3,
      bathroom: 2,
      type: "House",
      categorie: "For Rent",
    },
    {
      id: 8,
      image: r8,
      price: "49,000",
      title: "Citiland Cibur Cillenguse",
      bedroom: 4,
      bathroom: 2,
      type: "House",
      categorie: "For Sale",
    },
  ];

  return (
    <section id="all-properties" className="mb-6">
      <Container>
        <Row>
          <Col md={4} className="item-1">
            <div className="nav-items">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search by location"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <div className="order">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={date}
                      label="Set Order"
                      onChange={handleDateChange}
                    >
                      <MenuItem value={10}>Price Low to High</MenuItem>
                      <MenuItem value={20}>Price High to Low</MenuItem>
                      <MenuItem value={30}>Date Old to New</MenuItem>
                      <MenuItem value={30}>Date New to Old</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="filter-items">
              <h3>Filter</h3>
              <div className="filter-item price">
                <h4>Set your price!</h4>
                <div className="price-number">
                  <h3>
                    Your Price : ${value[0]} - ${value[1]}
                  </h3>
                  <Box sx={{ width: 200 }}>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={value}
                      onChange={handleChangeSlider}
                      valueLabelDisplay="auto"
                      min={300}
                      step={10}
                      max={500000}
                    />
                  </Box>
                </div>
              </div>
              <div className="filter-item">
                <h4>Set Location!</h4>
                <div className="group">
                  <FormGroup className="form-item">
                    {citiesList.map((city, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox defaultChecked />}
                        label={city}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
              <div className="filter-item">
                <h4>Choose your type!</h4>
                <div className="group">
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Type
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      className="cities"
                      multiple
                      value={homeType}
                      onChange={handleChange}
                      input={<OutlinedInput label="Type" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {types.map((type) => (
                        <MenuItem key={type} value={type}>
                          <Checkbox checked={homeType.indexOf(type) > -1} />
                          <ListItemText primary={type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="filter-item">
                <h4>Choose your category!</h4>
                <div className="group">
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={categoryType}
                      onChange={handleSelectChange}
                      input={<OutlinedInput label="Type" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {categoryList.map((category) => (
                        <MenuItem key={category} value={category}>
                          <Checkbox
                            checked={categoryType.indexOf(category) > -1}
                          />
                          <ListItemText primary={category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="filter-item">
                <h4>Set bedrooms!</h4>
                <div className="group">
                  <FormGroup className="form-item">
                    {roomsArr.map((room, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox defaultChecked />}
                        label={room}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
              <div className="filter-item">
                <h4>Set bathrooms!</h4>
                <div className="group">
                  <FormGroup className="form-item">
                    {roomsArr.map((room, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox defaultChecked />}
                        label={room}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8} className="item-2">
            <div className="grid-property-items">
              {data.map((item, i) => (
                <PropertyItem key={i} item={item} grid={true} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Properties;
