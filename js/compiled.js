(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AddPlaceForm = require('./components/addPlaceForm.jsx');

React.render(
    React.createElement("div", null, 
        React.createElement(AddPlaceForm, null)
    ),
    document.getElementById('content')
);


},{"./components/addPlaceForm.jsx":2}],2:[function(require,module,exports){
var services = require('../lib/services.js');

module.exports = React.createClass({displayName: "exports",
    getInitialState: function(){
        return({ placeValue: ''});
    },

    render: function(){
        var addPlaceButtonClasses = 'js-add-place button expand';

        return(
            React.createElement("form", {className: "js-add-place-form"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "small-12 columns"}, 
                        React.createElement("input", {
                            type: "text", 
                            name: "title", 
                            placeholder: "Title", 
                            value: this.state.placeValue, 
                            onChange: this.updatePlaceValue}), 
                        React.createElement("a", {
                            href: "javascript:void(0)", 
                            onClick: this.submitForm, 
                            className: addPlaceButtonClasses}, "Add Place")
                    )
                )
            )
        );
    },

    updatePlaceValue: function(event){
        this.setState({placeValue: event.target.value});
    },
    submitForm: function(event){
console.log('here')
        event.preventDefault();
    }


});

},{"../lib/services.js":3}],3:[function(require,module,exports){


},{}]},{},[1]);
