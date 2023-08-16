import Breadcrumb from "./BreadCrumb";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog, getBlog } from "../../../../../redux/_actions/postBlog";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Blogimage from "./images/Blogimage.jpg";
import Grid from "@mui/material/Grid";
import Loader from "../../../../loader";
import Header from "../../../Layout/header/index";
import { getUser } from "../../../../../redux/_actions/userAction";
import "./style.css";
import WhatsAppButton from "../../../../FLoatingButtons/WhatsAppButton";
import { getAsset } from "../../../../../utils/helpers";

const Index = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state?.getallblogs);
  const getUsers = useSelector((state) => state?.user?.users);

  useEffect(() => {
    dispatch(getSingleBlog(params?.id));
    dispatch(getUser());
  }, [dispatch]);

  if (blog?.loading || blog?.single_blog?.loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      {/* <div className="BlogArticle_parent"> */}
      <Grid container sx={{ marginTop: "150px" }}>
        <Grid item lg={10} sm={11} xs={11}>
          <Breadcrumb crumb={blog?.single_blog?.single_blog} />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            className="category_title"
            marginTop={1}
          >
            {blog?.single_blog.single_blog?.catagory}
          </Typography>

          <Typography variant="h5" gutterBottom component="div">
            {blog?.single_blog?.single_blog?.title}
          </Typography>
          <div>
            <Typography variant="caption" display="block" marginBottom={1}>
              By {getUsers?.map((dt) => dt?.role == "admin" && dt?.fullName)}
            </Typography>
          </div>

          <div className="BlogImage_container">
            <img src={getAsset(blog?.single_blog?.single_blog?.image[0])} />
          </div>
          <Typography variant="caption" display="block" marginTop={3}>
            {blog?.single_blog?.single_blog?.description}
          </Typography>
          <div>
            {blog?.Blogs?.filter(
              (dt) => dt.catagory == blog?.single_blog?.single_blog?.catagory
            )?.map((filterData, indx) => (
              <>
                {indx == 0 &&
                  filterData?._id != blog?.single_blog?.single_blog?._id && (
                    <div className="relatedarticles_parent">
                      <Typography
                        variant="button"
                        display="block"
                        className="relatedarticles"
                      >
                        Related Articles
                      </Typography>
                    </div>
                  )}
                {filterData?._id != blog?.single_blog?.single_blog?._id && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <ImageList cols={1}>
                        <ImageListItem>
                          <img src={filterData?.image[0]} loading="lazy" />
                        </ImageListItem>
                      </ImageList>
                    </Grid>
                    <Grid item xs={12} sm={8} marginTop={2}>
                      <Typography variant="subtitle1" component="div">
                        {filterData?.title}
                      </Typography>

                      <Typography variant="caption" display="block">
                        {filterData?.description}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </>
            ))}
          </div>
        </Grid>
      </Grid>
      <WhatsAppButton />

      {/* </div> */}
    </>
  );
};

export default Index;
