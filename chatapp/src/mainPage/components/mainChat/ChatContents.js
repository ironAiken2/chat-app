import styled from "styled-components";
import { useEffect, useRef } from "react";

const ChatContents = ({ messages }) => {
  const scrollEndRef = useRef(null);
  useEffect(() => {
    scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <ContentWrapper>
      {messages.map((message, index) => {
        return (
          <TextBoxWrapper key={index}>
            <TextBox>{message}</TextBox>
          </TextBoxWrapper>
        );
      })}
      <div ref={scrollEndRef} />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
  padding: 20px 30px 20px 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TextBoxWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  width: fit-content;
  margin-bottom: 10px;
  border-radius: 10px 10px 10px 0;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: fit-content;
  max-width: 300px;
`;

export default ChatContents;
