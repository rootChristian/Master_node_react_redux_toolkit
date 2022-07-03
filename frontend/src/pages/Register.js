import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../features/authSlice";
import {
  Agreement,
  Button,
  ContactFieldset,
  Container,
  Error,
  Form,
  ImagePreview,
  Input,
  Links,
  Title,
  Wrapper,
  WrapperButtom,
  WrapperButtom1,
} from "../styles/stylesPages/StyleRegister";

const Register = () => {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  useEffect(() => {
    if (auth.status === "success") {
      toast.success(auth.data.message, {
        position: "bottom-left",
      });
      navigate("/");
    }
  }, [auth.status, navigate]);

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
      toast.error("Please select an image file (png or jpeg)", {
        position: "bottom-left",
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const User = { firstname, lastname, email, password, gender, image: image };
      dispatch(registerUser(User));
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
        <Title>REGISTRATION</Title>
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
            <ImagePreview>
              {image ? (
                <>
                  <img src={image} alt="" />
                </>
              ) : (<></>)}
            </ImagePreview>

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
          <WrapperButtom1>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY.</b>
            </Agreement>
            <Button type="submit" hidden={auth.status === "success"}>
              {auth.loading ? "Submitting..." : "CREATE"}
            </Button>
          </WrapperButtom1>
        </Form >
        <WrapperButtom>
          <Links to="/login">Login to you're account</Links>
          {auth.status === "rejected" ? (
            <Error>{auth.error}</Error>
          ) : null}
          <Links to="/">BACK - HOME</Links>
        </WrapperButtom>
        {errorMsg && <Error>{errorMsg}</Error>}
      </Wrapper >
    </Container >
  );
};
export default Register;