import styled from "styled-components";
import { Link } from "react-router-dom";

export const Datatable = styled.div`
  flex: 1;
  height: 65vh;
`;

export const Title = styled.span`
    font-weight: bold;
    font-size: 15px;
    color: blueviolet;
    //padding: 5px;
`;

export const Head = styled.div`
    font-weight: bold;
    font-size: 15px;
    color: #2f2360;
`;

export const Hr = styled.hr`
    width: 100%;
    margin: 1.5% 0%;
    border: 1.5px solid #f3e9fc;
`;

export const Links = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const Edit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #00cc00;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

export const Delete = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;


export const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const AddContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #00b300;
    color: white;
    cursor: pointer;
`;

export const Span = styled.span`
    padding-right: 5px;
`;

