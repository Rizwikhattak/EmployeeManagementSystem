import React, { useContext, useEffect, useState } from "react";
import ChatBar from "./chatbar"; // Ensure this import path is correct
import { BsFillChatFill } from "react-icons/bs";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Form,
  Badge,
  Card,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [chatType, setChatType] = useState(null); // 'individual' or 'group'
  const [employees, setEmployees] = useState([]);
  const [Managers, setManagers] = useState([]);

  const { userId } = useContext(AuthContext);

  // Fetch the list of users (employees and managers)
  useEffect(() => {
    if (userId) {
      fetch("http://localhost/cafevista/Modules/getAllUsers.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const managers = [];
            const employees = [];
            for (let i = 0; i < data.users.length; i++) {
              if (data.users[i].role === "manager") {
                managers.push(data.users[i]);
              } else {
                employees.push(data.users[i]);
              }
            }
            setEmployees(employees);
            setManagers(managers);
          } else {
            console.error("Failed to fetch users");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [userId]);

  // Function to fetch messages from the server
  const fetchMessages = () => {
    if (activeChat) {
      fetch("http://localhost/cafevista/Modules/getMessages.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender_id: userId, receiver_id: activeChat.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setChats(data.messages);
          } else {
            console.error("Failed to fetch messages");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Set up polling interval to fetch messages
  useEffect(() => {
    fetchMessages(); // Initial fetch when activeChat changes

    const interval = setInterval(() => {
      fetchMessages(); // Fetch messages every 2 seconds
    }, 2000); // Polling interval in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeChat, userId]);

  // Function to send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        sender_id: userId,
        receiver_id: activeChat.id,
        message: newMessage,
      };

      fetch("http://localhost/cafevista/Modules/sendMessage.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setChats([
              ...chats,
              { ...messageData, id: Date.now(), sent_at: new Date() },
            ]);
            setNewMessage("");
          } else {
            console.error("Failed to send message");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Function to delete a message
  const handleDeleteMessage = (id) => {
    fetch("http://localhost/cafevista/Modules/deleteMessage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setChats(chats.filter((chat) => chat.id !== id));
        } else {
          console.error("Failed to delete message");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle chat click
  const handleChatClick = (user, type) => {
    setActiveChat(user);
    setChatType(type);
  };

  return (
    <Container
      fluid
      className="chat-app d-flex flex-column overflow-y-scroll"
      style={{ height: "100vh", background: "#003135" }}
    >
      <Row className="bg-gradient text-white p-3 shadow-lg rounded-bottom">
        <Col>
          <h2>Chat Application</h2>
        </Col>
        <Col className="text-end">
          <BsFillChatFill size={30} />
        </Col>
      </Row>
      <Row className="flex-grow-1 d-flex">
        <Col
          md={3}
          className="border-end p-3 bg-[#003135] text-white shadow-sm rounded-start"
        >
          <h5 className="mb-3">Employees</h5>
          <ListGroup className="mb-3">
            {employees.map((user, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleChatClick(user, "individual")}
                className="d-flex align-items-center rounded-pill mb-2 shadow-sm bg-light"
              >
                <FaUserCircle size={30} className="me-2 text-primary" />
                {user.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mb-3">Managers</h5>
          <ListGroup>
            {Managers.map((user, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleChatClick(user, "group")}
                className="d-flex align-items-center rounded-pill mb-2 shadow-sm bg-light"
              >
                <FaUserCircle size={30} className="me-2 text-primary" />
                {user.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col
          md={9}
          className="d-flex flex-column p-3 bg-[#003135] rounded-end shadow-sm"
        >
          {activeChat && (
            <>
              <Card className="chat-header bg-gradient text-white mb-2 shadow-sm rounded">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaUserCircle size={30} className="me-2" />
                    {activeChat.username}
                  </div>
                  <div className="ms-auto">
                    <Badge bg="light" text="dark">
                      {activeChat.username}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
              <div className="chat-container flex-grow-1 overflow-auto mb-3 bg-light rounded p-2 shadow-sm">
                {chats.map((chat) => (
                  <Card className="mb-2 shadow-sm" key={chat.id}>
                    <Card.Body
                      className={`d-flex justify-content-between align-items-center ${
                        chat.sender_id == userId ? "bg-success" : "bg-info"
                      } text-white rounded`}
                    >
                      <div>{chat.message}</div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteMessage(chat.id)}
                      >
                        🗑️
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              <div className="mt-auto">
                <ChatBar
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSendMessage={handleSendMessage}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
