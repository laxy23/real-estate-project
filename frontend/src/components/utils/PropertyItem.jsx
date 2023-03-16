import { Col } from "react-bootstrap";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "./Spinner";

function PropertyItem({ item, grid }) {
  const URL = "http://localhost:5000/static/";
  const [loading, isLoading] = useState(false);

  if (item === null || item === undefined || !item) {
    isLoading(true);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {grid ? (
        <a href={`/property-detail/${item?._id}`}>
          <div className="property-item">
            <div className="property-content">
              <img
                src={
                  item.photos
                    ? `${URL}/${item?.photos[0]}`
                    : `${URL}/${item?.image}`
                }
                alt={item ? item.propertyName : ""}
              />
              <div className="text-content">
                <div className="property-detail">
                  <span>{item.type}</span>
                  <span>{item.category}</span>
                </div>
                <h3>$ {item.price}</h3>
                <h4>{item.propertyName}</h4>
                <div className="icon-container">
                  <span>
                    <GiBathtub /> {item.bathrooms} bathroom
                  </span>
                  <span>
                    <BiBed /> {item.bedrooms} bedroom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      ) : (
        <Col key={item.id} className="property-item" md={3}>
          <Link to="/property-detail">
            <div className="property-content">
              <img src={item.image} alt={item.title} />
              <div className="text-content">
                <div className="property-detail">
                  <span>{item.type}</span>
                  <span>{item.categorie}</span>
                </div>
                <h3>$ {item.price}</h3>
                <h4>{item.title}</h4>
                <div className="icon-container">
                  <span>
                    <GiBathtub /> {item.bathroom} bathroom
                  </span>
                  <span>
                    <BiBed /> {item.bedroom} bedroom
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Col>
      )}
    </>
  );
}

export default PropertyItem;
