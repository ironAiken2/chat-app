import styled from "styled-components";
import ChatContents from "./ChatContents";
import ChatSender from "./ChatSender";
import { useState, useEffect } from "react";
import fetchSession from "./utils/fetchSession";

// my text bg color : 329993
// text color : FFFFFF
const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    fetchSession(setSessionId);
  }, []);

  useEffect(() => {
    // 세션 아이디 의존성 추가
    if (!sessionId) return;
    // WebSocket 연결
    const newWs = new WebSocket("ws://localhost:8080/chat");
    setWs(newWs);
    // 연결 성공 시 콘솔에 출력
    newWs.onopen = () => {
      console.log("connected to server");
    };
    // 메시지 수신 시 state 업데이트
    newWs.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((m) => [...m, newMessage]);
    };

    // 브라우저 종료 및 새로고침 시 연결 종료
    window.addEventListener("beforeunload", () => {
      newWs.send(false);
      newWs.close();
    });
  }, [sessionId]);

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

export default MainChat;
