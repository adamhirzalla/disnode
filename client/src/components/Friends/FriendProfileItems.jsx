import { makeStyles } from "@mui/styles";
import React from "react";
import DisIconButton from "../Button/DisIconButton";

export default function FriendProfileItems(props) {
  const { children } = props;
  return <DisIconButton type="connections">{children}</DisIconButton>;
}
