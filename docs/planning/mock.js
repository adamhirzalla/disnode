// respone from logging in
// -> '/servers' (we have userId from jwt)
[
  {
    id: 1,
    logo: "http://",
  },
  {
    id: 2,
    logo: "http://",
  },
  {
    id: 3,
    logo: "http://",
  },
][
  // response from clicking a server from ServerList - for example server with id 1
  // -> '/servers/:id' (we have userId from jwt + serverId)
  {
    id: 1,
    title: "Server",
    logo: "http://",
    invite_code: "qasdx123",
    tags: [" ", " ", " "],
    members: [
      {
        user_id: 1,
        nickname: "",
        avatar_url: "http://",
        is_active: true,
      },
      {
        user_id: 2,
        nickname: "",
        avatar_url: "http://",
        is_active: true,
      },
    ],
    channels: [
      {
        id: 3,
        title: "",
        messages: [
          {
            id: 4,
            sender_id: 1,
            sender_nickname: "",
            sender_avatar_url: "http://",
            body: "",
            sent_at: "",
          },
          {
            id: 6,
            sender_id: 3,
            sender_nickname: "",
            sender_avatar_url: "http://",
            body: "",
            sent_at: "",
          },
        ],
      },
    ],
  }
];
