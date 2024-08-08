import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const ChatBar = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className="chat-bar-popup show shadow-lg rounded">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="rounded-pill p-2"
        />
        <Button
          variant="primary"
          onClick={handleSendMessage}
          className="rounded-pill"
        >
          Send
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChatBar;
