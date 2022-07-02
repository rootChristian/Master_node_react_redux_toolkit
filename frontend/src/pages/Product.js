import { Add, Remove } from "@material-ui/icons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Image,
  ImgContainer,
  Title,
  Wrapper,
  ContainerText,
  Text,
  Detail,
  DetailItems,
  DetailColor,
  DetailItemColor,
  DetailTitle,
  DetailItem,
  DetailItemText,
  DetailItemPrice,
  BodyContainer,
  HeaderContainer,
  Top,
  TopButton,
  DetailSize,
  DetailItemQuantity,
  DetailSizeOption,
  DetailItemWrapper,
} from "../styles/stylesPages/StyleProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

const Product = (item) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { product, status } = useSelector((state) => state.products);
  const { name, description, price, quantity, image, size, color } = product;

  const [siz, setSiz] = useState("");
  const [col, setCol] = useState("");

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <HeaderContainer>
          <Title>PRODUCT DETAIL</Title>
          <Top>
            <TopButton to="/products" type="filled">CONTINUE SHOPPING</TopButton>
          </Top>
        </HeaderContainer>

        {status !== "success" ? (
          <BodyContainer>
            <ContainerText>
              <Text>UNSELECTED PRODUCT TO VIEW DETAILS...</Text>
            </ContainerText>
          </BodyContainer>
        ) : (
          <BodyContainer>
            <ImgContainer>
              <Image src={image} />
            </ImgContainer>
            <DetailItems>
              <Detail>
                <DetailTitle>DETAIL</DetailTitle>
                <hr />
                <DetailItem type="total">
                  <DetailItemText>Name: </DetailItemText>
                  <DetailItemText>{name}</DetailItemText>
                </DetailItem>
                <DetailItem type="total">
                  <DetailItemText>Description: </DetailItemText>
                  <DetailItemWrapper>
                    <DetailItemText>{description}</DetailItemText>
                  </DetailItemWrapper>
                </DetailItem>
                <DetailItem type="total">
                  <DetailItemText>Price: </DetailItemText>
                  <DetailItemPrice>€ {price}</DetailItemPrice>
                </DetailItem>
                <DetailItem type="total">
                  <DetailItemText>Quantity available: </DetailItemText>
                  <DetailItemQuantity>{quantity}</DetailItemQuantity>
                </DetailItem>
                <DetailItem type="total">
                  <DetailItemText>Size: </DetailItemText>
                  <DetailSize onChange={(e) => setSiz(e.target.value)}>
                    {size?.map((s) => (
                      <DetailSizeOption key={s}>{s}</DetailSizeOption>
                    ))}
                  </DetailSize>
                </DetailItem>
                <DetailItem type="total">
                  <DetailItemText>Color available: </DetailItemText>
                  <DetailItemColor>
                    {color?.map((c) => (
                      <DetailColor col={c} key={c} onClick={() => setCol(c)} />
                    ))}
                  </DetailItemColor>
                </DetailItem>
                <Button onClick={() => handleAddToCart(product)}>ADD TO CART</Button>
              </Detail>
            </DetailItems>
          </BodyContainer>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Product;
