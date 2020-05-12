import React, { Component } from "react";
import "./TL.css";

export default class TL extends Component {
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
    };
    this.getHostname = this.getHostname.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAllOpenWindows = this.getAllOpenWindows.bind(this);
  }

  // componentDidMount() {
  //   chrome.windows.getAll({ populate: true }, this.getAllOpenWindows); // grabs all current tabs opened
  // }

  /**
   * Displays all URLs (host names) currently opened.
   *
   * @param {Array} winData All chrome window tabs opened
   *
   */
  getAllOpenWindows(winData) {
    let tabs_num = 0; // seeing how many tabs opened
    let tabs = [];
    let that = this;
    for (let i in winData) {
      let winTabs = winData[i].tabs;
      let totTabs = winTabs.length;
      for (let j = 0; j < totTabs; j++) {
        let url = this.getHostname(winTabs[j].url);
        if (url != "invalid") tabs.push(url);
        tabs_num++;
      }
    }
    console.log(tabs);
    // this.showURL(tabs);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s6">
            <div className="valign-wrapper center-align">
              <h4>8pm</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s6">7pm</div>
          <div className="col s6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
