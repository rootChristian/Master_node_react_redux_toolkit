import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import {
  Container,
  Image,
  Info,
  Circle,
  Icon,
} from "../../styles/stylesComponents/items/StyleProductItem";
import { addToCart } from "../../features/CartSlice";
//import { singleProduct } from "../../features/ProductSlice";


const Product = ({ item }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  }

  const handleDetailProduct = (item) => {
    //dispatch(singleProduct(item));
    navigate(`/products/${item.name}`);
  }

  return (
    <Container>
      <Circle />
      <Image src={item.image} />
      <Info>
        <Icon>
          <Button onClick={() => handleAddToCart(item)}>
            <ShoppingCartOutlined />
          </Button>
        </Icon>
        <Icon>
          <Button onClick={() => handleDetailProduct(item)}>
            <SearchOutlined />
          </Button>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
