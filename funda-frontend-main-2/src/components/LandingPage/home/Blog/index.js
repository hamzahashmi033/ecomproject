import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./style.css";
import { getBlog } from "../../../../redux/_actions/postBlog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/header";
import Loader from "../../../loader";
import { Link } from "react-router-dom";
import Footer from "../../../customer/PaymentPage/Checkout/Footer";
import Newsletter from "../../../customer/PaymentPage/Checkout/Newsletter";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import WhatsAppButton from "../../../FLoatingButtons/WhatsAppButton";
import { getAsset } from "../../../../utils/helpers";
const Index = () => {
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state?.getallblogs);
  const [blogsrender, setblogsrender] = useState([]);
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  useEffect(() => {
    let clone = [];
    for (let i = 0; i < allBlogs?.Blogs?.length; i += 1) {
      const chunk = allBlogs?.Blogs?.slice(i, i + 1);
      clone.push(chunk);
    }

    setblogsrender(clone);
  }, [allBlogs]);
  if (allBlogs?.loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <Grid container sx={{ marginTop: "150px", marginBottom: "50px" }}>
        <Grid item lg={11}>
          <Typography variant="h4" component="div" gutterBottom>
            Blogs
          </Typography>
        </Grid>
        <Grid item lg={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="row">
                {blogsrender?.map((dt, dtIndx) => (
                  <div className="column">
                    {dt.map((dtdata, indx) => (
                      <Link to={`/blog/${dtdata?._id}`}>
                        <div className="containerEffect">
                          <img
                            src={getAsset(dtdata?.image[0])}
                            alt="Avatar"
                            className="imageeffect"
                          />
                          <div className="middleeffect">
                            <Typography
                              variant="button"
                              display="block"
                              className="texteffect_heading"
                            >
                              {dtdata?.catagory}
                            </Typography>
                            <div className="texteffect">{dtdata?.title}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
      <Newsletter />
      <Footer2 />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
