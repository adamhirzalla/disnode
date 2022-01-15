import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Tags() {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={tags}
      getOptionLabel={(option) => option.name}
      // defaultValue={[top100Films[1]]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Tags"
          placeholder="Select Tags!"
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tags = [
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
  {
    id: 4,
    name: "RTT",
  },
  {
    id: 5,
    name: "RPG",
  },
  {
    id: 6,
    name: "Indie",
  },
  {
    id: 7,
    name: "RTS",
  },
];
