import React from 'react';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';

const FeatureCategories = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar></SideBar>
        <div className="col__10" id="dashboard_body">
          <TopBar></TopBar>
          <HeaderPart></HeaderPart>

          <div className="ds_body w-100">
            <div className="row">
              <Breadcrumb
                title="Category Create"
                url="/category/create/"
              ></Breadcrumb>
              <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                <div className="row">
                  <div className="col">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fuga voluptas eius vero porro, sint totam fugiat magnam, magni dolores voluptatem, culpa minus eum nemo aspernatur illum repudiandae amet ab.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategories;