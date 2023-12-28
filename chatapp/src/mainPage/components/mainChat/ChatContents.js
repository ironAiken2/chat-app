import styled from "styled-components";
import { useEffect, useRef } from "react";

const ChatContents = ({ messages, id }) => {
  const scrollEndRef = useRef(null);
  useEffect(() => {
    scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
  });
  // todo : styled-components props 전달 로직 수정 (간결화)
  return (
    <ContentWrapper>
      {messages.map((message, index) => {
        return (
          <TextBoxWrapper
            key={index}
            sender={message["session_id"]}
            receiver={id}
          >
            <TextBox sender={message["session_id"]} receiver={id}>
              {message["message"]}
            </TextBox>
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
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.sender === props.receiver ? "flex-end" : "flex-start"};
`;
//329993
//ffffff
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.sender === props.receiver ? "#329993" : "#ffffff"};
  color: ${(props) =>
    props.receiver === props.sender ? "#ffffff" : "#000000"};
  width: fit-content;
  max-width: 300px;
  padding: 10px;
  border-radius: 10px 10px 10px 0;
`;

export default ChatContents;
