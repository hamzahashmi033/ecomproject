import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { Image } from "antd";
import { Grid } from "@mui/material";
import { getAsset } from "../../../../utils/helpers";
const FilterSubCat = ({ subCategory, Category, products }) => {
  const [cat, setcat] = useState("");
  const [prodImage, setprodImage] = useState("");

  const observer = new MutationObserver((mutationList, o) => {
    mutationList.forEach((muta) => {
      console.log("Muta: ", muta);
      if (muta.type === "attributes" && muta.attributeName === "class") {
        if (muta?.target?.className !== "") {
          setcat(muta?.target?.className);
        }
      }
    });
  });

  useEffect(() => {
    observer.observe(document?.getElementById("getid"), {
      attributes: true,
    });
  }, []);

  return (
    <div id="getid" onMouseLeave={() => setprodImage("")}>
      <Grid container justifyContent="left">
        <Grid item lg={4}>
          {subCategory
            .filter((dt) => (cat ? dt?.categoryId == cat : dt))
            .map(
              (catNam, catNamInd) =>
                catNamInd + 1 <= 3 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",

                      backgroundColor: "#f1f1f1",
                      marginBottom: "5px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize={18}
                      color={"#6e6e6e"}
                      sx={{
                        textTransform: "capitalize",

                        pt: 0,
                        width: "100%",
                      }}
                      marginTop={1}
                      marginLeft={3}
                      marginRight={3}
                      marginBottom={1}
                      component="div"
                      onMouseOver={() => setprodImage("")}
                    >
                      {catNam.subCategoryName}
                    </Typography>
                    {products
                      .filter((dt) => dt?.productSubCategory == catNam?._id)
                      .map(
                        (filtrDt, filtrIndx) =>
                          filtrIndx <= 2 && (
                            <>
                              <Link to={`/single-product/${filtrDt?._id}`}>
                                <Typography
                                  variant="body2"
                                  fontSize={14}
                                  color={"#6e6e6e"}
                                  textAlign="left"
                                  className="prodname"
                                  marginLeft={3}
                                  marginRight={3}
                                  marginBottom={1}
                                  component="div"
                                  onMouseOver={() =>
                                    setprodImage(filtrDt?.productImage[0])
                                  }
                                >
                                  {filtrDt?.productName}
                                </Typography>
                              </Link>
                              <Link
                                to={`/category/${cat}`}
                                onMouseOver={() => setprodImage("")}
                              >
                                {filtrIndx == 2 && (
                                  <Typography
                                    variant="body2"
                                    fontSize={14}
                                    color={"#6e6e6e"}
                                    textAlign="left"
                                    className="prodname"
                                    marginTop={1}
                                    marginLeft={3}
                                    marginRight={3}
                                    marginBottom={1}
                                    component="div"
                                  >
                                    View All
                                  </Typography>
                                )}
                              </Link>
                            </>
                          )
                      )}
                  </div>
                )
            )}
        </Grid>

        <Grid item lg={7} sx={{ mx: 1 }}>
          {prodImage && (
            <Image
              preview={false}
              width={420}
              height={"100%"}
              src={getAsset(prodImage)}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default FilterSubCat;
