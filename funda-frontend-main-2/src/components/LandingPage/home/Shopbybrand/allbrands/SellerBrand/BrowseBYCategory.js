import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import Avatar from "./Avatar.js";
import Divider from "@mui/material/Divider";
const BrowseBYCategory = (props) => {
  const {
    category,
    subcategories,
    setcategory,
    categoryProd,
    setsubcategoryProd,
    subcategoryProd,
  } = props;

  let [bool, setbool] = useState(false);

  return (
    <div>
      <Card
        sx={{ minWidth: 275, border: "2px solid #c4c4c5", marginTop: "42px" }}
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
                fontSize: "15px",
                fontWeight: "bolder",
              }}
            >
              BROWSE BY CATEGORY
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ textAlign: "left" }}
            >
              {bool == false ? (
                <IconButton onClick={() => setbool(true)}>
                  <AddBoxIcon style={{ fontSize: "1.3rem" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => setbool(false)}>
                  <IndeterminateCheckBoxIcon style={{ fontSize: "1.3rem" }} />
                </IconButton>
              )}
            </Typography>
          </div>
          <Divider />
          <br />

          {bool ? (
            <>
              <div
                className="topping"
                style={{ textAlign: "left", padding: "3px 0px" }}
              >
                <label
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <input
                    type="checkbox"
                    id="all"
                    name="topping"
                    style={{ marginRight: "4px" }}
                    value="Paneer"
                    onClick={() => {
                      for (let i = 0; i < category.categories.length; i++) {
                        document.getElementById(i).checked = false;
                      }
                      document.getElementById("all").checked = true;
                      setcategory("");
                    }}
                  />
                  {"  "}All categories
                </label>
              </div>
              <Divider />

              {category.categories.map((cat, catind) => (
                <>
                  <div
                    className="topping"
                    style={{ textAlign: "left", padding: "3px 0px" }}
                  >
                    <label
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={catind}
                        name="topping"
                        value={cat._id}
                        style={{ marginRight: "4px" }}
                        onClick={(e) => {
                          document.getElementById("all").checked = false;

                          for (let i = 0; i < category.categories.length; i++) {
                            document.getElementById(i).checked = false;
                          }
                          document.getElementById(e.target.id).checked = true;

                          setcategory(e.target.value);
                        }}
                      />

                      {"  "}
                      {cat?.categoryName}
                    </label>
                  </div>
                  <Divider />
                </>
              ))}
            </>
          ) : null}

          <div className="result"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseBYCategory;
