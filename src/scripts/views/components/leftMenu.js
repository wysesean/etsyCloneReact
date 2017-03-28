import React from 'react'
import ACTIONS from '../../actions.js'

var LeftMenu = React.createClass({
	changeHashFavorites:function(){
		location.hash = 'favorites'
	},
	handleSearch:function(evtObj){
		if(evtObj.key === 'Enter'){
			location.hash = 'search/'+evtObj.target.value
		}
	},
	handleSale:function(){
		console.log('sale clicked')
		var searchQuery = 'sale'
		if(location.hash.startsWith('#search')){
			console.log('adding searchquery')
			searchQuery += (',' + location.hash.split('/')[1])
		}
		console.log(searchQuery)
		ACTIONS.fetchSearch(searchQuery)
	},
	handleHome:function(){
		ACTIONS.fetchAllListings()
	},
	render:function(){
		return(
			<div id="leftColumn">
				<div id="leftContent">
					<a onClick={this.handleHome} href="#home">
						<h1>HUMAN STORE</h1>
					</a>
					<input onKeyPress={this.handleSearch} id='searchBar' type="text" placeholder="Search" />
					<div className="buttonContainer">
						<div onClick={this.handleSale} id='onSaleButton'><p>On Sale</p></div>
						<br />
						<div id='postedWeekButton'><p>Posted Within Week</p></div>
						<button id='showFavorites' onClick={this.changeHashFavorites}>Show Favorites</button>
					</div>
				</div>
			</div>
		)
	}
})

export default LeftMenu