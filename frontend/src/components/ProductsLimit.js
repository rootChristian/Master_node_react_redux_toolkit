import ProductItem from "./items/ProductItem";
import { Container, Title, Wrapper } from "../styles/stylesComponents/StyleProducts";
import { useSelector } from "react-redux";

const Products = () => {

  const products = useSelector((state) => state.products);

  return (
    <Container>
      <Title>PRODUCTS</Title>
      <Wrapper>
        {products.status !== "success" ? (
          <p>Loading...</p>
        ) : (
          <>
            {products.items
              .slice(0, 6)
              .map((item) => (
                <ProductItem item={item} key={item} />
              ))}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Products;
