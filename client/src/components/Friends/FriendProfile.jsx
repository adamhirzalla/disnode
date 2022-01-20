import DisBox from "../Box/DisBox";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import SteamSvg from "../SvgIcons/SteamSvg";
import DisTypography from "../Box/DisTypography";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import {
  Avatar,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";

// const useStyles = makeStyles(() => ({
//   cardAction: {
//     width: "100%",
//   },
//   cardContent: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   card: {
//     maxWidth: 600,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: "2em",
//     minWidth: 550,
//     minHeight: 650,
//     // marginTop: "8em",
//     backgroundColor: "#68696b",
//     color: "#FFF",
//     // borderRadius: "0",
//   },
//   avatar: {
//     width: "5em",
//     height: "5em",
//   },
// }));

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 250,
    maxWidth: 300,
    minHeight: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: "60px",
    height: "60px",
  },
}));
const connectionsIcons = [
  <SteamSvg />,
  <TwitterSvg />,
  <RiotGamesSvg />,
  <EpicGamesSvg />,
];

export default function FriendProfile(props) {
  const { friend } = props;
  const classes = useStyles();

  const iconClasses = useDisIconButtonStyles();

  const icons = connectionsIcons.map((icon, i) => {
    return (
      <IconButton key={i} className={iconClasses.connections}>
        {icon}
      </IconButton>
    );
  });

  return (
    <>
      <Card className={classes.root}>
        <Avatar
          alt={friend.nickname}
          src={friend.img}
          className={classes.avatar}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="div">
            {friend.full_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            YO HMU if you into apex and shooting stuff
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </>
    // <Card className={classes.card}>
    //   <Avatar
    //     alt={friend.full_name}
    //     src={friend.img}
    //     className={classes.avatar}
    //   />
    //   <DisBox type="displayColumn">
    //     <CardContent className={classes.cardContent}>
    //       <DisTypography
    //         disStyle="userName"
    //         gutterBottom
    //         variant="h5"
    //         component="div"
    //       >
    //         {friend.username}
    //       </DisTypography>
    //       <DisTypography gutterBottom variant="h7" component="div">
    //         {friend.full_name}
    //       </DisTypography>
    //       <DisTypography type="bio" variant="body1" color="text.secondary">
    //         {friend.bio}
    //       </DisTypography>
    //     </CardContent>
    //     <CardActions className={classes.cardAction}>
    //       <DisBox disStyle="connections">{icons}</DisBox>
    //     </CardActions>
    //   </DisBox>
    // </Card>
  );
}
