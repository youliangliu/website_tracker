import React, { Component } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div>
        {/* <!-- Header --> */}
        <div className="header"></div>
        {/* <!-- Sidebar --> */}
        <button
          id="donut openSidebarMenu"
          type="image"
          className="sidebarIconToggle"
          src="../images/donut.svg"
        ></button>
        <input
          type="checkbox"
          className="openSidebarMenu"
          id="openSidebarMenu"
        />
        <label for="openSidebarMenu" className="sidebarIconToggle"></label>
        <div id="sidebarMenu">
          <ul className="sidebarMenuInner">
            <li>
              <Link to="/">
                Code Jam <span>Teams</span>
              </Link>
            </li>
            <li>
              {/* <a href="https://facebook.com" target="_blank"> */}
              <Link to="/createjoin">Create/Join Team</Link>
              {/* </a> */}
            </li>
            <li>
              <a href="https://instagram.com" target="_blank">
                T2
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank">
                T3
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank">
                T4
              </a>
            </li>
            <li>
              <a href="demo1.html" target="_blank">
                demo
              </a>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
