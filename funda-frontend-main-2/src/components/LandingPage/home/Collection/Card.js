// import CollectionOne from "./images/CollectionOne.svg";
import "./card.css";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Image1 from "./images/1.png";
import Image2 from "./images/2.jpg";
import Image3 from "./images/3.jpg";
import Image4 from "./images/4.jpg";
import Image5 from "./images/5.jpg";
import Image6 from "./images/6.jpg";
import Image7 from "./images/7.jpg";
import Image8 from "./images/8.jpg";
import Image9 from "./images/9.jpg";
import Image10 from "./images/10.jpg";
const Card = ({ subcat, products, productImage }) => {
  const history = useHistory();
  // const [tags, settags] = useState({
  //   tagName: subcat?.tagName,
  //   tagimage: "",
  // });
  // useEffect(() => {
  //   let tagimage = products?.find((proddata) =>
  //     proddata?.productTags.find((tagdt) => tagdt == subcat?.tagName)
  //   )?.productImage[0];
  //   settags({ ...tags, tagimage: tagimage });
  // }, [products]);
  // console.log(subcat);
  return (
    <Link to={`/collection/${subcat.tagName}`}>
      <div className="container_collections">
        <div className="content_collections">
          <a>
            <div className="content-overlay_collections"></div>
            <img
              className="content-image_collections"
              src={productImage}
              alt=""
            />
            <div className="content-details_collections fadeIn-bottom_collections"></div>
          </a>
        </div>
      </div>
    </Link>
  );
};

export default Card;
