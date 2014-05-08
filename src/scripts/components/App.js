/**
 * @jsx React.DOM
 */
console.log('made it');
'use strict';

// Dependency Injection
// This is not part of React
var React = require('react/addons');
var Cortex = require('cortexjs');
var PropertyList = require('./component1');
var Map = require('./component2');
var Details = require('./component3');

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
    return { points: [],
      hidden:true };
  },
  
  handlePropertyHovered: function (propertyItem) {

    var points = [];
    points[0] = {
      latitude: propertyItem.Latitude,
      longitude: propertyItem.Longitude,
      title: propertyItem.Address
    };

    this.setState({ points: points});
  },

  handleStateHide: function(){
    this.setState({hidden: true});
  },

  render: function () {
    //console.log('my props: ', this.props.AppData.hideDetails);
    var points = this.state.points;
    var clickedProperty
    return (
      <div className="idx-results">
        <div id="contentHolder">
          <div id="content2">
            <PropertyList
              source="http://192.168.2.145/results"
              hideDetails= {this.props.AppData.hideDetails}
              clickedProperty= {this.props.AppData.clickedProperty}
              // onPropertyClick={this.handlePropertyClicked}
              onPropertyHovered={this.handlePropertyHovered} />
          </div>

          <div id="content3">
            <Map
              latitude={33.10488}
              longitude={-117.23401}
              zoom={8}
              height={400}
              points={points} />
          </div>
          <Details
            hidden={this.state.hidden}
            hideDetails= {this.props.AppData.hideDetails}
            clickedProperty= {this.props.AppData.clickedProperty}/>
            // handleStateHide={this.handleStateHide}
            // clickedProperty={this.props.clickedProperty}/> 
        </div>
      </div>
    );
  }
});

var AppComponentData = {
  hideDetails: true,
  clickedProperty: null
};

var AppCortex = new Cortex(AppComponentData);

var AppComponent = React.renderComponent(
  <IdxApp AppData={AppCortex} />,
  document.getElementById('content')
);

AppCortex.on('update', function(e){
  AppComponent.setProps({AppData: AppCortex});
});

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
