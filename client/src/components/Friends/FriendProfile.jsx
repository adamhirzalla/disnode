import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function FriendProfile() {
  return (
    <Card
      sx={{
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "1em",
      }}
    >
      <Avatar />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          HyunnyK
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Hyunsu Kim
        </Typography>
        <Typography variant="body2" color="text.secondary">
          [Bio] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          ut dapibus urna. Morbi consectetur vel nisl maximus lobortis.
          Phasellus ornare elit diam, vel egestas tellus dignissim id.
          Suspendisse potenti. Donec feugiat maximus nisi quis congue. Aliquam
          erat volutpat. Aliquam erat volutpat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Aliquam
          finibus convallis eros, eu mattis risus malesuada vehicula.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Message</Button>
        <Button size="small">Remove</Button>
      </CardActions>
    </Card>
  );
}
