import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function ImageAvatars(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Avatar
        alt="Remy Sharp"
        src={props.profpic}
        sx={{
          width: 56,
          height: 56,
          alignSelf: "flex-end",
        }}
      />
    </Stack>
  );
}
