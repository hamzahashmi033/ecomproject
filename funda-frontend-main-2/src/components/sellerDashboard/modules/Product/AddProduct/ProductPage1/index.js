import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./index.css";
import { getCategory } from "../../../../../../redux/_actions/categoryAction";
import RightIcon from "../../../../../../assets/Righticon.svg";
import Star from "../../../../../../assets/Star.svg";
import { Select, Input } from "antd";
const ProductBrand = (props) => {
  const category = useSelector((state) => state.category);
  const [filterSubcat, setfilterSubcat] = useState("all");

  const dispatch = useDispatch();
  const { categoryId, setCategoryId } = props;

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="md">
        <h1>Select a Product Category</h1>
        <p>
          Choosing the best product type that you see the most appropriate data
          fields for your product. Browser the product types or juse search.
          <span>See if your product already exists on Funda.</span>
        </p>
        <Grid container>
          <Grid item xs={12} sm={12} sx={{ pr: 1 }}>
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
                  placeholder="Search Category"
                />
              </div>
            </div>
          </Grid>
          {category.categories?.map(({ _id, categoryName }) =>
            filterSubcat == "all" ? (
              <Grid item xs={12} sm={12}>
                <div
                  className={`category_content ${
                    _id === categoryId ? `selected-category` : ""
                  }`}
                  onClick={() => setCategoryId(_id)}
                >
                  <div className="category_content_appliance">
                    <img src={Star} width={25} />
                    <h1 key={_id} value={_id}>
                      {categoryName}
                    </h1>
                  </div>
                  <div className="category_content_ricon">
                    <img src={RightIcon} width={15} />
                  </div>
                </div>
              </Grid>
            ) : (
              categoryName
                .trim()
                .toLowerCase()
                .replace(/\s/g, "")
                .match(filterSubcat.trim().toLowerCase().replace(/\s/g, "")) !=
                null && (
                <Grid item xs={12} sm={12}>
                  <div
                    className={`category_content ${
                      _id === categoryId ? `selected-category` : ""
                    }`}
                    onClick={() => setCategoryId(_id)}
                  >
                    <div className="category_content_appliance">
                      <img src={Star} width={25} />
                      <h1 key={_id} value={_id}>
                        {categoryName}
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

export default ProductBrand;
