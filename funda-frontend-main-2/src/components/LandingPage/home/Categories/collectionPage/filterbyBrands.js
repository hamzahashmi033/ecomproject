import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const BrowseBYBrands = ({
  subcategoryProdFilter,
  setsubcategoryProdFilter,
  subcategoryFilteredIds,
  allsubcategories,
  allUsers,
  sellrSelected,
  setsellrSelected,
}) => {
  let [bool, setbool] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.brandId) {
      setbool(true);
    }
  }, []);
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
              FILTER BY BRANDS
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

          {
            // params?.sellerId
            //   ?
            bool
              ? allUsers?.map((allcat, allcatindx) => (
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
                          defaultChecked={
                            sellrSelected?.find((dt) => dt == allcat?._id)
                              ? true
                              : false
                          }
                          onClick={(e) => {
                            let clone = sellrSelected.slice(0);

                            let dupIndx = clone.indexOf(e.target.value);
                            if (dupIndx == -1) {
                              clone.push(e.target.value);

                              setsellrSelected(clone);
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            } else {
                              clone.splice(dupIndx, 1);

                              setsellrSelected(clone);
                            }
                          }}
                        />
                        {"   "}
                        {allcat?.brandName}
                      </label>
                    </div>
                    <Divider />
                  </>
                ))
              : null
            // : params?.brandId && bool
            // ? allUsers?.map((allcat, allcatindx) => (
            //     <>
            //       <div
            //         className="topping"
            //         style={{ textAlign: "left", padding: "7px 0px" }}
            //       >
            //         <label style={{ cursor: "pointer" }}>
            //           <input
            //             type="checkbox"
            //             id={allcatindx}
            //             name="topping"
            //             value={allcat._id}
            //             defaultChecked={
            //               sellrSelected?.find((dt) => dt == allcat?._id)
            //                 ? true
            //                 : false
            //             }
            //             onClick={(e) => {
            //               let clone = sellrSelected.slice(0);

            //               let dupIndx = clone.indexOf(e.target.value);
            //               if (dupIndx == -1) {
            //                 clone.push(e.target.value);

            //                 setsellrSelected(clone);
            //                 window.scroll({
            //                   top: 0,
            //                   left: 0,
            //                   behavior: "smooth",
            //                 });
            //               } else {
            //                 clone.splice(dupIndx, 1);

            //                 setsellrSelected(clone);
            //               }
            //             }}
            //           />
            //           {"   "}
            //           {allcat?.brandName}
            //         </label>
            //       </div>
            //       <Divider />
            //     </>
            //   ))
            // : null
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseBYBrands;
