import { Container, ContainerText, Text, Wrapper } from "../styles/stylesComponents/NotFound";

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <Text>Error 404!</Text>
        <hr />
        <Text>Page not found...</Text>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
