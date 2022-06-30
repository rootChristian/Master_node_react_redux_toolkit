import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  return (

    <Container>
      <Wrapper>
        <Left>
          <Title>Filter:</Title>

        </Left>
        <Links to="/products">VIEW ALL PRODUCTS</Links>
      </Wrapper>
    </Container>
  )
}

export default Filter


