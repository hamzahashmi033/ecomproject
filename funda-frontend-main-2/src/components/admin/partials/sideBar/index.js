import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/_actions/authAction";
import "./index.css";
const AdminSideBar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/").splice(-1)[0];

  function Logout() {
    dispatch(logout());
  }
  return (
    <section
      className={
        props.show === "show"
          ? " admin-panel-navbar-wrapper admin-panel-navbar-wrapper-show"
          : "admin-panel-navbar-wrapper"
      }
    >
      <div className="admin-panel-navbar">
        <ul className="nav-items">
          <li className={location === "dashboard" ? "selected" : ""}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className={location === "orders" ? "selected" : ""}>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li className={location === "products" ? "selected" : ""}>
            <Link to="/admin/products">Products </Link>
          </li>
          <li>
            <Link to="/admin/blog"> Blogs</Link>
          </li>
          <li>
            <Link to="/admin/add-deal"> Deals</Link>
          </li>
          <li>
            <Link to="/admin/add-brand"> Brands</Link>
          </li>
          <li className={location === "tags" ? "selected" : ""}>
            <Link to="/admin/tags">Tags</Link>
          </li>
          <li className={location === "vouchers" ? "selected" : ""}>
            <Link to="/admin/vouchers">Vouchers</Link>
          </li>
          <li className={location === "banners" ? "selected" : ""}>
            <Link to="/admin/banners">Sale Banners</Link>
          </li>
          <li className={location === "category" ? "selected" : ""}>
            <Link to="/admin/category">Category</Link>
          </li>
          <li className={location === "sellers" ? "selected" : ""}>
            <Link to="/admin/sellers">Sellers</Link>
          </li>
          <li className={location === "customers" ? "selected" : ""}>
            <Link to="/admin/customers">Customers</Link>
          </li>
          <li className={location === "profile" ? "selected" : ""}>
            <Link to="/profile">Setting</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default AdminSideBar;
