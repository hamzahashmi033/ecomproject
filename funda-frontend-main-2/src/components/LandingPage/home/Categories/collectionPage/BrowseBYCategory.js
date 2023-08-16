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
    setcategory,
    categoryProd,
    selectedCategory,
    setselectedCategory,
    currLoc,
  } = props;

  let [bool, setbool] = useState(false);

  useEffect(() => {
    setbool(true);
  }, [categoryProd]);
  useEffect(() => {
    if (currLoc == "all") {
      setbool(true);
    }
  }, [currLoc]);
  return (
    <div>
      <Card
        sx={{ width: "100%", border: "2px solid #c4c4c5", marginTop: "42px" }}
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
          {/* <br /> */}

          {bool ? (
            <>
              <div
                className="topping"
                style={{ textAlign: "left", padding: "3px 0px" }}
              >
                {currLoc == "all" && (
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
                      value="Paneer"
                      style={{ marginRight: "4px" }}
                      // defaultChecked={true}
                      defaultChecked={
                        categoryProd == "all" || categoryProd == ""
                          ? true
                          : false
                      }
                      onClick={() => {
                        for (let i = 0; i < category.categories.length; i++) {
                          document.getElementById(i).checked = false;
                        }
                        document.getElementById("all").checked = true;
                        setcategory("all");
                      }}
                    />
                    {"  "}All categories
                  </label>
                )}
                {currLoc != "all" && (
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      id="all"
                      name="topping"
                      value="Paneer"
                      style={{ marginRight: "4px" }}
                      onClick={() => {
                        for (let i = 0; i < category.categories.length; i++) {
                          document.getElementById(i).checked = false;
                        }
                        document.getElementById("all").checked = true;
                        setcategory("all");
                      }}
                      defaultChecked={
                        categoryProd == "all" || categoryProd == ""
                          ? true
                          : false
                      }
                    />
                    {"  "}All categories
                  </label>
                )}
              </div>
              <Divider />

              {category.categories.map((cat, catind) => (
                <div key={catind}>
                  <div
                    className="topping"
                    style={{ textAlign: "left", padding: "3px 0px" }}
                  >
                    {categoryProd == cat?._id && (
                      <label
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <>
                          <input
                            type="checkbox"
                            id={catind}
                            name="topping"
                            value={cat._id}
                            style={{ marginRight: "4px" }}
                            defaultChecked={
                              categoryProd == cat?._id ? true : false
                            }
                            onClick={(e) => {
                              setselectedCategory("");
                              document.getElementById("all").checked = false;

                              for (
                                let i = 0;
                                i < category.categories.length;
                                i++
                              ) {
                                document.getElementById(i).checked = false;
                              }

                              setcategory(e.target.value);
                              document.getElementById(
                                e.target.id
                              ).checked = true;
                            }}
                          />
                        </>

                        {"  "}
                        {cat?.categoryName}
                      </label>
                    )}
                    {categoryProd != cat?._id && (
                      <label
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <>
                          <input
                            type="checkbox"
                            id={catind}
                            name="topping"
                            value={cat._id}
                            defaultChecked={false}
                            style={{ marginRight: "4px" }}
                            onClick={(e) => {
                              setselectedCategory("");
                              document.getElementById("all").checked = false;

                              for (
                                let i = 0;
                                i < category.categories.length;
                                i++
                              ) {
                                document.getElementById(i).checked = false;
                              }
                              document.getElementById(
                                e.target.id
                              ).checked = true;
                              setcategory(e.target.value);
                            }}
                          />
                        </>

                        {"  "}
                        {cat?.categoryName}
                      </label>
                    )}
                  </div>
                  <Divider />
                </div>
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
