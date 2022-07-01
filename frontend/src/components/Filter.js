import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import {
  Container,
  Input,
  Left,
  Links,
  Option,
  SearchContainer,
  Select,
  Title,
  Wrapper,
} from '../styles/stylesComponents/StyleFilter';

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);


  // Get id product selected
  const item = category;
  //const { items } = useGetAllProductsCategoriesQuery(item);

  /*if (items) {

    navigate(`/products/category/${items._id}`);

    return (<ProductList item={product} />)
  }*/

  const handleSearch = (item) => {
    dispatch(product);
  }


  /*if (isLoading) {
    return "Loading...";
  }*/
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Filter:</Title>
          <SearchContainer onSubmit={handleSearch}>
            <Select name="category" /*</SearchContainer>value={category} onChange={(e) => setCategory(e.target.value)}*/>
              <Option value=""> Select with category </Option>
              {categories.items?.map(category => (<Option value={category._id} key={category._id}> {category.name} </Option>))}
            </Select>
            <Input type="search" placeholder="Search..." name="product" /*onChange={(e) => setProduct(e.target.value.toLowerCase())}*/ />
            <Button type="submit">
              <Search style={{ color: "gray", fontSize: 20, marginRight: "0px" }} />
            </Button>
          </SearchContainer>
        </Left>
        <Links to="/products">VIEW ALL PRODUCTS</Links>
      </Wrapper>
    </Container>
  )
}

export default Filter
