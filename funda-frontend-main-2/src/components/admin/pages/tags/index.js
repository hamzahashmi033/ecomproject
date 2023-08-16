import React from "react";
import Navbar from "../../partials/header";
import Footer from "../../partials/footer";
import Breadcrumb from "../../partials/breadcrumb";
import States from "../../partials/states";
const Tags = () => {
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
                    <Breadcrumb title="Tags | Vouchers" />
                  </div>
                </div>
                <States />
                <div className="row">
                  <div className="col-12 text-right">
                    <button className="btn btn-success px-3 ripple button-base mr-2">
                      ADD TAG
                    </button>
                    <button className="btn btn-success px-3 ripple button-base mr-2">
                      ADD VOUCHER
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-5">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="header-title">Tags</h4>
                        <div className="table-responsive mt-3">
                          <table className="table table-hover mb-0 category-data-table">
                            <thead className="thead-light position-absolute w-89">
                              <tr>
                                <th className="cateogryName">NAME</th>
                                <th>ACTION</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="header-title">Vouchers</h4>
                        <div className="table-responsive mt-3">
                          <table className="table table-hover mb-0 ">
                            <thead className="thead-light">
                              <tr>
                                <th>NAME</th>
                                <th>CODE</th>
                                <th>QUANTITY</th>
                                <th>ACTION</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
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

export default Tags;
