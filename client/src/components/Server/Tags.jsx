import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Tags({ setTags, serverTags }) {
  // const parseTags = (tags) => {
  //   setTags(tags.map((tag) => tag.id));
  // };

  return (
    <Autocomplete
      multiple
      id="server-tags"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(tag) => tag.name}
      defaultValue={serverTags || []}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(e, value) => setTags(value)}
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
