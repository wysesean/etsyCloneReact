import Backbone from 'backbone'

export var DetailsModel = Backbone.Model.extend({
	//generate_url alters the api request's url
	//ID is the unique code for a list item. 
	_generate_URL: function(id){
		var fullURL= 'https://openapi.etsy.com/v2/listings/'+id+'.js'
		this.url = fullURL
	},
	parse: function(apiResponse){
		return apiResponse.results[0]
	}
})