import { Avatar, DialogActions, Grid, Typography } from "@mui/material";
import DisButton from "../Button/DisButton";

export default function SearchedServer({ server, setServer }) {
  const handleJoin = () => {
    setServer([]);
  };
  console.log(1);
  return (
    <>
      <Avatar alt={server.title} src={server.logo} />
      <Typography>{server.title}</Typography>
    </>
  );
}
