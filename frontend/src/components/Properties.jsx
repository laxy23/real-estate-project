import { Row, Container } from "react-bootstrap";
import PageTitle from "./PageTitle";
import PropertyItem from "./utils/PropertyItem";
import { getAllProperties, reset } from "../features/propertySlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "./utils/Spinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function Properties() {
  const dispatch = useDispatch();

  const { property, isError, isLoading } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    if (isError) {
      toast.error("Can't load properties");
    }

    dispatch(getAllProperties());

    dispatch(reset());
  }, [isError, dispatch, property]);

  if (isLoading || !property || property === undefined || property === null) {
    return <Spinner />;
  }
  return (
    <section id="properties" className="mb-6">
      <Container>
        <Link to={`/properties`}>
          <PageTitle
            subtitle="Property"
            title="Property in Cities and Provinces in Indonesia"
            content="Explore all Properties ->"
            button={true}
          />
        </Link>
        <Row>
          {property &&
            property.map((item, i) => <PropertyItem key={i} item={item} />)}
        </Row>
      </Container>
    </section>
  );
}

export default Properties;
