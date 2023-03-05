import { Row, Col, Container } from "react-bootstrap";
import PageTitle from "./PageTitle";
import r1 from "../photos/r1.jpg";
import r2 from "../photos/r2.jpg";
import r3 from "../photos/r3.jpg";
import r4 from "../photos/r4.jpg";
import r5 from "../photos/r5.jpg";
import r6 from "../photos/r6.jpg";
import r7 from "../photos/r7.jpg";
import r8 from "../photos/r8.jpg";
import PropertyItem from "./utils/PropertyItem";

function Properties() {
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
    {
      id: 5,
      image: r5,
      price: "80,000",
      title: "AURORA Bukit Rancamayan",
      bedroom: 3,
      bathroom: 2,
      type: "House",
      categorie: "For Rent",
    },
    {
      id: 6,
      image: r6,
      price: "60,000",
      title: "Cluster Persada 3",
      bedroom: 3,
      bathroom: 1,
      type: "House",
      categorie: "For Sale",
    },
    {
      id: 7,
      image: r7,
      price: "50,000",
      title: "Amartha Residence, Jaya...",
      bedroom: 3,
      bathroom: 2,
      type: "House",
      categorie: "For Rent",
    },
    {
      id: 8,
      image: r8,
      price: "49,000",
      title: "Citiland Cibur Cillenguse",
      bedroom: 4,
      bathroom: 2,
      type: "House",
      categorie: "For Sale",
    },
  ];
  return (
    <section id="properties" className="mb-6">
      <Container>
        <PageTitle
          subtitle="Property"
          title="Property in Cities and Provinces in Indonesia"
          content="Explore all Properties ->"
          button={true}
        />
        <Row>
          {data.map((item, i) => (
            <PropertyItem key={i} item={item} />
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Properties;
