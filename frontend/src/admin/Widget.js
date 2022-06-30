import React from 'react'
import { Container, Counter, Icon, Links, Percentage, Title, WidgetLeft, WidgetRight } from '../styles/stylesAdmin/StyleWidget'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';

const Widget = ({ type }) => {

    let data;

    //Temporaly
    const amount = 100;
    const difference = 20;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "View all users",
                icon:
                    <Icon $inputColor="blueviolet" $inputBg="#f3e9fc">
                        <PersonOutlinedIcon />
                    </Icon>,
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon:
                    <Icon $inputColor="#990099" $inputBg="#ffe6ff">
                        <ShoppingCartOutlinedIcon />
                    </Icon>,
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon:
                    <Icon $inputColor="#00cc00" $inputBg="#e6ffe6">
                        <EuroSymbolIcon />
                    </Icon>,
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "View details",
                icon:
                    <Icon $inputColor="#ff66ff" $inputBg="#ffe6ff">
                        <AccountBalanceWalletOutlinedIcon />
                    </Icon>,
            };
            break;
        default:
            break;

    }

    return (
        <Container>
            <WidgetLeft>
                <Title>{data.title}</Title>
                <Counter>{data.isMoney && "€"} {amount}</Counter>
                <Links to="/admin/users">{data.link}</Links>
            </WidgetLeft>
            <WidgetRight>
                <Percentage $mode="positive">
                    <KeyboardArrowUpIcon />
                    {difference} %
                </Percentage>
                {data.icon}
            </WidgetRight>
        </Container>
    )
}

export default Widget
