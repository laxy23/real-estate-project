import { Col } from "react-bootstrap";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { useState } from "react";
import Spinner from "./Spinner";
import { FaTrash } from "react-icons/fa";
import { deleteMyProperty } from "../../features/authSlice";
import { useDispatch } from "react-redux";

function PropertyItem({ item, grid, icon }) {
  const URL = "http://localhost:5000/static/";
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch();

  if (item === null || item === undefined || !item) {
    isLoading(true);
  }

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (e) => {
    dispatch(deleteMyProperty(e.target.id));
    window.location.reload();
  };

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
        <Col key={item._id} className="property-item" md={4} sm={6} lg={3}>
          {icon && (
            <div
              className="delete-icon-container"
              id={item._id}
              onClick={handleDelete}
            >
              <div className="icon" id={item._id}>
                <FaTrash id={item._id} />
              </div>
            </div>
          )}
          <a href={`/property-detail/${item?._id}`}>
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
          </a>
        </Col>
      )}
    </>
  );
}

export default PropertyItem;
