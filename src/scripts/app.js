import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage'
import SearchPage from './views/searchPage'
import DetailPage from './views/detailPage'
import FavoritesPage from './views/favoritesPage'

const app = function() {
	var EtsyRouter = Backbone.Router.extend({
		routes:{
			'home': 'showHomeListPage',
			'search/:query': 'showSearchPage',
			'detail/:itemID': 'showDetailPage',
			'favorites': 'showFavoritesPage',
			'': 'setToHomePage',
			'*default': 'setToHomePage'
		},
		setToHomePage: function(){
			location.hash = 'home'
		},
		showHomeListPage: function(){
			ReactDOM.render(<HomePage />, document.querySelector('.container'))
		},
		showSearchPage: function(query){
			ReactDOM.render(<SearchPage queryProp={query}/>, document.querySelector('.container'))
		},
		showDetailPage: function(itemID){
			ReactDOM.render(<DetailPage itemIDProp={itemID}/>, document.querySelector('.container'))
		},
		showFavoritesPage: function(){
			ReactDOM.render(<FavoritesPage />, document.querySelector('.container'))
		},
	})     
	new EtsyRouter()
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..