var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

var axios = require('axios');

var Delete = React.createClass({

  deleteArticle: function(value) {
    console.log("got to delete Article function");
    console.log(value)

    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: '/api/saved',
      data: {
        _id: value
      }
    })

    // with that done, post the current Notes to the page
    .done(function(resp) {

      //console.log("here");
      //console.log(resp);
      window.location.reload();
    })
  },

  render: function () {

    console.log(this);

    return (

      <div>
        <button className="btn btn-default deleteButton" value={this.props.value} onClick={this.deleteArticle.bind(null, this.props.value)}>Delete Article</button>

      </div>




    );
  }
});

module.exports = Delete;