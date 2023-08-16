import React from "react";
import productProgessImg1 from "../../../../assets/current-products-progress-img-1.png";
import productProgessImg2 from "../../../../assets/current-products-progress-img-2.png";
import productProgessImg3 from "../../../../assets/current-products-progress-img-3.png";

const States = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card-box current-products-progress">
          <div>
            <img src={productProgessImg1} draggable="false" alt="" />
          </div>
          <div>
            <h2 className="text-left text-lightblue">22</h2>
            <p className="text-secondary ">Total Customers</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-box current-products-progress">
          <div>
            <img src={productProgessImg2} draggable="false" alt="" />
          </div>
          <div>
            <h2 className="text-left text-purple">22</h2>
            <p className="text-secondary ">Total Orders</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-box current-products-progress">
          <div>
            <img src={productProgessImg3} draggable="false" alt="" />
          </div>
          <div>
            <h2 className="text-left text-success">22</h2>
            <p className="text-secondary">Total Products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default States;
