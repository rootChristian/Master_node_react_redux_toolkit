import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
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
    Select,
    Option,
} from '../../styles/stylesAdmin/components/StyleDashboardUser';
import { registerUser } from "../../features/usersSlice";

const DashboardUser = () => {

    const { user } = useSelector((state) => state.auth);

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();

    const listRole = ["USER", "ADMIN", "ROOT"];
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

        if (password === confirmPassword) {
            const user = { firstname, lastname, email, password, gender, role, image: image };
            dispatch(registerUser(user));
        } else {
            setErrorMsg("Password don't match!");
            toast.error("Password don't match!", {
                position: "bottom-left",
            });
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title> USER REGISTRATION</Title>
                <Hr />
            </Wrapper>
            <ContainerTable>
                <UserContainer>
                    <Form onSubmit={handleClick}>
                        <Input placeholder="First name" type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            required />
                        <Input placeholder="Last name" type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            required />
                        <Input placeholder="Email" type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <Input placeholder="Password" type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <Input placeholder="Confirm password" type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                        <ContactFieldset>
                            <legend>Image</legend>
                            <label>
                                <input name="image" type="file"
                                    onChange={handleImage}
                                />
                            </label>
                        </ContactFieldset>
                        <ContactFieldset>
                            <legend>Gender</legend>
                            <label>
                                <input type="radio"
                                    name="gender"
                                    onChange={(e) => setGender(e.target.value = "F")}
                                />
                                Female
                            </label>
                            <label>
                                <input type="radio"
                                    name="gender"
                                    onChange={(e) => setGender(e.target.value = "M")}
                                />
                                Male
                            </label>
                        </ContactFieldset>
                        <ContactFieldset>
                            <label>Role</label>
                            <Select name={"role"} value={role} onChange={(e) => setRole(e.target.value)} required>
                                <Option value=""> Select role </Option>
                                {listRole?.map(r => (<Option value={r} key={r}> {r} </Option>))}
                            </Select>
                        </ContactFieldset>
                        <WrapperBottom>
                            {errorMsg && <Error>{errorMsg}</Error>}
                            <Button type="submit" disabled={user.role !== "ROOT"}> CREATE </Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>User avater</TitleAvatar>
                    {image ? (
                        <Avatar src={image} alt="" />
                    ) : (<></>)}
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardUser
