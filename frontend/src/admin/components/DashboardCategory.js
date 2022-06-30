import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSaveCategoryMutation } from '../../features/AuthApi';
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
} from '../../styles/stylesAdmin/components/StyleDashboardCategory';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";


const DashboardCategory = () => {
    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [saveCategory, { data, isError, error, isSuccess }] = useSaveCategoryMutation();

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
            navigate("/admin/categories");
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
                    const save = saveCategory({ name, image: downloadURL });
                    dispatch(save);
                });
            }
        );
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
                                <input type="file" maxFileSize={5242880}
                                    onChange={handleImage}
                                    required />
                            </label>
                        </ContactFieldset>
                        <WrapperBottom>
                            {errorMsg && <Error>{errorMsg}</Error>}
                            <Button type="submit" > CREATE</Button >
                        </WrapperBottom>
                    </Form >
                </UserContainer>
                <UserContainer>
                    <TitleAvatar>Category image</TitleAvatar>
                    <Avatar src={preview} alt='' />
                </UserContainer>
            </ContainerTable>
        </Container>
    )
}

export default DashboardCategory
