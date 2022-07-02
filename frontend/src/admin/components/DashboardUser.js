import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
///import { useRegisterUserMutation } from '../../features/AuthApi';
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
} from '../../styles/stylesAdmin/components/StyleDashboardUser';


const DashboardUser = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /*const [registerUser, { data, isError, error, isSuccess }] = useRegisterUserMutation();

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
            navigate("/admin/users");
        }

    }, [data, isError, isSuccess])
*/
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

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        //const storage = getStorage(app);
        //const storageRef = ref(storage, fileName);
        //const uploadTask = uploadBytesResumable(storageRef, file);

        if (password === confirmPassword) {
            /*uploadTask.on(
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
                        const register = registerUser({ firstname, lastname, email, password, gender, image: downloadURL });
                        
                }
            );*/

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
                                <input type="file" maxFileSize={5242880}
                                    onChange={handleImage}
                                    required />
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
                        <WrapperBottom>
                            {errorMsg && <Error>{errorMsg}</Error>}
                            <Button type="submit" > CREATE</Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>User avater</TitleAvatar>
                    <Avatar src={preview} alt='Avatar' />
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardUser
