import Slider from "react-slick";
import Card from "./Card";
import "./style.css";
import { Link } from "react-router-dom";
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
const index = ({ mobileprods }) => {
  var settings = {
    loop: true,
    infinite: mobileprods.length <= 5 ? false : true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: mobileprods.length <= 3 ? false : true,
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
    <Slider {...settings}>
      {mobileprods?.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`/single-product/${item._id}`}>
              <Card mobileprods={item} />
            </Link>
          </div>
        );
      })}
    </Slider>
  );
};
export default index;
