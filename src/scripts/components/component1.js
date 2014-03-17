/**
 * @jsx React.DOM
 */

'use strict';


// Dependency Injection
// This is NOT part of React
var React = require('react/addons');
var request = require('superagent');


// PropertyList:
// Fetch data in componentDidMount. When the response
// arrives, store the data in state, triggering
// a render to update your UI.
var PropertyList = React.createClass({

  getResults: function (uri, next) {
    var params = {
      'requester.AccountID': 69028,
      'requester.ApplicationProfile': 'dsSearchAgentV3',
      'directive.SortOrders[0].Column': 'Price',
      'directive.SortOrders[0].Direction': 'DESC',
      'directive.ResultsPerPage': 0,
      'responseDirective.IncludeMetadata': true,
      // 'responseDirective.OnlyMetadataOnResultCountOverflow': true,
      'query.SearchSetupID': 64,
      'query.LinkID': -1,
      'query.LatitudeMin': 33.99529982965991,
      'query.LongitudeMin': -117.98921585083008,
      'query.LatitudeMax': 34.159380090966664,
      'query.LongitudeMax': -117.84330368041992,
      'query.VisitorID': 1091571,
      'query.ListingStatuses': 3,
      'query.PropertyTypes[0]': 514
    };

    request
      .post(uri)
      .set('Content-Type', 'application/json')
      .type('json')
      .query(params)
      .send({ post: 'data'})
      .end(function (res) {
        var results = this.parseResponse(res);
        next(results);
      }.bind(this));
  },

  parseResponse: function (res) {
    var body = res.body || JSON.parse(res.text);
    return body;
  },

  getInitialState: function () {
    return { properties:[], isLoading: false };
  },

  componentDidMount: function () {
    var uri = this.props.source;
    this.setState({ isLoading: true });

    this.getResults(uri, function (results) {
      this.setState({
          properties: results.Results,
          isLoading: false
      });
    }.bind(this));

  },

  render: function() {

    var propertyList;

    if (this.state.isLoading) {
      propertyList = (
        <div>Please wait... Loading results</div>
      );
    } else {
      propertyList = this.state.properties.map(function (propertyItem) {
        return <PropertyItem propertyItem={propertyItem} />
      });
    }

    return (
      <ul className="propertyList">
        {propertyList}
      </ul>
    );
  }
});

var PropertyItem = React.createClass({

  handleClick: function(event) {
    alert(this.props.propertyItem.PropertyID);
  },

  render: function () {
    var photoSrc = this.props.propertyItem.PhotoUriBase + '0-thumb.jpg';
    return (
      <li className="propertyItem" onClick={this.handleClick}>
        <img src={photoSrc} />
        <span>{this.props.propertyItem.Address}</span>
      </li>
    );
  }

});


React.renderComponent(
  <PropertyList source="http://192.168.62.208/results" />,
  document.getElementById('content2')
);

// getResults();
