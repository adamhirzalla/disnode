import axios from "axios";

// send new message to server
export const sendMessage = async (channelId, message) => {
  try {
    const res = await axios.post(
      `/api/channels/${channelId}/messages`,
      message
    );
    // TODO: remove return (handle render with sockets)
    return res.data;
  } catch (e) {
    console.log("Failed to retreive message data", e);
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const res = await axios.delete(`/api/channels/messages/${messageId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to delete message", e);
  }
};

// stretch - get other messages when user scroll up to the top
export const getMessages = async () => {
  console.log("get old messages");
  const mockOldMessages = [
    {
      id: 22,
      sender_nickname: "Learth",
      sender_avatar:
        "https://proofmart.com/wp-content/uploads/2021/06/3-web-1.png",
      sender_id: 3,
      body: "This is an old message 11111",
      sent_at: "2021-12-28T08:29:11.241Z",
    },
    {
      id: 23,
      sender_nickname: "smart lad",
      sender_avatar:
        "https://proofmart.com/wp-content/uploads/2021/06/7web.png",
      sender_id: 2,
      body: "This is an old message 22222",
      sent_at: "2021-12-28T08:29:11.241Z",
    },
    {
      id: 24,
      sender_nickname: "EavanK",
      sender_avatar: "https://proofmart.com/wp-content/uploads/2021/06/1-1.png",
      sender_id: 1,
      body: "This is an old message 33333",
      sent_at: "2021-12-28T08:29:11.241Z",
    },
  ];
  return mockOldMessages;

  // try {
  //   const res = await axios.post(`/api/servers/${}`);
  //   const messages = res.data;
  //   return messages;
  //   // const sio = await import("../socket/index");
  //   // console.log("Started a socket:", sio);
  // } catch (e) {
  //   console.log("Failed to retreive server data", e);
  // }
};
