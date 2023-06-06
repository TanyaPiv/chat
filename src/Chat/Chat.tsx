import React, {useState, useEffect} from 'react';
import styled from './Chat.module.scss';
import ChatArea from './ChatArea';
import MessageSender from './MessageSender';
import { useParams } from 'react-router-dom';

export type IMessages = {
  text: string,
  type: string,
};

const ChatPage = () => {
  const {phone} = useParams();
  const newPhone = phone?.replace("+", "");
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [idInstance, setIdInstance] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if(userJson) {
      const user = JSON.parse(userJson);

      setIdInstance(user.idInstance);
      setApiTokenInstance(user.apiTokenInstance);
    }
  }, [])

  const sendMessage = async (data:any) => {
    try {
      await fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: "POST",
        body: JSON.stringify({
          "chatId": `${newPhone}@c.us`,
          "message": data.text
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      setMessages((prevState) => prevState.concat({
        text: data.text,
        type: "send"
      }));
    } catch (error) {
      console.error(error)
    }
  };

  const getMessage = async () => {
    try {
      const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
      const result = await res.json();
      setReceiptId(result.receiptId);
      const typeWebhook = result.body.typeWebhook;
  
      if(result.body.senderData?.chatId.replace("@c.us", "") === newPhone && typeWebhook === "outgoingMessageReceived" && result.body.messageData.textMessageData?.textMessage) {
        setMessages((prevState) => prevState.concat({
          text: result.body.messageData.textMessageData?.textMessage,
          type: "get"
        }));
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    const fn = async () => {
      try {
        await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
          method: "DELETE"
        })
      } catch ({message}: any) {
        console.error(message)
      }
    }

    if (receiptId) {
      fn()
    }

    console.log(messages, 'messages');
  }, [receiptId])

  useEffect(() => {
    let timeOut:any;
    if (apiTokenInstance && idInstance) {
      timeOut = setInterval(() => {
        getMessage();
      }, 10000)
    }
    return () => {
      clearInterval(timeOut);
    }
  }, [idInstance, apiTokenInstance]);

  return (
    <div className={styled.pageContainer}>
      <ChatArea messages={messages}/>
      {phone ? <MessageSender sendMessage={sendMessage}/> : null}
    </div>
  )

};

export default ChatPage;