import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../../../../../admin/pages/LayoutAdminDashboard/header/index";
import Footer from "../../../../../user/partails/footer";
import { getSubCategoryByCategoryId } from "../../../../../../redux/_actions/subCategoryAction";
import "../ProductPage1/index.css";
import RightIcon from "../../../../../../assets/Righticon.svg";
import Star from "../../../../../../assets/Star.svg";
import { getCategory } from "../../../../../../redux/_actions/categoryAction";
import { getSubCategory } from "../../../../../../redux/_actions/subCategoryAction";
import { Select, Input } from "antd";

const { Option } = Select;
const Productsubcategory = (props) => {
  const [filterSubcat, setfilterSubcat] = useState("all");
  const categoryBysubcategory = useSelector((state) => state?.subcategory);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSubCategory());
  // }, [dispatch]);

  return (
    <div>
      <Container maxWidth="md">
        <h1>Select a Product Sub Category</h1>
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
                paddingRight: 1,
              }}
              className="product_heading"
            >
              <div>
                <p className="browser">Browser</p>
              </div>

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
                  placeholder="Search Sub Category"
                />
              </div>
            </div>

            <h1>Select a sub category</h1>
            <div className="form-wrapper">
              <Grid container>
                {categoryBysubcategory?.subCategories?.map((subcat) =>
                  props?.category == subcat?.categoryId &&
                  filterSubcat === "all" ? (
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <div
                        className={`category_content ${
                          subcat._id === props?.subCategory
                            ? "selected-category"
                            : "" // subcat._id === subcat.categoryId
                        }`}
                        onClick={() => props.setSubCategoryId(subcat._id)}
                      >
                        <div className="category_content_appliance">
                          <img src={Star} width={25} />
                          <h1 key={subcat._id} value={subcat._id}>
                            {subcat.subCategoryName}
                          </h1>
                        </div>
                        <div className="category_content_ricon">
                          <img src={RightIcon} width={15} />
                        </div>
                      </div>
                    </Grid>
                  ) : (
                    props?.category == subcat?.categoryId &&
                    subcat.subCategoryName
                      .trim()
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .match(
                        filterSubcat.trim().toLowerCase().replace(/\s/g, "")
                      ) != null && (
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div
                          className={`category_content ${
                            subcat._id === props?.subCategory
                              ? "selected-category"
                              : "" // subcat._id === subcat.categoryId
                          }`}
                          onClick={() => props.setSubCategoryId(subcat._id)}
                        >
                          <div className="category_content_appliance">
                            <img src={Star} width={25} />
                            <h1 key={subcat._id} value={subcat._id}>
                              {subcat.subCategoryName}
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Productsubcategory;
