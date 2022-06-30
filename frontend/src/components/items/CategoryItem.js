import {
  Container,
  Image,
  Info,
  Title,
  Button,
  Links
} from "../../styles/stylesComponents/items/StyleCategoryItem";
import { useState } from "react";
//import ProductItem from "./items/ProductItem";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleC = (item) => {
    navigate("/products")
  }

  return (
    <Container>
      <Image src={item.image} />
      <Info>
        <Title>{item.name}</Title>
        <button onClick={() => handleC(item._id)} >SHOW NOW</button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
