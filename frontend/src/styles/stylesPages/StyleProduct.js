import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

export const BodyContainer = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  margin-top: 20px;
  text-shadow: 1px 1px 1px #2f2360;
`;

export const ContainerText = styled.div`
  background-color: whitesmoke;
  border: 0.5px solid lightgray;
  border-radius: 20px;
  padding: 20px;
  height: 15vh;
`;

export const Text = styled.h1`
  font-weight: bold;
  font-size: larger;
  text-align: center;
  margin-top: 35px;
  text-shadow: 1px 1px 1px #2f2360;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-left: 1.5%;
`;

export const TopButton = styled(Link)`
  text-decoration-line: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#2f2390" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

export const DetailItems = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export const ImgContainer = styled.div`
  flex: 1;
  height: 68vh;
`;

export const Image = styled.img`
  width: 100%;
  height: 68vh;
  object-fit: cover;
`;

export const Detail = styled.div`
  flex: 1;
  text-align: center;
  //background-color: whitesmoke;
  color: #2f2360;
  padding: 50px;
  height: 68vh;
`;

export const DetailTitle = styled.h1`
  font-weight: bold;
`;

export const DetailItem = styled.div`
  //margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const DetailItemColor = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DetailColor = styled.div`
  border: 1.5px solid lightgray;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 10px;
  margin-right: 5%;
  //margin: 0px 5px;
  cursor: pointer;
  background-color: ${(props) => props.col};
`;

export const DetailItemWrapper = styled.span`
  margin-left: 50px;
  padding-left: 12px;
`;

export const DetailItemText = styled.span`
  padding: 10px;
  margin: 1%;
`;

export const DetailItemPrice = styled.span`
  padding: 10px;
  margin-right: 5%;
`;

export const DetailSize = styled.select`
  padding: 10px;
  margin-right: 5%;
`;

export const DetailItemQuantity = styled.span`
  padding: 10px;
  margin-right: 5%;
`;

export const DetailSizeOption = styled.option`
  margin-right: 5%;
`;

export const Button = styled.button`
    width: 200px;
    margin: 10%;
    padding: 5px;
    border-radius: 15px;
    border: 2px solid lightgray;
    font-weight: bold;
    color: #2f2390;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: white;
        transform: scale(1.1);
        cursor: pointer;
        color: #2f2390;
    }

    &:active {
        background-color: whitesmoke;
        color: red;
    };
`;
