import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { registerProduct } from '../../features/productsSlice';
import {
    Avatar,
    Container, ContainerTable,
    Hr, Wrapper, Title,
    UserContainer,
    Form, WrapperBottom,
    Input, Select, Option,
    ContactFieldset,
    Button, Textarea,
    Error,
    TitleAvatar,
} from '../../styles/stylesAdmin/components/StyleDashboardProduct';

const DashboardProduct = () => {

    const { user } = useSelector((state) => state.auth);
    const categories = useSelector((state) => state.categories);

    const listSize = ["S", "M", "L", "XL"];
    const listColor = ["white", "red", "black", "yellow", "blue", "green", "orange", "marron"];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [changeValue, setChangeValue] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [image, setImage] = useState("");
    const [inStock, setInStock] = useState();
    const dispatch = useDispatch();

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) transformFileData(file);
        else setImage('');
    }

    const transformFileData = (file) => {
        const reader = new FileReader();
        if (types.includes(file.type)) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setErrorMsg('');
            };
        } else {
            setErrorMsg("Please select an image file (png or jpeg or pgp)");
            toast.error("Please select an image file (png or jpeg or pgp)", {
                position: "bottom-left",
            });
        }
    };

    const checkboxColor = (e) => {
        if (e.target.checked) {
            const changeValue = e.target.value;
            if (e.target.checked) {
                setChangeValue(changeValue);
                color.push(changeValue);
            }

        }
    }

    const checkboxSize = (e) => {
        if (e.target.checked) {
            const changeValue = e.target.value;
            if (e.target.checked) {
                setChangeValue(changeValue);
                size.push(changeValue);
            }
        }
    }

    const handleClick = (e) => {
        e.preventDefault();

        if (image) {
            const product = { name, description, quantity, price, category, size, color, image: image, inStock };

            dispatch(registerProduct(product));
        } else {
            setErrorMsg("Insert name or image!");
            toast.error("Insert name or image!", {
                position: "bottom-left",
            });
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title> PRODUCT REGISTRATION</Title>
                <Hr />
            </Wrapper>
            <ContainerTable>
                <UserContainer>
                    <Form onSubmit={handleClick}>
                        <Input placeholder="Name" type="text"
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <Textarea placeholder="Description" type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                        <Input placeholder="Quantity" type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            required />
                        <Input placeholder="Price" type="decimal"
                            onChange={(e) => setPrice(e.target.value)}
                            required />
                        <ContactFieldset>
                            <legend>Image</legend>
                            <label>
                                <input name="image" type="file"
                                    onChange={handleImage}
                                    required />
                            </label>
                        </ContactFieldset>
                        <ContactFieldset>
                            <label>Category</label>
                            <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <Option value=""> Select category </Option>
                                {categories.items.map(category => (<Option value={category._id} key={category._id}> {category.name} </Option>))}
                            </Select>
                        </ContactFieldset>
                        <ContactFieldset>
                            <legend>Size</legend>
                            {listSize?.map((s) => (
                                <label>
                                    <input type="checkbox" name={s} value={s} onChange={checkboxSize} />
                                    {s}
                                </label>
                            ))}
                        </ContactFieldset>
                        <ContactFieldset>
                            <legend>Colors</legend>
                            {listColor?.map((c) => (
                                <label>
                                    <input type="checkbox" name={c} value={c} onChange={checkboxColor} />
                                    {c}
                                </label>
                            ))}
                        </ContactFieldset>
                        <ContactFieldset>
                            <label>In Stock</label>
                            <label>
                                <input type="radio"
                                    name="inStock"
                                    onChange={(e) => setInStock(e.target.value = "true")}
                                />
                                Yes
                            </label>
                            <label>
                                <input type="radio"
                                    name="inStock"
                                    onChange={(e) => setInStock(e.target.value = "false")}
                                />
                                No
                            </label>
                        </ContactFieldset>
                        <WrapperBottom>
                            {errorMsg && <Error>{errorMsg}</Error>}
                            <Button type="submit" disabled={user.role !== "ROOT"}> CREATE</Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>Product image</TitleAvatar>
                    {image ? (
                        <Avatar src={image} alt="" />
                    ) : (<></>)}
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardProduct
