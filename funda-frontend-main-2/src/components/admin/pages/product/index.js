import React from "react";
import Navbar from "../../partials/header/index";
import Footer from "../../partials/footer/index";
import Breadcrumb from "../../partials/breadcrumb";
import States from "../../partials//states";

const Products = () => {
  return (
    <>
      <div className="Dashobard">
        <div id="wrapper">
          <Navbar />
          <div className="content-page" id="content">
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <Breadcrumb title="products" />
                  </div>
                </div>
                <States />
                <div className="row mt-3">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="header-title d-inline-block">
                          Products
                        </h4>
                        <span className="float-right font-12">0 items</span>

                        <div className="table-responsive mt-3">
                          <table className="table table-hover mb-0 product-data-table">
                            <thead className="thead-light position-absolute">
                              <tr>
                                <th
                                  className="productName"
                                  id="productQuantity"
                                >
                                  PRODUCTS
                                </th>
                                <th>AVAILIBILITY</th>
                                <th>TOTAL</th>
                                <th>ACTION</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="header-title mb-3">Quick Details </h4>

                        <div className="quick-detail-item">
                          <div className="quick-detail-icon bg-success">
                            <i className="fas fa-stopwatch" />
                          </div>
                          <div className="quick-detail-details">
                            <div className="float-left">
                              <h6>In Stock </h6>
                            </div>
                            <div className="float-right">
                              <h4>0 items</h4>
                            </div>
                          </div>
                        </div>

                        <div className="quick-detail-item">
                          <div className="quick-detail-icon bg-warning">
                            <i className="fas fa-exclamation-circle" />
                          </div>
                          <div className="quick-detail-details">
                            <div className="float-left">
                              <h6>Low in Stock</h6>
                            </div>
                            <div className="float-right">
                              <h4>0 items</h4>
                            </div>
                          </div>
                        </div>

                        <div className="quick-detail-item">
                          <div className="quick-detail-icon bg-danger">
                            <i className="fas fa-times-circle" />
                          </div>
                          <div className="quick-detail-details">
                            <div className="float-left">
                              <h6>Out of Stock </h6>
                            </div>
                            <div className="float-right">
                              <h4>0 items</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
