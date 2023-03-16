import { Row, Col, Container } from "react-bootstrap";
import {
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty, reset } from "../features/propertySlice";
import { toast } from "react-hot-toast";
import Spinner from "../components/utils/Spinner";
import { useNavigate } from "react-router-dom";

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

function SellProperty() {
  const [homeType, setHomeType] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [city, setCity] = useState("");
  const [property, setProperty] = useState({
    propertyName: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    description: "",
  });
  const [images, setImages] = useState([]);
  const { propertyName, price, bedrooms, bathrooms, area, description } =
    property;

  const { isError, isLoading, isSuccess } = useSelector(
    (state) => state.property
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Can't create property");
    }

    if (isSuccess) {
      toast.success("You just created a property", {
        id: "sucess",
      });
    }
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const types = [
    "Apartment",
    "House",
    "Commercial property",
    "Weekend house",
    "Land",
  ];
  const categoryList = ["For Sale", "For Rent", "Holiday Rent"];
  const cityList = [
    "Zenica",
    "Sarajevo",
    "Bosanski Brod",
    "Neum",
    "Tuzla",
    "Mostar",
    "Banja Luka",
    "Bihać",
  ];

  const onPropertyChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProperty((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onImageChange = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setHomeType(value);
  };
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    setCategoryType(value);
  };
  const handleCityChange = (event) => {
    const {
      target: { value },
    } = event;

    setCity(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(images[0]);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("photos", images[i]);
    }
    formData.append("description", description);
    formData.append("category", categoryType);
    formData.append("price", price);
    formData.append("propertyName", propertyName);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("area", area);
    formData.append("type", homeType);
    formData.append("location", city);

    for (const value of formData.values()) {
      console.log(value);
    }

    dispatch(createProperty(formData));

    dispatch(reset());
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section id="sell-property" className="mb-6">
      <Container>
        <Row>
          <div className="page-title">
            <h3>Sell Your Property</h3>
          </div>
          <Col md={12}>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="text-field">
                <label className="sell-label">Property Name</label>
                <TextField
                  id="outlined-basic"
                  label="Property Name"
                  variant="outlined"
                  value={propertyName}
                  name="propertyName"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field sell-group">
                <label className="sell-label">Type</label>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={homeType}
                    label="type"
                    onChange={handleChange}
                  >
                    {types.map((type, i) => (
                      <MenuItem key={i} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="text-field sell-group">
                <label className="sell-label">Category</label>
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
              <div className="text-field sell-group">
                <label className="sell-label">City</label>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="city"
                    onChange={handleCityChange}
                  >
                    {cityList.map((city, i) => (
                      <MenuItem key={i} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="text-field">
                <label className="sell-label">Price</label>
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  type={"number"}
                  value={price}
                  name="price"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field">
                <label className="sell-label">Bedrooms</label>
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  label="Bedrooms"
                  variant="outlined"
                  value={bedrooms}
                  name="bedrooms"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field">
                <label className="sell-label">Bathrooms</label>
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  label="Bathrooms"
                  variant="outlined"
                  value={bathrooms}
                  name="bathrooms"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field">
                <label className="sell-label">Area</label>
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  label="Area"
                  variant="outlined"
                  value={area}
                  name="area"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field">
                <label className="sell-label">Description</label>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  name="description"
                  onChange={onPropertyChange}
                />
              </div>
              <div className="text-field">
                <label className="sell-label">Property photos</label>
                <Button variant="contained" component="label">
                  Upload
                  <input
                    hidden
                    id="images"
                    name="images"
                    onChange={onImageChange}
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </Button>
              </div>
              <div className="button-container">
                <button className="primary-btn" type="submit">
                  Submit
                </button>
              </div>
            </Box>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SellProperty;
