import { Row, Col, Container } from "react-bootstrap";
import { MdOutlineHomeWork } from "react-icons/md";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const iconData = [
    {
      id: 1,
      icon: <AiOutlineInstagram />,
    },
    {
      id: 2,
      icon: <AiOutlineTwitter />,
    },
    {
      id: 3,
      icon: <AiFillLinkedin />,
    },
    {
      id: 4,
      icon: <FaTelegramPlane />,
    },
  ];
  const data = [
    {
      id: 1,
      list: ["Home", "For Sell", "For Rent", "New Property"],
    },
    {
      id: 2,
      list: ["Blogs", "KPR", "Referral", "FAQs"],
    },
    {
      id: 3,
      list: [
        "Privacy & Policy",
        "Terms & Condition",
        "Contact Us",
        "Cookies Policy",
      ],
    },
  ];
  return (
    <>
      <section id="footer">
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col md={6} className="footer-item">
              <h3>Find home with us</h3>
              <h2>Find the right house over 400,000 property options</h2>
              <button className="footer-btn">Find Now</button>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="main-footer">
        <Container>
          <Row>
            <Col md={6} className="item-1">
              <h2>
                <MdOutlineHomeWork /> <span>Elite Homes</span>
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                sed quidem id consequuntur?
              </p>
              <div className="icon-container">
                {iconData.map((item) => (
                  <span key={item.id}>{item.icon}</span>
                ))}
              </div>
            </Col>
            {data.map((item) => (
              <Col key={item.id} md={2} className="main-footer-item">
                <ul>
                  {item.list.map((list, i) => (
                    <li key={i}>{list}</li>
                  ))}
                </ul>
              </Col>
            ))}
            <hr />
            <p className="text-center copy">
              Copyright &copy; 2023 - All Rights Reserved
            </p>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Footer;
