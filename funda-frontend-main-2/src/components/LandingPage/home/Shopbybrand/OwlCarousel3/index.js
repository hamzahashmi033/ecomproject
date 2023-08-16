import Slider from "react-slick";
import Card from "./Card";
import "./style.css";

function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char = props.type === "next" ? "" : "";
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}

function customPaging(i) {
  return <span>{i + 1}</span>;
}

function appendDots(dots) {
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <ul style={{ margin: "3px" }}> {dots} </ul>
    </div>
  );
}

const index = ({ allusers, allProducts }) => {
  var settings = {
    infinite: allusers.length <= 5 ? false : true,
    // allusers.filter((dt) => dt.role == "seller")?.length <= 5 ? false : true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: allusers.length <= 3 ? false : true,
          // infinite:
          //   allusers.filter((dt) => dt.role == "seller")?.length <= 3
          //     ? false
          //     : true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {allusers?.map(
          (item, index) => (
            // item.role == "seller" && (
            <div key={index}>
              <Card item={item} allProducts={allProducts} />
            </div>
          )
          // )
        )}
      </Slider>
    </div>
  );
};
export default index;
