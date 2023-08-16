import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { useState } from "react";
const BrowseBYCategory = ({
  subcategoryProdFilter,
  setsubcategoryProdFilter,
  subcategoryFilteredIds,
  allsubcategories,
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
                fontSize: "15px",
                fontWeight: "bolder",
              }}
            >
              Browse By Subcategory
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

          {bool
            ? allsubcategories.map(
                (allcat, allcatindx) =>
                  subcategoryFilteredIds.some(
                    (filterId) => allcat._id == filterId
                  ) && (
                    <>
                      <div
                        className="topping"
                        style={{ textAlign: "left", padding: "7px 0px" }}
                      >
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            id={allcatindx}
                            name="topping"
                            value={allcat._id}
                            onClick={(e) => {
                              let clone = subcategoryProdFilter.slice(0);

                              let dupIndx = clone.indexOf(e.target.value);
                              if (dupIndx == -1) {
                                clone.push(e.target.value);

                                setsubcategoryProdFilter(clone);
                                window.scroll({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              } else {
                                clone.splice(dupIndx, 1);

                                setsubcategoryProdFilter(clone);
                              }
                            }}
                          />
                          {"   "}
                          {allcat?.subCategoryName}
                        </label>
                      </div>
                      <Divider />
                    </>
                  )
              )
            : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseBYCategory;
