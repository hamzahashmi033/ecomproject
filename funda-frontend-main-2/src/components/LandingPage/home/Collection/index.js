import Typography from "@mui/material/Typography";
import Card from "./Card";
import { useRef } from "react";
import image1 from "./images/1.png";
import image10 from "./images/2.jpg";
import image4 from "./images/3.jpg";
import image6 from "./images/4.jpg";
import image3 from "./images/5.jpg";
import image7 from "./images/6.jpg";
import image5 from "./images/7.jpg";
import image9 from "./images/8.jpg";
import image8 from "./images/9.jpg";
import image2 from "./images/10.jpg";
const Index = ({ tags, products }) => {
  const count = useRef(-1);

  const imagestags = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ fontWeight: "bold", color: "#4D4D4D" }}
        pt={{ xs: 0, sm: 7, md: 7 }}
        pb={{ xs: 0, sm: 2, md: 2 }}
      >
        Collections
      </Typography>

      {/* {tags?.map((dt, dtIndx) =>
        products.some((proddt) =>
          proddt.productTags?.some((dttag) => dt.tagName == dttag)
        ) && dtIndx > 5 ? (
          <Card
            subcat={dt}
            products={products}
            productImage={imagestags[dtIndx]}
          />
        ) : null
      )} */}
      {tags?.map((dt, dtindx) => {
        if (
          tags?.findIndex((tagdt) => tagdt?.tagName == "Deals on Watches") <=
            dtindx &&
          tags?.findIndex((tagdt) => tagdt?.tagName == "Travelling Packs") >=
            dtindx
        ) {
          count.current += 1;
          return (
            <Card
              subcat={dt}
              products={products}
              productImage={imagestags[count.current]}
            />
          );
        }
        if (tags?.findIndex((tagdt) => tagdt?.tagName == "Travelling Packs")) {
          count.current = -1;
        }
      })}
    </>
  );
};

export default Index;
