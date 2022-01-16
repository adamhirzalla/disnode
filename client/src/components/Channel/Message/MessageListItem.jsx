import React from "react";
import { Box, Avatar, Typography, Grid, List } from "@mui/material";
import { useMessageListSytle } from "../../styles/useMessageListSytle";

export default function MessageListItem(props) {
  const classes = useMessageListSytle();
  const { onClick, sender, body, sent_at } = props;

  return (
    <Grid container alignItems="center" sx={{ height: 400 }}>
      <Grid xs={1.2} item sx={{ height: "80%" }}>
        <Box className={classes.avatar}>
          <Avatar
            alt={sender.name}
            src={sender.avatar}
            sx={{ width: 40, height: 40, mt: 1 }}
          />
          <Typography>{sender.name}</Typography>
        </Box>
      </Grid>
      <Grid xs={"auto"} item>
        <List sx={{ maxWidth: 700 }}>
          <Typography
            className={classes.messages}
            variant="body1"
            display="block"
          >
            {body}
          </Typography>
        </List>
      </Grid>
    </Grid>
  );
}

{
  /* <Typography
  className={classes.messages}
  variant="body1"
  display="block"
>
  {msg}
</Typography> */
}

// <Grid container alignItems="center" sx={{ height: 400 }}>
// <Grid xs={1.2} item sx={{ height: "80%" }}>
//   <ListItemText
//     align={side}
//     primary={
//       <Box className={classes.avatar}>
//         <Avatar
//           alt={name}
//           src={img}
//           sx={{ width: 40, height: 40, mt: 1 }}
//         />
//         <Typography>{name}</Typography>
//       </Box>
//     }
//   />
// </Grid>
// <Grid xs={"auto"} item>
//   <List id="chat-windows-messages" sx={{ maxWidth: 900 }}>
//     <ListItemText primary={msg} align={side}></ListItemText>
//   </List>
// </Grid>
// </Grid>
