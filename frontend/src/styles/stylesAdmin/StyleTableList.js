import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.span`
    font-weight: bold;
    font-size: 15px;
    color: blueviolet;
`;

export const Head = styled.div`
    font-weight: bold;
    font-size: 15px;
    color: #2f2360;
`;

export const Hr = styled.hr`
    width: 100%;
    margin: 0.5% 0%;
    border: 1.5px solid #f3e9fc;
`;

export const Links = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;

export const Avatar = styled.img`
    width: 32px;
      height: 32px;
      border-radius: 30%;
      margin-right: 5px;
      object-fit: cover;
`;

export const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    padding: 0.5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Search = styled.div`
      display: flex;
      align-items: center;
      border: 0.5px solid lightgray;
      padding: 3px;
`;

export const Input = styled.input`{
        border: none;
        outline: none;
        background: transparent;

        &::placeholder {
          font-size: 15px;
        }
      }
`;

export const CellWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const Status = styled.div`
    padding: 5px;
    border-radius: 5px;

    ${(props) => {
        switch (props.$mode) {
            case "Approved":
                return `
                    color: green;
                    background-color: rgba(0, 128, 0, 0.151);
                `;
            case "Pending":
                return `
                    color: goldenrod;
                    background-color: rgba(189, 189, 3, 0.103);
                `;
            default:
                return ``;
        }
    }}
`;