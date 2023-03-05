import { Row, Col, Container } from "react-bootstrap";
import { GoHome } from "react-icons/go";
import { TbReplace } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import PageTitle from "./PageTitle";

function Services() {
  const data = [
    {
      id: 1,
      icon: <GoHome />,
      title: "Find your dream house",
      paragraph:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas voluptates deleniti sed quisquam adipisci exercitationem odit voluptate esse, dolore molestiae dicta debitis molestias recusandae commodi?",
    },
    {
      id: 2,
      icon: <TbReplace />,
      title: "Find place of business",
      paragraph:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas voluptates deleniti sed quisquam adipisci exercitationem odit voluptate esse, dolore molestiae dicta debitis molestias recusandae commodi?",
    },
    {
      id: 3,
      icon: <GiWallet />,
      title: "Smart feature rich",
      paragraph:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas voluptates deleniti sed quisquam adipisci exercitationem odit voluptate esse, dolore molestiae dicta debitis molestias recusandae commodi?",
    },
  ];
  return (
    <section id="services" className="mb-6">
      <Container>
        <PageTitle
          subtitle="Why Choose Us"
          title="Provides the most complete list of property"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut
              commodi, libero sequi dolore officiis, unde hic pariatur nam enim
              dolorem modi consequuntur facilis tenetur rerum. Eligendi,
              distinctio expedita est debitis pariatur perspiciatis sunt ex?"
        />
        <Row>
          {data.map((item) => (
            <Col className="item-3" md={4} key={item.id}>
              <h2>{item.icon}</h2>
              <h3>{item.title}</h3>
              <p>{item.paragraph}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Services;
