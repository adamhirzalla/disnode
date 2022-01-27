import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Tags({ setTags, serverTags, setSearch, search }) {
  // serverTags for editing server || [] for creating server
  const [tag, setTag] = useState(serverTags || []);

  const parseTags = (tags) => {
    setTags(tags.map((tag) => tag.id));

    // for searching servers by tags
    if (search) {
      setSearch((prev) => ({ ...prev, tags: tags.map((tag) => tag.id) }));
    }
  };

  const handleChange = (e, value) => {
    setTag(value);
    parseTags(value);
  };

  return (
    <Autocomplete
      multiple
      id="server-tags"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(tag) => tag.name}
      value={tag}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      renderOption={(props, tag, { selected }) => (
        <li {...props}>
          <Checkbox
            required
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {tag.name}
        </li>
      )}
      // style={{ width: "auto" }}
      renderInput={(serverTags) => (
        <TextField {...serverTags} label="Tags" placeholder="Server Tags" />
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
    name: "Casual",
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
    name: "Anime",
  },
];
