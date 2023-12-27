import styled from "styled-components";
import ChatList from "./chatList/ChatList";
import MainChat from "./mainChat/MainChat";

const Contents = () => {
  return (
    <ContentsContainer>
      <ChatList />
      <MainChat />
    </ContentsContainer>
  );
};

const ContentsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default Contents;
