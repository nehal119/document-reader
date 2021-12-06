import axios from "axios";
import * as React from "react";
import Home from "./Home";

export class Ground extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currIdx: 0,
      files: [],
      currFile: "",
    };
  }

  UNSAFE_componentWillMount() {
    const item = window.localStorage.getItem("document-reader");
    if (
      item &&
      JSON.parse(item) ===
        "DjQ#THUWvFBaBh%55AVZWmUTYr$2haJ!es@rMzaXWaQfRCEi*SzpPD6i3h#%BGHYepPpHE@97NhE$VdWhGHuQUEM&$GMM5$35CGv!DT$Tj5$$weFAet5Lbtg42TWWku3"
    ) {
      this.setState({
        ...this.state,
        loggedIn: true,
      });
    } else {
      window.location.href = "/";
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/files")
      .then((res) => {
        this.setState({
          ...this.state,
          files: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps);
  // }

  onLoggedOut = () => {
    this.setState({
      ...this.state,
      loggedIn: false,
    });
  };
  updateIdx = (idx) => {
    this.setState({
      ...this.state,
      currIdx: idx,
    });
  };
  updateCurrFile = (fileName) => {
    this.setState({
      ...this.state,
      currFile: fileName,
      currIdx: 2,
    });
  };
  render() {
    if (!this.state.loggedIn) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <Home
          files={this.state.files}
          currIdx={this.state.currIdx}
          updateIdx={this.updateIdx}
          onLoggedOut={this.onLoggedOut}
          updateCurrFile={this.updateCurrFile}
          currFile={this.state.currFile}
        />
      </div>
    );
  }
}
