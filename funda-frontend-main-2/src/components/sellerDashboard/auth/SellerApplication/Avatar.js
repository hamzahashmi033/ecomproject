import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getAsset } from "../../../../utils/helpers";

export default function ImageAvatars({ sellerSignUp }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Not Found"
        src={getAsset(sellerSignUp?.profile_picture)}
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  );
}
