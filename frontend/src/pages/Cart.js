import { Add, Remove } from "@material-ui/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Bottom,
  Button,
  Container,
  Details,
  Hr,
  Image,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductPrice,
  ProductSize,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Title,
  Top,
  TopButton,
  ContainerText,
  Text,
  Wrapper,
  ButtonRemove,
  ButtonClear
} from "../styles/stylesPages/StyleCart";
import Newsletter from "../components/Newsletter";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  }

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  }

  const handleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>SHOPPING CART</Title>
        <Top>
          <TopButton to="/products" type="filled">CONTINUE SHOPPING</TopButton>
        </Top>
        {cart.data.length === 0 ? (
          <ContainerText>
            <Text>YOUR CART IS CURRENTLY EMPTY...</Text>
          </ContainerText>
        ) : (
          <Bottom>
            <Info>
              {cart.data.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductName>
                        <b>Name:</b> {product.name}
                      </ProductName>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                      <ButtonRemove onClick={() => handleRemoveFromCart(product)}>Remove</ButtonRemove>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => handleDecreaseCart(product)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add onClick={() => handleIncreaseCart(product)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      € {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <ButtonClear onClick={() => handleClearCart()}>CLEAR CART</ButtonClear>
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>€ {cart.totalAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>€ {cart.shipping}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>€ {cart.globalTotalAmount}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT</Button>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
