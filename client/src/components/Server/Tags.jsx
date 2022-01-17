import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Tags({ setTags }) {
  const parseTags = (tags) => {
    setTags(tags.map((tag) => tag.id));
  };
  return (
    <Autocomplete
      multiple
      id="server-tags"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(tag) => tag.name}
      onChange={(e, value) => parseTags(value)}
      renderOption={(props, tag, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {tag.name}
        </li>
      )}
      // style={{ width: "auto" }}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="Server Tags" />
      )}
    />
  );
}

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
