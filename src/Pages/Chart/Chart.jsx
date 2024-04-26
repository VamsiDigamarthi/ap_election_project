import React, { useEffect, useRef, useState } from "react";
import "./Chart.css";
import { IoSearch } from "react-icons/io5";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { MdOutlineSend } from "react-icons/md";
// import InputEmoji from "react-input-emoji";
const Chart = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [scoredUser, setScoreUser] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const [specificChartStore, setSpecificChartStore] = useState([]);

  const [receiverId, setReceiverId] = useState(null);

  const [allMessagesData, setAllMessagesData] = useState([]);

  const scoreUser = () => {
    APIS.get(`/district/score-user/${UUU[0]?.district}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setScoreUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    scoreUser();
  }, []);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const onChatUserClick = (id) => {
    // console.log(id);
    // chart created api
    setReceiverId(id);
    APIS.post(
      "/chat/create-chat",
      {
        sender: UUU[0]?.id,
        received: id,
      },
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        // setScoreUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // chart created end

    // get the chart id
    APIS.get(`/chat/get-chat/sender/${UUU[0]?.id}/receiver/${id}`, {
      headers: headers,
    })
      .then((res) => {
        setSpecificChartStore(res.data);
        // setScoreUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSendMessageFun = () => {
    APIS.post(
      "/chat/send-message",
      {
        chartID: specificChartStore[0]?.id,
        sender: UUU[0]?.id,
        text: newMessage,
      },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setNewMessage("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("input value change");
    APIS.get(`/chat/all-messages/${specificChartStore[0]?.id}`, {
      headers: headers,
    })
      .then((res) => {
        setAllMessagesData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [newMessage, specificChartStore]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessagesData]);

  return (
    <div className="chat__main__card">
      <div className="chat__left__side__card">
        <div className="chat__user__details__input__card">
          <input
            // onChange={onInputChangeWithName}
            type="text"
            placeholder="Enter User Name"
          />
          <div>
            <IoSearch color="#fff" size="25" />
          </div>
        </div>
        <div className="chart__all__users__display__card">
          {scoredUser?.map((each, key) => (
            <div
              key={key}
              className="chat__single__user"
              onClick={() => onChatUserClick(each?.id)}
            >
              <div className="dot__user"></div>
              <img
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                alt=""
              />
              <div>
                <h5>{each.name}</h5>
                <span>{each.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat__right__side__card">
        <div className="chart__header">
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            alt=""
          />
          <div>
            <span>Name</span>
            <span>online</span>
          </div>
        </div>
        <div className="chart__main__body">
          {allMessagesData.map((each) => (
            <div
              ref={scroll}
              className={`message  ${each.sender_id !== UUU[0]?.id && "own"} `}
            >
              <span>{each.text}</span> <span>{each.created}</span>
            </div>
          ))}
        </div>
        <div className="chat-sender">
          <div className="plus__card">+</div>
          {/* <InputEmoji value={newMessage} onChange={handleChange} /> */}
          <div onClick={onSendMessageFun} className="message__send__btn">
            <MdOutlineSend />
          </div>
          <input type="file" name="" id="" style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
