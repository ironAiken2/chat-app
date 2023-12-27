import styled from "styled-components";
import ChatContents from "./ChatContents";
import ChatSender from "./ChatSender";
import { useState, useEffect } from "react";

const MainChat = () => {
  const [messages, setMessages] = useState([
    "안녕하세요",
    "반갑습니다",
    "안녕하세요",
  ]);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    // WebSocket 연결
    const newWs = new WebSocket("ws://0.0.0.0:8080/chat");
    setWs(newWs);

    newWs.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((m) => [...m, newMessage]);
    };

    (() => {
      window.addEventListener("beforeunload", () => {
        newWs.send(false);
        newWs.close();
      });
    })();
  }, []);
  return (
    <MainChatContainer>
      <ChatContents messages={messages} />
      <ChatSender ws={ws} />
    </MainChatContainer>
  );
};

const MainChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;
// 빨강 컬러 코드 : #ff0000
// 파랑 컬러 코드 : #0000ff

export default MainChat;
