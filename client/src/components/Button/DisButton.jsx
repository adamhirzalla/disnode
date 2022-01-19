import classNames from "classnames";
import Button from "@mui/material/Button";

//import styles
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

export default function DisButton(props) {
  //props destructure
  const { children, type, ...rest } = props;

  //styles
  const classes = useDisButtonStyles();

  //dynamic classname
  const buttonClass = classNames(classes.root, {
    [classes.submit]: type === "submit",
    [classes.create]: type === "create",
    [classes.cancel]: type === "cancel",
    [classes.closeDialog]: type === "closeDialog",
  });

  return (
    <Button className={buttonClass} {...rest}>
      {children}
    </Button>
  );
}
