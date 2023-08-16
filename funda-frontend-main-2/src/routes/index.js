import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPrivateRoute from "../components/admin/routing/privateroute";
import UserPrivateRoute from "../components/user/routing/privateRoute";
import UserAuthPrivateRoute from "../components/user/routing/authPrivateRoute";
import ErrorPage from "../components/404/index";
import Alerts from "../components/commonComponents/alert";
// USER ROUTES
import Login from "../components/user/auth/login/index";
import ForgetPassword from "../components/user/auth/forgetPassword/index";
import ResetPassword from "../components/user/auth/resetPassword/index";
import Signup from "../components/user/auth/signup/index";
import Home from "../components/LandingPage/home/index";
import ContactUs from "../components/user/pages/contactUs/index";
import AboutUs from "../components/user/pages/aboutUs/index";
import BecomeSeller from "../components/user/pages/becomeSeller/index";
import VerifyAccount from "../components/user/pages/verifyAccount/index";
import UserProfile from "../components/user/pages/profile/index";
import LoginSecurity from "../components/user/pages/loginSecurity";
// SELLER ROUTES
import SellerSignup from "../components/sellerDashboard/auth/signup/index";
// ADMIN ROUTES
//commit
import AdminDashboard from "../components/admin/pages/dashboard";
import AdminCategory from "../components/admin/pages/categoryPage/categoryList";
import AdminUsersView from "../components/admin/pages/customers/index";
// import AdminSellers from '../components/admin/pages/sellers/index';
import SellerPrivateRoute from "../components/sellerDashboard/routes/sellerprivateroute";
import SellerDashboard from "../components/sellerDashboard/dashboard";
import ManageOrder from "../components/sellerDashboard/modules/Seller";
import TagListing from "../components/admin/pages/tagsPage/tagListing";
import Product from "../components/admin/pages/productPage/productListing";
import ProductListingSeller from "../components/sellerDashboard/modules/Product/ProductListing";
import AddProduct from "../components/sellerDashboard/modules/Product/AddProduct/index";
import Productcategory from "../components/sellerDashboard/modules/Product/AddProduct/ProductPage1";
import Productsubcategory from "../components/sellerDashboard/modules/Product/AddProduct/ProductPage2";
import ProductDetails from "../components/sellerDashboard/modules/Product/AddProduct/ProductPage3";
import ProductImages from "../components/sellerDashboard/modules/Product/AddProduct/ProductPage4";
import DealPage from "../components/customer/TodayDealPage";
import BrandListing from "../components/admin/pages/BrandPages/BrandListing.js";
import ProductDetailsPage from "../components/customer/ProductDetails/index";
import CartDetailsPage from "../components/customer/CartDetails/CartDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/commonComponents/loader";
import { useEffect } from "react";
import { getProduct } from "../redux/_actions/productAction";
import PaymentPage from "../components/customer/PaymentPage";
import UserOrders from "../components/customer/UserOrders";
import Orders from "../components/admin/pages/order";
import ProductHome from "../components/ProductsHome/index";
import AdminBanner from "../components/admin/pages/BannerPage";
import VoucherPage from "../components/admin/pages/VoucherPage";
import Vouchers from "../components/vouchers";
import SearchProduct from "../components/LandingPage/searchedProducts/searchProducts";
import SellerBrand from "../components/seller/auth/sellerProfile/SellerBrand/SellerBrand";
import AllBrands from "../components/LandingPage/home/Shopbybrand/allbrands/SellerBrand/SellerBrand";
import AllMobEle from "../components/LandingPage/home/allmobandele/allbrands/SellerBrand/SellerBrand";

