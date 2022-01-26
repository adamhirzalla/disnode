import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import YoutubeSvg from "../SvgIcons/YoutubeSvg";
import TwitchSvg from "../SvgIcons/TwitcnSvg";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function UserConnection() {
  const [link, setLink] = useState("");
  const [url, setUrl] = useState("");

  const handleSelect = (e) => {
    setLink(e.target.value);
  };

  const handleAdd = () => {
    console.log(link, url);
    setLink("");
    setUrl("");
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ marginTop: "25px" }}
    >
      <Grid item xs={2}>
        <FormControl sx={{ width: "100px", height: "100px" }}>
          <InputLabel id="demo-simple-select-label">Link</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={link}
            label="Link"
            onChange={handleSelect}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 225,
                  width: 120,
                },
              },
            }}
            sx={{ marginTop: "5px" }}
          >
            <MenuItem
              value={"Steam"}
              sx={{ justifyContent: "center", height: "50px", width: "50px" }}
            >
              <SteamSvg />
            </MenuItem>
            <MenuItem
              value={"Twitch"}
              sx={{ justifyContent: "center", height: "50px", width: "50px" }}
            >
              <TwitchSvg />
            </MenuItem>
            <MenuItem
              value={"Youtube"}
              sx={{ justifyContent: "center", height: "50px", width: "50px" }}
            >
              <YoutubeSvg />
            </MenuItem>
            <MenuItem
              value={"Twitter"}
              sx={{ justifyContent: "center", height: "50px", width: "50px" }}
            >
              <TwitterSvg />
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={9}>
        <TextField
          type="text"
          variant="standard"
          label="URL"
          placeholder="URL"
          value={url}
          onChange={handleChange}
          size="large"
          sx={{ width: "90%", marginBottom: "10px" }}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton color="success" onClick={handleAdd}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
