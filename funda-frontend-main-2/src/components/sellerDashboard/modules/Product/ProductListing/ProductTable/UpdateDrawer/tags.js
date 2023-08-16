import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";

import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";
// Import Swiper styles
import "swiper/components/pagination/pagination.min.css";

import Swiper from "react-id-swiper";

import SwiperCore, { Pagination } from "swiper";

import "./styl.scss";
import Productdetails from "../../../AddProduct/ProductPage3";
import { getTag } from "../../../../../../../redux/_actions/tagAction";

// install Swiper modules

SwiperCore.use([Pagination]);
const { Option } = Select;

// *****************************************

// *****************************************

export default function TagsCategory({ defaultCategories, tagsList }) {
  function handleChange(value) {
  
  }
  return (
    <>
    
      <div className="input-label">Product Tags</div>

      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={defaultCategories}
        onChange={handleChange}
      >
        {defaultCategories.map((defaultCategory, i) =>
          tagsList.map(
            (tagsdata) =>
              defaultCategory != tagsdata.tagName && (
                <Option key={tagsdata.tagName}>{tagsdata.tagName}</Option>
              )
          )
        )}
      </Select>
      <br />
    </>
  );
}
