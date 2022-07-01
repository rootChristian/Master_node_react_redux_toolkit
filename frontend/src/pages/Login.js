import {
  Button,
  Container,
  Error,
  Form,
  Input,
  Links,
  Title,
  Wrapper,
  WrapperButtom,
} from "../styles/stylesPages/StyleLogin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  /*useEffect(() => {
    if (auth.status === "success") {
      toast.success(auth.data.message, {
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
    if (email && password) {
      const User = signIn({ email, password });
      dispatch(User);
    } else {
      toast.error("Insert email and password!", {
        position: "bottom-left",
      });
    }
  };

  if (auth.data.token) {
    navigate("/");
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form >
          <Input placeholder="email" type="email"
            onChange={(e) => setEmail(e.target.value)}
            required />
          <Input placeholder="Password" type="password"
            onChange={(e) => setPassword(e.target.value)}
            required />
          <Button onClick={handleClick} hidden={auth.status === "success"}>LOGIN</Button>
        </Form>
        {auth.status === "rejected" ? (
          <Error>{auth.error}</Error>
        ) : null}
        <WrapperButtom>
          <Links to="/register">Create a new account</Links>
          <Links to="/">BACK - HOME</Links>
        </WrapperButtom>
      </Wrapper>
    </Container>
  );
};

export default Login;