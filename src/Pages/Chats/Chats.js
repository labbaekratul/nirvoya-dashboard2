import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import undrawMessages from "../../Asset/undraw_messages.svg";
import Breadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import HeaderPart from "../../Component/HeaderPart/HeaderPart";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import styles from "./Chats.module.css";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  // user effect
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient("https://nirvoya.herokuapp.com/");
      setSocket(sk);
      sk.emit("onLogin", {
        _id: adminInfo._id,
        name: adminInfo.firstName,
        isAdmin: adminInfo.isAdmin,
      });

      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });

      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });

      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users, adminInfo]);

  // select chat user
  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit("onUserSelected", user);
  };
  // send message
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      allMessages = [
        ...allMessages,
        {
          body: messageBody,
          name: adminInfo.firstName,
          isAdmin: adminInfo.isAdmin,
        },
      ];
      setMessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: adminInfo.firstName,
          isAdmin: adminInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  const totalUser = users.filter((x) => x._id !== adminInfo._id).length;

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <div className="row">
                <Breadcrumb title="Chats" url="/chat/create"></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg">
                  <div className="row" style={{ height: "80vh" }}>
                    <div className={`col-3 ${styles.chatUserListBG}`}>
                      <div className="py-4 position-relative">
                        <form className="formStyle">
                          <div
                            className={`d-flex align-items-center ${styles.chatSearch}`}
                          >
                            <AiOutlineSearch className="me-2 fs-5" />
                            <input
                              type="text"
                              placeholder="Search"
                              className="form-control"
                            />
                          </div>
                        </form>

                        <div className="text-center mt-2">
                          <span>
                            {totalUser < 2 ? totalUser - 1 : totalUser - 1}{" "}
                            contact
                          </span>
                          <div className="mt-4">
                            {/* chat user list */}
                            {users
                              .filter((x) => x._id !== adminInfo._id)
                              .map((user, index) =>
                                user.name ? (
                                  <div
                                    className={`d-flex align-items-center ${
                                      selectedUser._id === user._id
                                        ? styles.chatUserSelect
                                        : ""
                                    } ${styles.chatUserList}`}
                                    onClick={() => selectUser(user)}
                                    key={index}
                                  >
                                    <div className={`${styles.userChatImage}`}>
                                      {user.image ? (
                                        <img
                                          src={user.image.url}
                                          alt="user name"
                                          className="me-3"
                                        />
                                      ) : (
                                        <img
                                          src="https://randomuser.me/api/portraits/men/4.jpg"
                                          alt="user name"
                                          className="me-3"
                                        />
                                      )}

                                      <span
                                        className={`${
                                          user.online
                                            ? styles.userChatActive
                                            : styles.userChatInActive
                                        }`}
                                      ></span>
                                    </div>
                                    <div>
                                      <h5>{user.name}</h5>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-9 position-relative">
                      {!selectedUser._id ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className={`${styles.undrawMessages}`}
                            src={undrawMessages}
                            alt="message"
                          />
                        </div>
                      ) : (
                        <div>
                          {/* message header */}
                          <div className="p-3">
                            <div
                              className={`d-flex align-items-center ${styles.userMessageHeader}`}
                            >
                              <img
                                src="https://randomuser.me/api/portraits/women/17.jpg"
                                alt="user name"
                              />
                              <div className="ms-3">
                                <h4>{selectedUser.name}</h4>
                                <div className="position-relative">
                                  <p className="ms-3">Online</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* message body */}
                          <div
                            className={`${styles.messageBody}`}
                            ref={uiMessagesRef}
                          >
                            <div className="px-4">
                              {selectedUser.name}
                              {/* user message */}
                              {messages.map((mg, index) => (
                                <div
                                  className={`d-flex align-items-center mb-3 ${
                                    mg.isAdmin === false
                                      ? styles.userMessageBody
                                      : styles.adminMessageBody
                                  }`}
                                  key={index}
                                >
                                  {!mg.isAdmin && (
                                    <img
                                      src="https://randomuser.me/api/portraits/women/17.jpg"
                                      alt="User Name"
                                      className="me-3"
                                    />
                                  )}

                                  <span>{mg.body}</span>

                                  {mg.isAdmin && (
                                    <img
                                      src={adminInfo.image.data.url}
                                      alt="User Name"
                                      className="ms-3"
                                    />
                                  )}
                                </div>
                              ))}

                              {/* admin message */}
                              {/* <div
                            className={`d-flex align-items-center mb-3 justify-content-end ${styles.adminMessageBody}`}
                          >
                            <span>Pellentesque ac bibendum tortor</span>
                            <img
                              src="https://randomuser.me/api/portraits/women/17.jpg"
                              alt="User Name"
                              className="ms-3"
                            />
                          </div> */}
                            </div>
                          </div>
                          {/* send button */}
                          <div className="px-3 pb-3">
                            <form
                              onSubmit={submitHandler}
                              className={`${styles.sendMessageBtn} d-flex`}
                            >
                              <button type="button">
                                <AttachFileIcon />
                              </button>
                              {/* input */}
                              <input
                                type="text"
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                placeholder="Type a message"
                              />
                              <button type="button">
                                <SentimentVerySatisfiedIcon />
                              </button>
                              <button type="submit">
                                <SendIcon />
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
