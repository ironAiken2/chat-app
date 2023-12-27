import styled from "styled-components";
import { useState } from "react";

const ChatSender = ({ ws }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.nativeEvent.isComposing) return;
      sendMessage(inputValue);
    }
  };
  const sendMessage = (message) => {
    ws.send(message);
    setInputValue("");
  };
  return (
    <ChatSenderWrapper>
      <ChatSenderInput
        placeholder="메세지를 입력하세요."
        onChange={handleInputValue}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <ChatSenderButton onClick={() => sendMessage(inputValue)}>
        전송
      </ChatSenderButton>
    </ChatSenderWrapper>
  );
};

const ChatSenderWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  margin: 20px 30px 20px 30px;
`;
const ChatSenderInput = styled.input`
  flex: 8;
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 10px;
  border-right: 1px solid #d3d8d7;
`;
const ChatSenderButton = styled.button`
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export default ChatSender;
