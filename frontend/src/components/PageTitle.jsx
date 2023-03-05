import { Row, Col } from "react-bootstrap";

function PageTitle({ subtitle, title, content, button }) {
  return (
    <Row id="pageTitle">
      <Col md={6} className="item">
        <h3 className="page-title">{subtitle}</h3>
        <h2>{title}</h2>
      </Col>
      <Col md={6} className="item item-2">
        {!button ? <p>{content}</p> : <button>{content}</button>}
      </Col>
    </Row>
  );
}

export default PageTitle;
