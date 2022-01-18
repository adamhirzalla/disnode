import classNames from "classnames";
import React from "react";

//import styling
import { useDisImgStyles } from "../styles/useDisImgStyles";

export default function DisImg(props) {
  //props destructuring
  const { type, url, ...rest } = props;

  //styling
  const classes = useDisImgStyles();

  //dynamic class names
  const imgClass = classNames(classes.root, {
    [classes.home]: type.home,
  });

  return <img alt={type} src={url} className={imgClass} {...rest} />;
}
