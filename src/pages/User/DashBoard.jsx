import React from 'react'
import picture1 from "../../assets/picture/TechLifeCommunication.svg"
import "../../scss/dashboard.scss"

const DashBoard = () => {
  return (
    <div id='dashboard'>
      <div className="container-fluit mt-4 mx-4 dashboard-greeting" style={{ height: "100vh" }}>
        <div className='row'>
          <div className="col-8">
            <div className="greeting position-relative bg-white rounded-5 p-4">
              <h3 style={{ fontSize: "22px" }}>Hello, Võ Quang Thắng</h3>
              <p style={{ fontSize: "14px", color: "#999999" }}>Welcome home, air quality is good and Fresh. Take a walk and have coffee.</p>
              <p style={{ fontSize: "14px", color: "#808080" }} className='fw-bold'>
                <i class="bi bi-door-open" style={{ fontSize: "20px" }}></i>
                Your Door is locked!
              </p>
              <button className='btn btn-outline-secondary px-5 me-4'>Locked</button>
              <button className='btn btn-primary px-5'>Unlock</button>
              <img src={picture1} alt="picture" width={200} className='position-absolute picture1' />
            </div>

            <div className="control-device mt-5">
              <div className="d-flex justify-content-between ">
                <h3>Bright’s Home</h3>
                <select class="form-select w-auto" aria-label="Default select example">
                  <option value="1" selected>Living Room</option>
                  <option value="2">Kitchen</option>
                  <option value="3">Store Room</option>
                </select>
              </div>

              <div className="control-cart">
                
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="notify d-flex justify-content-between">
              <h3 className=''>Alert Notifications</h3>
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard