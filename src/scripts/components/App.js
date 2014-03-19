/**
 * @jsx React.DOM
 */

'use strict';

// Dependency Injection
// This is not part of React
var React = require('react/addons');
var PropertyList = require('./component1');
var Map = require('./component2');

require('../../styles/reset.css');
require('../../styles/main.css');


/**
 * Hello World App
 */

// var HelloWorldApp = React.createClass({
//   render: function () {
//     return <header><h1>Hello</h1><h3>{this.props.name}</h3></header>;
//   }
// });
//
// React.renderComponent(
//   <HelloWorldApp name="Zillow" />,
//   document.getElementById('content')
// );
//
// module.exports = HelloWorldApp;


/**
 * IDX APP
 */

var IdxApp = React.createClass({

  getInitialState: function () {
    return { points: [] };
  },

  handlePropertySelected: function (propertyItem) {

    var points = [];
    points[0] = {
      latitude: propertyItem.Latitude,
      longitude: propertyItem.Longitude,
      title: propertyItem.Address
    };

    this.setState({ points: points});
  },

  render: function () {
    var points = this.state.points;
    return (
      <div class="idx-results">
        <div id="content2">
          <PropertyList
            source="http://192.168.62.210/results"
            onPropertySelected={this.handlePropertySelected} />
        </div>

        <div id="content3">
          <Map
            latitude={33.10488}
            longitude={-117.23401}
            zoom={6}
            width={400}
            height={400}
            points={points} />
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <IdxApp />,
  document.getElementById('content')
);

module.exports = IdxApp;




// CHEATSHEET
// var HelloWorldApp = React.createClass({
//   render: function () {
//     return <header><h1>Hello</h1><h3>{this.props.name}</h3></header>;
//   }
// });
//
// React.renderComponent(
//   <HelloWorldApp name="Zillow" />,
//   document.getElementById('content')
// );
