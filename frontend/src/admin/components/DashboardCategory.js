import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { registerCategory } from '../../features/categoriesSlice';
import {
    Avatar,
    Container, ContainerTable,
    Hr, Wrapper, Title,
    UserContainer,
    Form, WrapperBottom,
    Input,
    ContactFieldset,
    Button,
    Error,
    TitleAvatar,
} from '../../styles/stylesAdmin/components/StyleDashboardCategory';

const DashboardCategory = () => {

    const { user } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [image, setImage] = useState("");
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

    const handleClick = (e) => {
        e.preventDefault();

        if (name && image) {
            const category = { name, image: image };
            dispatch(registerCategory(category));
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
                <Title> CATEGORY REGISTRATION</Title>
                <Hr />
            </Wrapper>
            <ContainerTable>
                <UserContainer>
                    <Form onSubmit={handleClick}>
                        <Input placeholder="name" type="text"
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <ContactFieldset>
                            <legend>Image</legend>
                            <label>
                                <input name="image" type="file"
                                    onChange={handleImage}
                                    required />
                            </label>
                        </ContactFieldset>
                        <WrapperBottom>
                            {errorMsg && <Error>{errorMsg}</Error>}
                            <Button type="submit" disabled={user.role !== "ROOT"}> CREATE</Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>Category image</TitleAvatar>
                    {image ? (
                        <Avatar src={image} alt="" />
                    ) : (<></>)}
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardCategory
