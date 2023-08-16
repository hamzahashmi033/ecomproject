import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categotyReducer";
import changeEmailReducer from "./changeEmailReducer";
import changePasswordReducer from "./changePasswordReducer";
import productReducer from "./productReducer";
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subCategoryReducer";
import tagReducer from "./tagReducer";
import userReducer from "./userReducer";
import wishlistReducer from "./wishlistReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";
import bannerReducer from "./bannerReducer";
import voucherReducer from "./voucherReducer";
import searchProductReducer from "./searchedReducer";
import { sellerAnalyticsReducer } from "./sellerAnalytics";
import getallblogs from "./blogs";
import getdeals from "./dealsReducer";
import getUsersAnalytic from "./userAnalyticReducer";
// import { getUsersAnalytic } from "../_actions/adminActions";
import sellerProductReducer from "./sellerProductReducer";
export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  changeEmail: changeEmailReducer,
  changePassword: changePasswordReducer,
  orders: orderReducer,
  tag: tagReducer,
  review: reviewReducer,
  product: productReducer,
  sellerProduct: sellerProductReducer,
  brand: brandReducer,
  wishlist: wishlistReducer,
  banner: bannerReducer,
  voucher: voucherReducer,
  searchingProduct: searchProductReducer,
  analyticsSeller: sellerAnalyticsReducer,
  getallblogs: getallblogs,
  getUsersAnalytic: getUsersAnalytic,
  getdeals: getdeals,
});
