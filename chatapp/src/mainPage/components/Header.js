import styled from "styled-components";

//add roomcode logic
const Header = () => {
  return (
    <HeaderContainer>
      <h1>#RoomCode</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export default Header;
