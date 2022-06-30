import {
    Container, Dash, Hr, Li, Icon,
    Links, Span, Title, Ul,
} from "../styles/stylesAdmin/StyleSidebar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import React from 'react'

const Sidebar = () => {

    return (
        <Container>
            <Dash>
                <Links to="/">
                    <DashboardIcon />
                    <h2>Dashboard</h2>
                </Links>
            </Dash>
            <Hr />
            <Ul>
                <Title>LISTS</Title>
                <Li>
                    <Links to="/admin/users">
                        <Icon>
                            <PersonOutlineIcon />
                        </Icon>
                        <Span>Users</Span>
                    </Links>
                </Li>
                <Li>
                    <Links to="/admin/categories">
                        <Icon>
                            <StoreIcon />
                        </Icon>
                        <Span>Categories</Span>
                    </Links>
                </Li>
                <Li>
                    <Links to="/admin/products">
                        <Icon>
                            <StoreIcon />
                        </Icon>
                        <Span>Products</Span>
                    </Links>
                </Li>
                <Li>
                    <Links to="/#admin/orders">
                        <Icon>
                            <CreditCardIcon />
                        </Icon>
                        <Span>Orders</Span>
                    </Links>
                </Li>
                <Li>
                    <Links to="/#delivery">
                        <Icon>
                            <LocalShippingIcon />
                        </Icon>
                        <Span>Delivery</Span>
                    </Links>
                </Li>
                <Title>STATS</Title>
                <Li>
                    <Links to="/#stats">
                        <Icon>
                            <InsertChartIcon />
                        </Icon>
                        <Span>Statistic</Span>
                    </Links>
                </Li>
                <Li>
                    <Links to="/#notifications">
                        <Icon>
                            <NotificationsNoneIcon />
                        </Icon>
                        <Span>Notifications</Span>
                    </Links>
                </Li>
                <Title>SERVICE</Title>
                <Li>
                    <Links to="/#settings">
                        <Icon>
                            <SettingsApplicationsIcon />
                        </Icon>
                        <Span>Settings</Span>
                    </Links>
                </Li>
            </Ul>
        </Container>
    )
}

export default Sidebar
