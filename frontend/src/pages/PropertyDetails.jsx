import { Row, Col, Container } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaMapMarkerAlt, FaBath } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import Button from "@mui/material/Button";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import PropertyItem from "../components/utils/PropertyItem";
import Slider from "react-slick";
import {
  getSingleProperty,
  getPropertyLocation,
  getSimilarProperty,
  reset,
} from "../features/propertySlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../components/utils/Spinner";
import { useParams } from "react-router-dom";

function PropertyDetails() {
  const [rooms, setRooms] = useState();
  const options = {
    autoPlay: true,
    stopOnHover: true,
    showArrows: true,
    showStatus: true,
    infiniteLoop: true,
    showIndicators: true,
    showThumbs: true,
    useKeyboardArrows: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    autoFocus: true,
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const URL = "http://localhost:5000/static/";

  const params = useParams();
  const dispatch = useDispatch();
  const {
    coordinates,
    similarProperty,
    property,
    isSuccess,
    isError,
    isLoading,
  } = useSelector((state) => state.property);

  const lat = coordinates?.data[0].latitude;
  const lng = coordinates?.data[0].longitude;

  useEffect(() => {
    if (isError) {
      console.log(isError);
    }

    dispatch(getSingleProperty(params.id));

    dispatch(reset);
  }, [dispatch, params, isError]);

  const sumRooms = () => {
    const num1 = property ? property.bedrooms * 1 : "";
    const num2 = property ? property.bathrooms * 1 : "";

    const sum = num1 + num2;

    setRooms(sum);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPropertyLocation(property.location));
    }
    sumRooms();

    if (property) {
      dispatch(getSimilarProperty(property.type));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (
    isLoading ||
    !property ||
    lat === undefined ||
    lng === undefined ||
    !similarProperty
  ) {
    return <Spinner />;
  }

  return (
    <section id="property-detail" className="mb-6">
      <Container>
        <Row>
          <Col md={6}>
            <h3 className="property-title">
              {property?.propertyName},
              <span className="location">
                <FaMapMarkerAlt /> {property?.location}
              </span>
            </h3>
            {property ? (
              <Carousel {...options}>
                {property?.photos.map((img, i) => (
                  <div key={i}>
                    <img src={`${URL}/${img}`} alt={`property-${img}`} />
                  </div>
                ))}
              </Carousel>
            ) : (
              ""
            )}
          </Col>
          <Col md={6} className="item-2">
            <div className="desc">
              <h3>Description</h3>
              <p>{property?.description}</p>
            </div>
            <div className="property-icon-container">
              <div className="property-icon-item">
                <IoIosBed />
                <h4>{property?.bedrooms} Beds</h4>
              </div>
              <div className="property-icon-item">
                <FaBath />
                <h4>{property?.bathrooms} Bath</h4>
              </div>
              <div className="property-icon-item">
                <MdMeetingRoom />
                <h4>{rooms} Rooms</h4>
              </div>
              <div className="property-icon-item">
                <BiArea />
                <h4>{property?.area} m²</h4>
              </div>
            </div>
            <div className="button-container">
              <Button className="main-btn" variant="outlined">
                Contact Landlord
              </Button>
            </div>
            <div className="price-container">
              <h3>$ {property?.price}</h3>
            </div>
          </Col>
          <Col md={12} className="item item-3">
            <h3>Map</h3>
            <MapContainer
              id="map"
              center={[lat, lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Col>
          <Col md={12} className="item item-4">
            <h3>Similar Properties</h3>
            <Slider {...settings}>
              {similarProperty.map((item, i) => (
                <PropertyItem key={i} item={item} slider={true} />
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PropertyDetails;
