import classNames from "classnames";
import React from "react";

//import styling
import { useDisImgStyles } from "../styles/useDisImgStyles";

export default function DisImg(props) {
  //props destructuring
  const { disStyle, src, alt, ...rest } = props;

  //styling
  const classes = useDisImgStyles();

  //dynamic class names
  const imgClass = classNames(classes.root, {
    [classes.home]: disStyle === "home",
  });

  return <img alt={alt} src={src} className={imgClass} {...rest} />;
}
