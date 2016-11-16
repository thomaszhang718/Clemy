// Include React
var React = require('react');

var axios = require('axios');

var Delete = require('./GrandChildren/Delete.js');

var Saved = React.createClass({

	getInitialState: function(){
		return {
			savedArticles: []
		}
	},

	componentDidMount: function(){
		console.log("COMPONENT MOUNTED");

		// The moment the page renders on page load, we will retrieve the previous click count.
		// We will then utilize that click count to change the value of the click state.
		axios.get('/api/saved')
			.then(function(savedData){
				console.log("these are the saved articles");

				var savedArray =[];				

				this.setState({savedArticles: savedArray});

				for (var i = 0; i < savedData.data.length; i++) {
					var articleObj = {
						_id: savedData.data[i]._id,
						date: savedData.data[i].date,
						url: savedData.data[i].url,
						title: savedData.data[i].title
					}

					savedArray.push(articleObj);
				}

				this.changeHandler(savedArray);

			}.bind(this));

	},

    changeHandler: function(value) {

    	//console.log("got to change handler")

        this.setState({
            savedArticles: value
        });
    },	

	render: function(){

		/*onClick={this.deleteArticle.bind(null, articleInfo._id)}*/

		var savedArticlesArray = this.state.savedArticles;

		console.log("here")
		console.log(savedArticlesArray);

		console.log(this)

		var articlesList = savedArticlesArray.map(function(articleInfo) {
			return (
			<div>
				<h3>{articleInfo.title}</h3>
				<h5>{articleInfo.date}</h5>
				<h5><a href={articleInfo.url}>Link</a></h5>
				<Delete value={articleInfo._id} />
				<hr />
			</div>
			)
		})

		return(
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Saved Articles</strong></h3>
								</div>
							<div className="panel-body">
								{articlesList}




							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Saved;