import Wishlist from "../components/commonComponents/allwishlist/Whishlist/Whishlist";
import TabPanel from "../components/sellerDashboard/auth/SellerApplication/Tabss";
import AdminBlogs from "../components/admin/pages/Blogs";
import ProductByTag from "../components/LandingPage/home/Collection/collectionPage/collection";
import ProductByCategorySelected from "../components/LandingPage/home/Categories/collectionPage/collection";
import SingleBlog from "../components/LandingPage/home/Blog/singleBlog/index";
import AllBlogs from "../components/LandingPage/home/Blog/index";
import AdminSales from "../components/admin/pages/Sales";
import ScrollToTop from "./scrollUp/scrollup";
import Fbpage from "../components/fbpage/Fbpage";
import AddSeller from "../components/admin/pages/AddSeller/AddSeller";
import OrdersReport from "../components/admin/pages/OrdersReport/index";
// import AddSeller from "../components/admin/pages/AddSeller/AddSeller";

const Routes = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  if (product.loading === true) {
    return <Loader />;
  }
  return (
    <>
      <Router>
        <Alerts />
        <ScrollToTop />
        <Switch>
          {/* CUSTOMER ROUTES */}
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/contactus" component={ContactUs} /> */}
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/retailer" component={AboutUs} />
          <Route exact path="/interior-design" component={AboutUs} />
          <Route exact path="/product-design" component={AboutUs} />
          <Route exact path="/sellers" component={AboutUs} />
          <Route exact path="/artisian" component={AboutUs} />
          <Route exact path="/price" component={AboutUs} />
          <Route exact path="/career" component={AboutUs} />
          <Route exact path="/events" component={AboutUs} />

          {/* <Route exact path="/blogs" component={AboutUs} /> */}
          <Route
            exact
            path="/products/subCategory/:subCategoryId"
            component={ProductHome}
          />
          <Route exact path="/vouchers" component={Vouchers} />
          <UserAuthPrivateRoute exact path="/profile" component={UserProfile} />
          <UserAuthPrivateRoute
            exact
            path="/loginsecurity"
            component={LoginSecurity}
          />
          <UserAuthPrivateRoute exact path="/orders" component={UserOrders} />
          <Route exact path="/today-deal" component={DealPage} />
          <Route
            exact
            path="/single-product/:productId"
            render={(props) => <ProductDetailsPage {...props} />}
            // component={ProductDetailsPage}
          />
          <Route exact path="/wish-list" component={Wishlist} />
          <Route exact path="/my-cart" component={CartDetailsPage} />
          <Route exact path="/Fbpage" component={Fbpage} />

          <Route exact path="/searchItems" component={SearchProduct} />
          <Route exact path="/becomeseller" component={BecomeSeller} />
          <Route exact path="/verifyaccount/:token" component={VerifyAccount} />
          <Route exact path="/checkout" component={PaymentPage} />
          <Route
            exact
            path="/seller-profile/:sellerId"
            component={SellerBrand}
          />
          <Route exact path="/brand/:brandId" component={SellerBrand} />
          <Route exact path="/all-brands" component={AllBrands} />
          <Route exact path="/electronic" component={AllMobEle} />
          <Route exact path="/mobile" component={AllMobEle} />

          <Route exact path="/blog/:id" component={SingleBlog} />
          <Route exact path="/blogs" component={AllBlogs} />
          <Route exact path="/collection/:tagname" component={ProductByTag} />
          <Route
            exact
            path="/category/:categoryid"
            component={ProductByCategorySelected}
          />
          <Route
            exact
            path="/category/all"
            component={ProductByCategorySelected}
          />
          <UserPrivateRoute exact path="/login" component={Login} />
          <UserPrivateRoute exact path="/signup" component={Signup} />
          <UserPrivateRoute
            exact
            path="/resetpassword/:token"
            component={ResetPassword}
          />
          <UserPrivateRoute exact path="/wish-list" component={Wishlist} />

          <UserPrivateRoute
            exact
            path="/forgetpassword"
            component={ForgetPassword}
          />
          {/* SELLER ROUTES */}
          {/* <UserPrivateRoute
            exact
            path="/sellersignup"
            component={SellerSignup}
          /> */}
          <UserPrivateRoute exact path="/sellersignup" component={TabPanel} />
          <UserPrivateRoute
            exact
            path="/seller-profile/:sellerId"
            component={SellerBrand}
          />
          <UserPrivateRoute
            exact
            path="/brand/:brandId"
            component={SellerBrand}
          />

          <UserPrivateRoute exact path="/all-brands" component={AllBrands} />
          <UserPrivateRoute exact path="/electronic" component={AllMobEle} />
          <UserPrivateRoute exact path="/mobile" component={AllMobEle} />
          <UserPrivateRoute exact path="/blog/:id" component={SingleBlog} />
          <UserPrivateRoute exact path="/blogs" component={AllBlogs} />

          <UserPrivateRoute
            exact
            path="/collection/:tagname"
            component={ProductByTag}
          />
          <UserPrivateRoute
            exact
            path="/category/:categoryid"
            component={ProductByCategorySelected}
          />
          <UserPrivateRoute
            exact
            path="/category/all"
            component={ProductByCategorySelected}
          />

          <SellerPrivateRoute exact path="/wish-list" component={Wishlist} />

          <SellerPrivateRoute
            exact
            path="/seller/dashboard"
            component={SellerDashboard}
          />
          <SellerPrivateRoute
            exact
            path="/seller-profile/:sellerId"
            component={SellerBrand}
          />
          <SellerPrivateRoute
            exact
            path="/brand/:brandId"
            component={SellerBrand}
          />

          <SellerPrivateRoute exact path="/all-brands" component={AllBrands} />
          <SellerPrivateRoute exact path="/electronic" component={AllMobEle} />
          <SellerPrivateRoute exact path="/mobile" component={AllMobEle} />
          <SellerPrivateRoute exact path="/blog/:id" component={SingleBlog} />
          <SellerPrivateRoute exact path="/blogs" component={AllBlogs} />

          <SellerPrivateRoute
            exact
            path="/collection/:tagname"
            component={ProductByTag}
          />
          <SellerPrivateRoute
            exact
            path="/category/:categoryid"
            component={ProductByCategorySelected}
          />
          <SellerPrivateRoute
            exact
            path="/category/all"
            component={ProductByCategorySelected}
          />
          <SellerPrivateRoute
            exact
            path="/seller/products"
            component={ProductListingSeller}
          />

          {/* <SellerPrivateRoute
            path="/seller/add-product"
            component={Productcategory}
          /> */}

          <SellerPrivateRoute
            path="/seller/add_product"
            component={AddProduct}
          />
          {/* 
          <SellerPrivateRoute
            path="/addproduct-page2"
            component={Productsubcategory}
          /> */}
          {/* 
          <SellerPrivateRoute path="/addproduct" component={ProductDetails} /> */}

          {/* <SellerPrivateRoute
            path="/addproductimages"
            component={ProductImages}
          /> */}

          <SellerPrivateRoute path="/seller/order" component={ManageOrder} />

          {/* ADMIN ROUTES */}
          <AdminPrivateRoute
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminPrivateRoute path="/admin/tags" component={TagListing} />
          <AdminPrivateRoute path="/admin/blog" component={AdminBlogs} />
          <AdminPrivateRoute path="/admin/add-deal" component={AdminSales} />
          <AdminPrivateRoute path="/admin/add-brand" component={BrandListing} />
          <AdminPrivateRoute path="/admin/add-seller" component={AddSeller} />
          <AdminPrivateRoute
            path="/admin/seller-orders-reports/:sellerId"
            component={OrdersReport}
          />

          <AdminPrivateRoute
            path="/admin/customers"
            component={AdminUsersView}
          />
          <AdminPrivateRoute path="/admin/sellers" component={AdminUsersView} />
          {/* <AdminPrivateRoute path="/admin/add-seller" component={AddSeller} /> */}
          {/* <AdminPrivateRoute path="/admin/sellers" component={AdminSellers} /> */}
          <AdminPrivateRoute path="/admin/products" component={Product} />
          <AdminPrivateRoute path="/admin/category" component={AdminCategory} />
          <AdminPrivateRoute path="/admin/orders" component={Orders} />
          <AdminPrivateRoute path="/admin/banners" component={AdminBanner} />
          <AdminPrivateRoute path="/admin/vouchers" component={VoucherPage} />
          {/* 404 PAGE ROUTE */}
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
};
export default Routes;
