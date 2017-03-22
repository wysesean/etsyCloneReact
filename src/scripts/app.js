import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'


const app = function() {
	var EtsyRouter = Backbone.Router.extend({
		routes:{
			'home': 'showHomeListPage',
			'search/:query': 'showSearchPage',
			'detail/:itemID': 'showDetailPage',
			'': 'setToHomePage',
		},
		setToHomePage: function(){
			location.hash = 'home'
		},
		showHomeListPage: function(){

		},
		showSearchPage: function(query){

		},
		showDetailPage: function(itemID){

		}
	})     
	new EtsyRouter()
	Backbone.history.start()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..