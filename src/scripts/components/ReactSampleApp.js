/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../../styles/reset.css');
require('../../styles/main.css');

var imageURL = '../../images/yeoman.png';

var ReactSampleApp = React.createClass({
  /*jshint ignore:start */
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
  /*jshint ignore:end */
});

React.renderComponent(<ReactSampleApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactSampleApp;
