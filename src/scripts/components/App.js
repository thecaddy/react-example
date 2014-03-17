/**
 * @jsx React.DOM
 */

'use strict';

// Dependency Injection
// This is not part of React
var React = require('react/addons');
var Component1 = require('./component1');
var Component2 = require('./component2');

require('../../styles/reset.css');
require('../../styles/main.css');

// React Stuff
var HelloWorldApp = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}!!</div>;
  }
});

React.renderComponent(
  <HelloWorldApp name="Zillow" />,
  document.getElementById('content')
);

module.exports = HelloWorldApp;
