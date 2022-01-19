import axios from "axios";

// get all of the server user has joined
export const getServers = async () => {
  try {
    const res = await axios.get("/api/servers");
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

export const createServer = async (title, logo) => {
  try {
    const res = await axios.post(`/api/servers`, { title, logo });
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to create server ", e);
  }
};

export const createTags = async (tags, serverId) => {
  try {
    const res = await axios.put(`/api/servers/${serverId}/tags`, { tags });
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to create server ", e);
  }
};

// search server/servers with inviteCode or title
export const searchServer = async (server) => {
  const { title, inviteCode } = server;
  const mockServer = [
    {
      id: 1,
      title: "Apex Legends",
      logo: "https://www.citypng.com/public/uploads/preview/-51611829928qpmij8bqdr.png",
      inviteCode: "123",
    },
    {
      id: 2,
      title: "Valorant",
      logo: "https://image.pngaaa.com/480/5028480-middle.png",
      inviteCode: "123",
    },
    {
      id: 3,
      title: "League of Legends",
      logo: "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86",
      inviteCode: "123",
    },
    {
      id: 4,
      title: "Test",
      logo: "https://disnode.s3.amazonaws.com/1642543719360",
      inviteCode: 0,
    },
    {
      id: 5,
      title: "leaves",
      logo: "https://disnode.s3.amazonaws.com/1642544280311",
      inviteCode: "123",
    },
    {
      id: 6,
      title: "leaves",
      logo: "https://disnode.s3.amazonaws.com/1642544280311",
      inviteCode: "123",
    },
    {
      id: 7,
      title: "leaves",
      logo: "https://disnode.s3.amazonaws.com/1642544280311",
      inviteCode: "123",
    },
    {
      id: 8,
      title: "leaves",
      logo: "https://disnode.s3.amazonaws.com/1642544280311",
      inviteCode: "123",
    },
    {
      id: 9,
      title: "leaves",
      logo: "https://disnode.s3.amazonaws.com/1642544280311",
      inviteCode: "123",
    },
  ];
  const data = [];
  mockServer.forEach((ser) => {
    if (ser.title.toLowerCase() === title.toLowerCase()) data.push(ser);
    if (ser.inviteCode === inviteCode) data.push(ser);
  });
  console.log("data", data);
  return data;

  // try {
  //   const { title, inviteCode } = server;
  //   if (title) {
  //     const res = await axios.get(`api/servers/${title}`);
  //     const server = res.data;
  //     return server;
  //   }
  //   const res = await axios.get(`api/servers/${inviteCode}`);
  //   const server = res.data;
  //   return server;
  // } catch (e) {
  //   console.log("Failed to search server ", e);
  // }
};
