import classNames from "classnames";
import Button from "@mui/material/Button";

//import styles
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

export default function DisButton(props) {
  //props destructure
  const { children, disStyle, ...rest } = props;

  //styles
  const classes = useDisButtonStyles();

  //dynamic classname
  const buttonClass = classNames(classes.root, {
    [classes.submit]: disStyle === "submit",
    [classes.create]: disStyle === "create",
    [classes.cancel]: disStyle === "cancel",
  });

  return (
    <Button className={buttonClass} {...rest}>
      {children}
    </Button>
  );
}
