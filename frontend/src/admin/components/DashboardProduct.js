import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
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
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useSaveProductMutation } from '../../features/AuthApi';
import axios from 'axios';

const DashboardProduct = () => {
    //const { data } = useGetAllCategoriesQuery();
    const [categories, setCategories] = useState([]);

    //## Veille methode utiliser pr resoudre le pb de la dispatch
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/categories");
                setCategories(res.data);
            } catch (err) { }
        };
        getCategories();
    }, []);

    const listSize = ["S", "M", "L", "XL"];
    const listColor = ["white", "red", "black", "yellow", "blue", "green", "orange", "marron"];
    //const { data = [], isLoading } = useGetCategoriesMutation();
    const [saveProduct, { data, isError, error, isSuccess }] = useSaveProductMutation();

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
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        if (isError) {
            setErrorMsg(error.data.message);
            toast.error(error.data.message, {
                position: "bottom-left",
            });
        }

        if (isSuccess) {
            setErrorMsg('');
            toast.success(data.message, {
                position: "bottom-left",
            });
            navigate("/admin/products");
        }

    }, [data, isError, isSuccess])

    const types = ['image/png', 'image/jpeg'];

    const handleImage = (e) => {
        let itemFile = e.target.files[0];

        if (itemFile && types.includes(itemFile.type)) {
            setFile(itemFile);
            setErrorMsg('');

            //Show image first
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(itemFile);

        } else {
            setFile(null); setPreview(null);
            setErrorMsg("Please select an image file (png or jpeg)");
            toast.error("Please select an image file (png or jpeg)", {
                position: "bottom-left",
            });
        }
    }

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
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress) {
                    toast.info("Upload is " + progress + "% done", {
                        position: "bottom-left",
                    });
                }
            },
            (error) => {
                setErrorMsg('Handle unsuccessful uploads');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setErrorMsg('');
                    //console.log("product:\n", { name, description, quantity, price, image: downloadURL, category, size, color, inStock })
                    saveProduct({ name, description, quantity, price, image: downloadURL, category, size, color, inStock });
                });
            }
        );

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
                                <input type="file" maxFileSize={5242880}
                                    onChange={handleImage}
                                    required />
                            </label>
                        </ContactFieldset>
                        <ContactFieldset>
                            <label>Category</label>
                            <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <Option value=""> Select category </Option>
                                {categories?.map(category => (<Option value={category._id} key={category._id}> {category.name} </Option>))}
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
                            <Button type="submit" > CREATE</Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>Product image</TitleAvatar>
                    <Avatar src={preview} alt='' />
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardProduct
