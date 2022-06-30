import { useSelector } from "react-redux";
import { Container, Title, Wrapper } from "../styles/stylesComponents/StyleCategories";
import CategoryItem from "./items/CategoryItem";

const Categories = () => {

  const categories = useSelector((state) => state.categories);

  return (
    <Container>
      <Title>CATEGORIES</Title>
      <Wrapper>
        {categories.status !== "success" ? (
          <p>Loading...</p>
        ) : (
          <>
            {categories.items.map((item) => (
              <CategoryItem item={item} key={item} />
            ))}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Categories;