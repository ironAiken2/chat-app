import styled from "styled-components";
import Header from "./components/Header";
import Contents from "./components/Contents";

const MainPage = () => {
  return (
    <MainContainer>
      <MainPageWrapper>
        <Header />
        <Contents />
      </MainPageWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 960px;
  height: 600px;
  background-color: #e3e8e7;
  justify-content: center;
  border: 2px solid #e3e8e7;
  border-radius: 10px;
`;

export default MainPage;
