import { Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function UserForm(props) {
  const { input, setInput } = props;
  const {
    state: { user },
  } = useContext(AuthContext);
  const { avatar, full_name, nickname, bio } = user;

  return (
    <Grid container columnSpacing={12} rowSpacing={4}>
      <Grid item xs={6}>
        <TextField
          autoFocus
          type="text"
          variant="outlined"
          label="Full Name"
          placeholder={full_name}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, full_name: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="text"
          variant="outlined"
          label="Nickname"
          placeholder={nickname}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, nickname: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          variant="outlined"
          label="Bio"
          placeholder={bio}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, bio: e.target.value }))
          }
          size="large"
          multiline
          rows="3"
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
