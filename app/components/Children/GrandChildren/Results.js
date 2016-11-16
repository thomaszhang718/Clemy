var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

var axios = require('axios');

var Results = React.createClass({

  saveArticle: function(value) {
      console.log("got to save Article function");

    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/api/saved',
      data: {
        title: value.headline,
        date: value.date,
        url: value.url
      }
    })

    // with that done, post the current Notes to the page
    .done(function(resp) {

      //console.log("here");
      //console.log(resp);

    })
  },

  render: function () {

    return (

      <div>
        <div>
          <h3>{this.props.fiveArticles[0].headline}</h3>
          <h5>{this.props.fiveArticles[0].date}</h5>
          <h5><a href={this.props.fiveArticles[0].url}>Link</a></h5>

          <button
            className="btn btn-default"
            style={buttonStyle}
            value={this.props.fiveArticles[0].headline}
            onClick={this.saveArticle.bind(null, this.props.fiveArticles[0])}>Save Me
          </button>

        </div>

        <hr />

        <div>
          <h3>{this.props.fiveArticles[1].headline}</h3>
          <h5>{this.props.fiveArticles[1].date}</h5>
          <h5><a href={this.props.fiveArticles[1].url}>Link</a></h5>

          <button
            className="btn btn-default"
            style={buttonStyle}
            value={this.props.fiveArticles[1].headline}
            onClick={this.saveArticle.bind(null, this.props.fiveArticles[1])}>Save Me
          </button>

        </div>

        <hr />

        <div>
          <h3>{this.props.fiveArticles[2].headline}</h3>
          <h5>{this.props.fiveArticles[2].date}</h5>
          <h5><a href={this.props.fiveArticles[2].url}>Link</a></h5>

          <button
            className="btn btn-default"
            style={buttonStyle}
            value={this.props.fiveArticles[2].headline}
            onClick={this.saveArticle.bind(null, this.props.fiveArticles[2])}>Save Me
          </button>

        </div>

        <hr />

        <div>
          <h3>{this.props.fiveArticles[3].headline}</h3>
          <h5>{this.props.fiveArticles[3].date}</h5>
          <h5><a href={this.props.fiveArticles[3].url}>Link</a></h5>

          <button
            className="btn btn-default"
            style={buttonStyle}
            value={this.props.fiveArticles[3].headline}
            onClick={this.saveArticle.bind(null, this.props.fiveArticles[3])}>Save Me
          </button>

        </div>

        <hr />

        <div>
          <h3>{this.props.fiveArticles[4].headline}</h3>
          <h5>{this.props.fiveArticles[4].date}</h5>
          <h5><a href={this.props.fiveArticles[4].url}>Link</a></h5>

          <button
            className="btn btn-default"
            style={buttonStyle}
            value={this.props.fiveArticles[4].headline}
            onClick={this.saveArticle.bind(null, this.props.fiveArticles[4])}>Save Me
          </button>

        </div>
      </div>






    );
  }
});

module.exports = Results;