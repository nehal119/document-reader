import * as React from 'react';
import Pricing from './Pricing';

export class Ground extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currIdx: 0,
    }
  }

  componentWillMount() {
    const item = window.localStorage.getItem('document-reader')
    if (item && JSON.parse(item) === 'DjQ#THUWvFBaBh%55AVZWmUTYr$2haJ!es@rMzaXWaQfRCEi*SzpPD6i3h#%BGHYepPpHE@97NhE$VdWhGHuQUEM&$GMM5$35CGv!DT$Tj5$$weFAet5Lbtg42TWWku3') {
      this.setState({
        ...this.state,
        loggedIn: true
      });
    } else {
      window.location.href = '/';
    }
  }

  render () {
    return (
      <div>
        <Pricing />
      </div>
    );
  }
}
