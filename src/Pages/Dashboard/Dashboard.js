import GroupIcon from "@material-ui/icons/Group";
import React from 'react';
import { Link } from 'react-router-dom';
import DoughnutChat from '../../Component/Chart/DoughnutChat';
import EventTriggers from '../../Component/Chart/EventTriggers';
import LineChart from '../../Component/Chart/LineChart';
import LineChartStacked from '../../Component/Chart/LineChartStacked';
import PieChart from '../../Component/Chart/PieChart';
import PolarChart from '../../Component/Chart/PolarChart';
import VerticalBarChart from '../../Component/Chart/VerticalBarChart';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';

const Dashboard = () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col__10" id="dashboard_body">
            <TopBar />
            <HeaderPart />
            <div className="ds_body">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-between mb-5 breadcrumbPart">
                  <div>
                    <h3>Dashboard</h3>
                  </div>

                  <nav>
                    <ol className="breadcrumb d-flex">
                      <p>You are here : &nbsp;</p>
                      <li className="breadcrumb-item">
                        <Link className="LinkColor" to="/">
                          Dashboard
                        </Link>
                      </li>

                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </nav>
                </div>
                
                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <h3 className="mb-3">Dashboard</h3>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex position-relative shadow">
                        <div className="p-3 d-flex">
                          <div className="align-self-center mx-2">
                            <GroupIcon style={{ fontSize: "35px" }} />
                          </div>
                          <div>
                            <h4 className="mt-0">10,495</h4>
                            <p>New Members</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* EventTriggers */}
                <div className="col-6 mt-3 bg-white rounded-3 shadow-lg p-4">
                  <EventTriggers />
                </div>
                {/* VerticalBarChart */}
                <div className="col-6 mt-3 bg-white rounded-3 shadow-lg p-4">
                  <VerticalBarChart />
                </div>
                {/* LineChart */}
                <div className="col-6 mt-3 bg-white rounded-3 shadow-lg p-4">
                  <LineChart />
                </div>
                <div className="col-6 mt-3 bg-white rounded-3 shadow-lg p-4">
                  <LineChartStacked />
                </div>
                {/* DoughnutChat */}
                <div className="col-4 mt-3 bg-white rounded-3 shadow-lg p-4 DoughnutChat justify-content-center d-flex">
                  <DoughnutChat />
                </div>
                {/* PieChart */}
                <div className="col-4 mt-3 bg-white rounded-3 shadow-lg p-4 DoughnutChat justify-content-center d-flex">
                  <PieChart />
                </div>
                {/* PolarChart */}
                <div className="col-4 mt-3 bg-white rounded-3 shadow-lg p-4 DoughnutChat justify-content-center d-flex">
                  <PolarChart />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;