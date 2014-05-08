/**
 * @jsx React.DOM
 */

'use strict';


// Dependency Injection
// This is NOT part of React
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var request = require('superagent');

var Details = React.createClass({
  initialHide: true,


  getInitialState: function () {
    return { //hidden: true,
      details: null
    };
  },
  getDefaultProps: function(){
    return {
      clickedProperty: null
    };
  },
  componentWillMount: function(){

  },
  componentDidMount: function(){

  },
  handleHideClick: function(){
    //this.setState({ hidden: true});

    this.props.hideDetails.set(true);
  },

  componentDidUpdate: function(){
    if(!this.props.hideDetails.getValue()){
      //$('#details').css('display', 'block');
      // $('#details').velocity({
      //   right: 0
      // }, 'slow', function(){
      //}); 
      $('#details').show();
      $('#details').off('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
      $('#details').addClass('animated slideInRight');
    }else{
      // $('#details').velocity({
      //   right: -$('#details').outerWidth()
      // }, 'slow', function(){
        //$('#details').css('display', 'none');
      //})
      $('#details').addClass('animated slideOutRight').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
        console.log('we are here');
        $('#details').hide();
      });
    }
  },
  render: function(){
    var clickedProp = this.props.clickedProperty.val();
    var className = '';
    var style1 = {};
    var photo = '',
      beds = '',
      bath = '',
      mlnum = '';

    if(clickedProp){
      photo = this.props.clickedProperty.PhotoUriBase.val() + '0-thumb.jpg';
      beds = this.props.clickedProperty.hasKey('Beds') ? this.props.clickedProperty.Beds.val() : 'You\'re going to have to poop on the street';
      bath = this.props.clickedProperty.BathsTotal.val();
      mlnum = this.props.clickedProperty.MlsNumber.val();
    }
    if(this.initialHide){
      style1 = { display: 'none' };
      this.initialHide = false;
    }
    if(this.props.hideDetails.getValue()) {
      className = 'hidden';
    } 
    clickedProp = (<div id="details"
      className={className}
      style={style1}
      onClick={this.handleHideClick}>
        <img src={photo}/>        
        <p>MlsNumber: {mlnum}</p>
        <p>Beds: {beds}</p>
        <p>Baths: {bath}</p>
        <br/>
        <p>some stuff in here</p>
        <p>{this.props.clickedProperty}</p>
      </div>
    );
    var style = {
      height: 'inherit'
    };
    return(
        <div style={style}>
          <ReactCSSTransitionGroup 
          component={React.DOM.div}
          style={style}
          transitionName="detailSlide">
            {clickedProp}
          </ReactCSSTransitionGroup>
        </div>
      );
  },

  componentWillReceiveProps: function(props){
   //this.state.hidden=props.hidden;
    //console.log('this is totally unrelated');
    // if(!this.state.hidden){
    //   //this.state.hidden=false;
    // }
  }

});

module.exports = Details;
