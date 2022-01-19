import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  bio: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    height: "100%",
    marginTop: "2em",
    textAlign: "center",
    color: "#FFF",
  },
  userName: {},
}));

export default function DisTypography(props) {
  //props destructure
  const { disStyle, children, component, variant, ...rest } = props;

  //styles
  const classes = useStyles();

  //dynamic classname
  const typographyClass = classNames(classes.root, {
    [classes.bio]: disStyle === "bio",
    [classes.userName]: disStyle === "userName",
  });

  return (
    <Typography
      variant={variant}
      component={component}
      className={typographyClass}
      {...rest}
    >
      {children}
    </Typography>
  );
}
