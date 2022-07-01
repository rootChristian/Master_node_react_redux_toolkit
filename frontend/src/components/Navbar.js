import Typical from "react-typical";
import Flip from 'react-reveal/Flip';
import {
    Button,
    Center,
    Container,
    H1scrool,
    Header,
    Left,
    Logo,
    LogoUser,
    LogoH1,
    MenuItem,
    NavLink,
    NavLinks,
    Right,
    H1,
} from '../styles/stylesComponents/StyleNavbar';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, NotificationsNone } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";

//import "./topbar.css";

import { useNavigate } from "react-router-dom";
import { signOut } from "../features/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";


const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);

    /*useEffect(() => {
        if (auth.status === "success") {
            toast.success("Login successfully!", {
                position: "bottom-left",
            });
            navigate("/");
        }

        if (auth.error) {
            toast.error(auth.error, {
                position: "bottom-left",
            });
        }
    }, [auth.status, auth.error, navigate]);*/

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(signOut());
        navigate("/");
    };

    return (
        <Container>
            <Header>
                <Left to="/">
                    <Logo src="https://res.cloudinary.com/dcdkw4ylr/image/upload/v1656334924/logo/kzduo2xqybwgkgap0uuj.png" alt='logo' />
                    <LogoH1>Eshop</LogoH1>
                </Left>
                {auth.user.role === "ADMIN" || auth.user.role === "ROOT" ? (
                    <H1>ADMIN DASHBOARD</H1>
                ) : (
                    <Center>
                        <Flip center>
                            <H1scrool $mode="title">
                                {' '}
                                <Typical
                                    loop={Infinity}
                                    steps={[
                                        "❤️‍🔥 The best eshop ❤️‍🔥",
                                        1000,
                                        "❤️ Good shopping ❤️",
                                        1000,
                                    ]}
                                />
                            </H1scrool>
                        </Flip>
                        <H1scrool $mode="announcement">Free shipping over 50€.</H1scrool>
                    </Center>
                )}
                <Right>
                    {auth.data.token ? (
                        <>
                            <MenuItem> <Button onClick={handleClick}>LOGOUT</Button></MenuItem>
                            <MenuItem>
                                <LogoUser src={auth.user.image} alt={auth.user.firstname} />
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem><NavLinks to="/register"> REGISTER</NavLinks></MenuItem>
                            <MenuItem><NavLinks to="/login">LOGIN</NavLinks></MenuItem>
                        </>
                    )}
                    {auth.user.role === "ADMIN" || auth.user.role === "ROOT" ? (
                        <MenuItem>
                            <NotificationsNone />
                        </MenuItem>
                    ) : (
                        <MenuItem>
                            <NavLink to="/cart">
                                {totalQuantity ? <Badge badgeContent={totalQuantity} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                                    : <Badge badgeContent={"0"} color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                }
                            </NavLink>
                        </MenuItem>
                    )}
                </Right>
            </Header>
            {auth.user.role === "ADMIN" || auth.user.role === "ROOT" ? (<></>) : (<Filter />)}
        </Container>
    );
};

export default Navbar
