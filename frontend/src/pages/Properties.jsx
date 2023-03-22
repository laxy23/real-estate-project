import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  Box,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItemText,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropertyItem from "../components/utils/PropertyItem";
import {
  getAllProperties,
  reset,
  getFilteredProperties,
} from "../features/propertySlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Spinner from "../components/utils/Spinner";

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
  const [value, setValue] = useState([0, 320000]);
  const [homeType, setHomeType] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [beds, setBeds] = useState([]);
  const [baths, setBaths] = useState([]);
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");

  const setStateValues = () => {
    setHomeType([]);
    setCategoryType([]);
    setBeds([]);
    setBaths([]);
    setCity([]);
    setSearch("");
  };

  const { property, isError, isLoading } = useSelector(
    (state) => state.property
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error("Can't load properties");
    }

    dispatch(getAllProperties());

    dispatch(reset());
  }, [isError, dispatch]);

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

  const handleCityChange = (event) => {
    if (typeof event === "string") {
      if (!city.includes(event)) {
        setCity([...city, event]); // Update arr using setArr()
      } else {
        // Remove the name from the array if it's in there
        setCity(city.filter((item) => item !== event));
      }
    } else {
      const {
        target: { name },
      } = event;
      if (!city.includes(name)) {
        setCity([...city, name]); // Update arr using setArr()
      } else {
        // Remove the name from the array if it's in there
        setCity(city.filter((item) => item !== name));
      }
    }
  };

  const handleChangeSlider = (e, newValue) => {
    setValue(newValue);
  };
  const handleBedChange = (e) => {
    const {
      target: { name },
    } = e;

    if (!beds.includes(name)) {
      setBeds([...beds, name]); // Update arr using setArr()
    } else {
      // Remove the name from the array if it's in there
      setBeds(beds.filter((item) => item !== name));
    }
  };
  const handleBathChange = (e) => {
    const {
      target: { name },
    } = e;

    if (!baths.includes(name)) {
      setBaths([...baths, name]); // Update arr using setArr()
    } else {
      // Remove the name from the array if it's in there
      setBaths(baths.filter((item) => item !== name));
    }
  };

  const onApplyChanges = () => {
    const url = `bed=${beds.length >= 1 ? beds : "empty"}&bath=${
      baths.length >= 1 ? baths : "empty"
    }&cities=${city.length >= 1 ? city : "empty"}&city=${
      search.length >= 1 ? search : "empty"
    }&categories=${categoryType.length >= 1 ? categoryType : "empty"}&homes=${
      homeType.length >= 1 ? homeType : "empty"
    }&price=${value.length >= 1 ? value : "empty"}`;
    dispatch(getFilteredProperties(url));

    setStateValues();
  };

  const searchByLocation = () => {
    onApplyChanges();
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

  if (isLoading || !property || property === undefined || property === null) {
    return <Spinner />;
  }

  return (
    <section id="all-properties" className="mb-6">
      <Container>
        <Row>
          <Col md={6} lg={4} className="item-1">
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={searchByLocation}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
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
                        control={<Checkbox />}
                        label={city}
                        name={city}
                        onChange={handleCityChange}
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
                        onChange={handleBedChange}
                        value={beds}
                        name={room}
                        key={i}
                        id="bedrooms"
                        control={<Checkbox />}
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
                        onChange={handleBathChange}
                        name={room}
                        id="bathrooms"
                        control={<Checkbox />}
                        label={room}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>

              <button onClick={onApplyChanges} className="primary-btn">
                Apply Changes
              </button>
            </div>
          </Col>
          <Col md={6} lg={8} className="item-2">
            <div className="grid-property-items">
              {property &&
                property.map((item, i) => (
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
