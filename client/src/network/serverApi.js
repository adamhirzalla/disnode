import axios from "axios";

// get all of the server user has joined
export const getServers = async () => {
  try {
    const res = await axios.post("/api/servers");
    const servers = res.data;
    return servers;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive servers data", e);
  }
};

// get all of the data for a server
export const getServer = async (serverId) => {
  try {
    const res = await axios.post(`/api/servers/${serverId}`);
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive server data", e);
  }
};

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
