import {
  Container,
  Image,
  Info,
  Title,
  Button,
  Links
} from "../../styles/stylesComponents/items/StyleCategoryItem";

import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ item }) => {
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
