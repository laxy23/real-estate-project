import { Row, Col, Container } from "react-bootstrap";
import man from "../photos/3d_male.png";
import women from "../photos/3d_women.png";
import Chart from "../components/utils/Chart";
import r1 from "../photos/r1.jpg";
import r2 from "../photos/r2.jpg";
import r3 from "../photos/r3.jpg";
import r4 from "../photos/r4.jpg";
import PropertyItem from "../components/utils/PropertyItem";
import { getMyProperties } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  ];

  useEffect(() => {
    dispatch(getMyProperties());
  }, [user, dispatch]);

  return (
    <section id="profile" className="mb-6">
      <Container>
        <Row>
          <Col md={4}>
            <div className="profile-content">
              {user?.gender === "male" ? (
                <img src={man} alt="man" />
              ) : (
                <img src={women} alt="man" />
              )}
              <div className="box">
                <h4>Profile Name</h4>
                <p>{user.name}</p>
              </div>
              <div className="box">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
            </div>
          </Col>
          <Col md={8} className="item-2">
            <div className="button-container">
              <Link to="/sell-property">
                <Button className="nav-btn" variant="outlined">
                  Sell Your Property
                </Button>
              </Link>
            </div>
            <Chart />
          </Col>
          <h3 className="subtitle">Your Properties</h3>
          {data.map((item, i) => (
            <PropertyItem key={i} item={item} />
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Profile;
