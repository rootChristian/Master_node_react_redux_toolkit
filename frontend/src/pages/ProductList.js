import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { Container } from "../styles/stylesPages/StyleProductList";


const ProductList = () => {

  return (
    <Container>
      <Navbar />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
