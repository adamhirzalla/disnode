import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const testData = [
  {
    id: 1,
    name: "FPS",
    selected: false,
  },
  {
    id: 2,
    name: "MOBA",
    selected: false,
  },
  {
    id: 3,
    name: "MMORPG",
    selected: false,
  },
];

export default function ToggleTagGroup() {
  // selected
  const [tags, setTags] = useState([]);

  // need state that holds all tags from db
  let tagsFromDatabase = [
    {
      id: 1,
      name: "FPS",
    },
    {
      id: 2,
      name: "MOBA",
    },
    {
      id: 3,
      name: "MMORPG",
    },
  ];

  // const grabTags = () => {
  //   axios.get("/api/tags", {}).then((res) => {
  //     if (res.status === 200) {
  //       console.log("RESPONSE", response);

  //       // if the tags are in an object, turn obj => arr before assigning to tagsFromDatabase
  //       tagsFromDatabase = res.data;
  //     }
  //   });
  // };

  const handleTags = (event, newTags) => {
    setTags(newTags);
  };

  const parsedTags = tagsFromDatabase.map((data) => {
    return (
      <ToggleButton disableRipple value={data.name} aria-label={data.name}>
        {data.name}
      </ToggleButton>
    );
  });
  return (
    <ToggleButtonGroup value={tags} onChange={handleTags}>
      {parsedTags}
    </ToggleButtonGroup>
  );
}

// scheduler save func
// function bookInterview(id, interview) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview },
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment,
//   };

//   return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
//     setState({ ...state, appointments });
//     updateSpots();
//   });
// }

// // for handling errors
// const [error, setError] = useState(null);
// // in the form for creating a server
// const handleSubmit = () => {
//   const body = {
//     title: serverName,
//     image: imageUrl,
//     creatorId: creatorId,
//   };

//   // need to look up syntax for axios post calls
//   axios.post("/api/servers/create", body).then((res) => {
//     if (res.status === 200) {
//       // redirect to the new server home channel (i.e. #general)
//     } else {
//       setError('Server creation failed. Please try again later.')
//     }
//   });
// };

// return (
//   <form></form>

//   // conditionally show the error under the form
//   {error && <Alert severity="error">{error}</Alert>}
// )
