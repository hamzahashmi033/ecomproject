import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.css";

export default function SelectLabels({ sellerSignUp, setsellerSignUp }) {
  return (
    <div style={{ padding: "70px !important" }}>
      <FormControl
        sx={{
          width: "100% !important",
          padding: "0px !important",
        }}
      >
        <Select
          displayEmpty
          style={{
            padding: "0px !important",
          }}
        >
          <MenuItem value="facebook">
            <em>Facebook</em>
          </MenuItem>
          <MenuItem value="google">Google</MenuItem>
          <MenuItem value="news">News</MenuItem>
          <MenuItem value="instagram">Instagram</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
