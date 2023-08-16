import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TabNavigation from "./TabNavigations";
import Header from "../../../admin/pages/LayoutAdminDashboard/header";
import Footer from "../../../user/partails/footer";
import OrderHeader from "./Header/index";
import { useDispatch, useSelector } from "react-redux";

import "./index.css"
import {
  getOrderForUsers,
  getOrdersForSeller,
} from "../../../../redux/_actions/orderAction";
import QuickFilters from "./QuickFilters";
import Grid from "@mui/material/Grid";
import LeftPortion from "./LeftSection/index";
import RightSection from "./RightSection";
import { getProduct } from "../../../../redux/_actions/productAction";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../../LandingPage/home/Collection/Newsletter";
import DataOrderTable from "./ordertable/DataOrderTable";
const ManageOrder = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).user?.id;
  const orders = useSelector((state) => state.orders.orders);
  const product = useSelector((state) => state.product?.products?.data);
  const [sellerItems, setSellerItems] = useState([]);

  useEffect(() => {
    dispatch(getOrdersForSeller(userId));
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section className="manageorder">
       
          <OrderHeader />

          
          <div className="table_wrapper">
            <Grid container spacing={3} sx={{p:3,}}>
              <DataOrderTable
                orders={orders}
                sellerItems={sellerItems}
                products={product}
              />
            </Grid>
          </div>
      
      </section>
      <Footer1 />
      <NewsLetter />

      <Footer2 />
    </div>
  );
};

export default ManageOrder;
