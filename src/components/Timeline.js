/*global chrome*/
import React, { Component } from "react";
import "./Timeline.css";

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      black_listed: [
        "www.youtube.com",
        "www.facebook.com",
        "twitter.com",
        "myspace.com",
      ],
      animals: [
        "alligator",
        "anteater",
        "armadillo",
        "aurochs",
        "axolotl",
        "badger",
        "bat",
        "beaver",
        "buffalo",
        "camel",
        "capybara",
      ],
      leftRightBranch: [],
      urls: [],
    };

    this.createRightCard = this.createRightCard.bind(this);
    this.createLeftCard = this.createLeftCard.bind(this);
    this.createCards = this.createCards.bind(this);
    this.getHostname = this.getHostname.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAllOpenWindows = this.getAllOpenWindows.bind(this);

    this.setupButtonListener = this.setupButtonListener.bind(this);
    this.timeline = this.timeline.bind(this);
  }
  componentDidMount() {
    // this.setupButtonListener();
    chrome.windows.getAll({ populate: true }, this.getAllOpenWindows); // grabs all current tabs opened
  }

  setupButtonListener() {
    let createButton = document.querySelector("#showBtn");
    createButton.addEventListener("click", this.timeline);
  }

  /**
   *  Gets the host name of a URL
   *
   * @param {string} url: URL of a tab
   * @returns {URL} Host name of the tab
   *
   */
  getHostname(url) {
    console.log(url);
    // Handle Chrome URLs
    if (/^chrome:\/\//.test(url)) {
      return "invalid";
    }
    // Handle Files opened in chrome browser
    if (/file:\/\//.test(url)) {
      return "invalid";
    }
    try {
      var newUrl = new URL(url);
      return newUrl.hostname;
    } catch (err) {
      console.log(err);
    }
  }

  createLeftCard(innerHTML, index, time) {
    let newElement = (
      <div className="row ">
        <div className="col s6">
          {/* indigo lighten-5 */}
          <div className="card blue-grey lighten-5">
            {/* <div className="card blue-grey darken-1"> */}

            <div className="card-content white-text">
              <span style={{ color: "black" }} className="card-title">
                Card Title
              </span>
              <p style={{ color: "black" }}>{innerHTML}</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col s6">
          <div className="valign-wrapper center-align">
            <h4 style={{ color: "#6886c5" }}>{time}</h4>
          </div>
        </div>
      </div>
    );

    this.state.leftRightBranch.push(newElement);
    this.setState({
      leftRightBranch: this.state.leftRightBranch,
    });
  }

  createRightCard(innerHTML, index, time) {
    // date.
    let newElement = (
      <div className="row">
        <div className="col s6 ">
          <h4
            style={{ color: "#fa9191" }}
            className="valign-wrapper center-align"
          >
            {time}
          </h4>
        </div>
        <div className="col s6">
          <div className="card blue-grey lighten-5">
            <div className="card-content white-text">
              <span style={{ color: "black" }} className="card-title">
                Card Title
              </span>
              <p style={{ color: "black" }}>{innerHTML}</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    );

    this.state.leftRightBranch.push(newElement);
    this.setState({
      leftRightBranch: this.state.leftRightBranch,
    });
  }

  

  createCards(tabs, times) {
    // console.log("myDict");
    // console.log(my_dict);
    let index = 0;
    let branch_flip = 0;

    let that = this;

    let i = 0;

    tabs.forEach(function (domain) {
      let time = new Date(times[i]).toLocaleTimeString(); // for now
      if (that.state.black_listed.includes(domain)) {
        // in blacklisted
        if (branch_flip == 1) {
          that.createRightCard(domain, index, time);
          branch_flip = 0;
        } else {
          that.createLeftCard(domain, index, time);
          branch_flip = 1;
        }
        index = (index + 1) % that.state.animals.length;
      }
    });

    this.setState({
      leftRightBranch: this.state.leftRightBranch,
    });
  }

  timeline() {
    //   team name is empty

    let msg = {
      for: "timeline",
      message: "create team",
    };
    console.log("before sending...");
    let tabs;

    chrome.runtime.sendMessage(msg, function (response) {
      console.log(response);
      let data = response.data
      // console.log(data)
      // data = JSON.parse(data)
      // console.log(data)
      // localStorage["data"] = data;
      console.log(data)
  
    });
    
    var data_ = localStorage["users"]
    console.log(data_)
    let times = []
    let urls = []
    for(var key in data_){
      times.push(key)
      urls.push(data_[key])
    }
    console.log(times)
    console.log(urls);

    this.createCards(tabs)

    // let urls = localStorage.getItem["users"];
    // if(urls == undefined){
    //  urls = { "users": {} } 
    // }

    // tabs.forEach(function (domain) {
    //   let time = new Date().toLocaleTimeString();
    //   if (that.state.black_listed.includes(domain)) {
    //     // in blacklisted
    //     if (branch_flip == 1) {
    //       that.createRightCard(domain, index, time);
    //       branch_flip = 0;
    //     } else {
    //       that.createLeftCard(domain, index, time);
    //       branch_flip = 1;
    //     }
    //     index = (index + 1) % that.state.animals.length;
    //   }
    // });

    
    // let urls = JSON.parse(localStorage.getItem["users"]) || { "users": {} };
    // console.log(urls);

    //working
    // tabs = JSON.parse(localStorage["tabs"]);
    // let branch_flip = 0;
    // let index = 0;
    // let that = this;
    // tabs.forEach(function (domain) {
    //   let time = new Date().toLocaleTimeString();
    //   if (that.state.black_listed.includes(domain)) {
    //     // in blacklisted
    //     if (branch_flip == 1) {
    //       that.createRightCard(domain, index, time);
    //       branch_flip = 0;
    //     } else {
    //       that.createLeftCard(domain, index, time);
    //       branch_flip = 1;
    //     }
    //     index = (index + 1) % that.state.animals.length;
    //   }
    // });



    
  }

  /**
   * Displays all URLs (host names) currently opened.
   *
   * @param {Array} winData All chrome window tabs opened
   *
   */
  getAllOpenWindows(winData) {
    let time_dict = {};

    let tabs_num = 0; // seeing how many tabs opened
    let tabs = [];
    let times = [];
    let that = this;
    for (let i in winData) {
      let winTabs = winData[i].tabs;
      let totTabs = winTabs.length;
      for (let j = 0; j < totTabs; j++) {
        // let time = new Date().toLocaleTimeString();
        let time = new Date().getTime();

        let url = this.getHostname(winTabs[j].url);
        if (url != "invalid") {
          // console.log("url", url);
          // time_dict[time] = url;
          tabs.push(url);
          times.push(time);
        }
        tabs_num++;
      }
    }
    // console.log(time_dict);
    console.log(tabs);
    console.log(times);
    // let check = new Date(times[0]);
    // console.log(check.toLocaleTimeString());
    this.createCards(tabs, times);
  }

  render() {
    return (
      <div>
        <div className="row center-align">
          <div className="col s12">
            <button
              id="showBtn"
              className="waves-effect waves-light btn-large red accent-1"
            >
              Create
            </button>
          </div>
        </div>

        <div>{this.state.leftRightBranch}</div>
      </div>
    );
  }
}
