import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Slider } from "antd";
import { style } from "@mui/system";
import "./price.css";
const BrowseBYPrice = ({
  allUsers,
  sellrSelected,
  setsellrSelected,
  setPrice,
  price,
}) => {
  let [bool, setbool] = useState(false);
  return (
    <div>
      <Card
        sx={{ minWidth: 275, border: "2px solid #c4c4c5", marginTop: "30px" }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              style={{
                textAlign: "left",
                fontSize: "12px",
                fontWeight: "bolder",
              }}
            >
              PRICE RANGE
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ textAlign: "left" }}
            ></Typography>
          </div>

          <Divider />
          <br />

          {!bool ? (
            <Slider
              className="sliderSS"
              range
              max={1000000}
              min={100}
              step={100}
              tooltipVisible={true}
              getTooltipPopupContainer={() =>
                document.querySelector(".ant-slider-step")
              }
              defaultValue={price}
              trackStyle={[{ backgroundColor: "#D97C29" }]}
              onAfterChange={(e) => {
                setPrice(e);
              }}
              handleStyle={[{ borderColor: "#D97C29" }]}
            />
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" textAlign="left">
              Rs.100
            </Typography>
            <Typography variant="body2" textAlign="right">
              Rs.10,00,000
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseBYPrice;
