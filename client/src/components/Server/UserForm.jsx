import { Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function UserForm() {
  const [value, setValue] = useState();
  const {
    state: { user },
  } = useContext(AuthContext);
  const { avatar, full_name, nickname, bio } = user;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Grid container columnSpacing={12} rowSpacing={4}>
      <Grid item xs={6}>
        <TextField
          autoFocus
          type="text"
          variant="outlined"
          label="Full Name"
          placeholder={full_name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="text"
          variant="outlined"
          label="Nickname"
          placeholder={nickname}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          variant="outlined"
          label="Bio"
          placeholder={bio}
          onChange={handleChange}
          size="large"
          multiline
          rows="3"
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
