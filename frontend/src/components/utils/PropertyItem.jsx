import { Col } from "react-bootstrap";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { Link } from "react-router-dom";

function PropertyItem({ item, grid }) {
  return (
    <>
      {grid ? (
        <Link to="/property-detail">
          <div className="property-item">
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
          </div>
        </Link>
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
