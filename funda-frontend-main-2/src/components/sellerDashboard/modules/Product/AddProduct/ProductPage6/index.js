import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./index.css";
import RightIcon from "../../../../../../assets/Righticon.svg";
import Star from "../../../../../../assets/Star.svg";
import { getBrand } from "../../../../../../redux/_actions/brandAction";

import { Input } from "antd";

const Productcategory = (props) => {
  const { brand, setbrand } = props;
  const dispatch = useDispatch();
  const { categoryId, setCategoryId } = props;
  const brandList = useSelector((state) => state?.brand.brands?.data);
  const [filterSubcat, setfilterSubcat] = useState("all");

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="md">
        <h1>Select a Product Brand</h1>
        <p>
          Choosing the best product type that you see the most appropriate data
          fields for your product. Browser the product types or juse search.
          <span>See if your product already exists on Funda.</span>
        </p>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
              className="product_heading"
            >
              <div>
                <p className="browser">Browser</p>
              </div>
              {/* <p className="product"> What is a Product Type?</p> */}
              <div>
                <Input
                  size="middle"
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setfilterSubcat(e.target.value);
                    } else {
                      setfilterSubcat("all");
                    }
                  }}
                  placeholder="Search Brand"
                />
              </div>
            </div>
          </Grid>
          {brandList?.map(({ _id, brandName }) =>
            filterSubcat === "all" ? (
              <Grid item xs={12} sm={12}>
                <div
                  className={`category_content ${
                    _id === brand ? `selected-category` : ""
                  }`}
                  onClick={() => setbrand(_id)}
                >
                  <div className="category_content_appliance">
                    <img src={Star} width={25} />
                    <h1 key={_id} value={_id}>
                      {brandName}
                    </h1>
                  </div>
                  <div className="category_content_ricon">
                    <img src={RightIcon} width={15} />
                  </div>
                </div>
              </Grid>
            ) : (
              brandName
                .trim()
                .toLowerCase()
                .replace(/\s/g, "")
                .match(filterSubcat.trim().toLowerCase().replace(/\s/g, "")) !=
                null && (
                <Grid item xs={12} sm={12}>
                  <div
                    className={`category_content ${
                      _id === brand ? `selected-category` : ""
                    }`}
                    onClick={() => setbrand(_id)}
                  >
                    <div className="category_content_appliance">
                      <img src={Star} width={25} />
                      <h1 key={_id} value={_id}>
                        {brandName}
                      </h1>
                    </div>
                    <div className="category_content_ricon">
                      <img src={RightIcon} width={15} />
                    </div>
                  </div>
                </Grid>
              )
            )
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Productcategory;
