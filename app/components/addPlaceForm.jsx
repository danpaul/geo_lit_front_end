var services = require('../lib/services.js');

module.exports = React.createClass({
    getInitialState: function(){
        return({ placeValue: ''});
    },

    render: function(){
        var addPlaceButtonClasses = 'js-add-place button expand';

        return(
            <form className="js-add-place-form">
                <div className="row">
                    <div className="small-12 columns">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={this.state.placeValue}
                            onChange={this.updatePlaceValue} />
                        <a
                            href="javascript:void(0)"
                            onClick={this.submitForm}
                            className={addPlaceButtonClasses}>Add Place</a>
                    </div>
                </div>
            </form>
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