import { Row, Col, Container } from "react-bootstrap";
import man from "../photos/3d_male.png";
import women from "../photos/3d_women.png";
import Chart from "../components/utils/Chart";
import PropertyItem from "../components/utils/PropertyItem";
import { getMyProperties } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Profile() {
  const { user, userProperty } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProperties());
  }, [user, dispatch]);

  return (
    <section id="profile" className="mb-6">
      <Container>
        <Row>
          <Col md={4} sm={12}>
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
          {userProperty &&
            userProperty.map((item, i) => (
              <PropertyItem key={i} icon={true} item={item} />
            ))}
        </Row>
      </Container>
    </section>
  );
}

export default Profile;
