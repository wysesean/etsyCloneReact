import React from 'react'

var LeftMenu = React.createClass({
	changeHashFavorites:function(){
		location.hash = 'favorites'
	},
	render:function(){
		return(
			<div id="leftColumn">
				<div id="leftContent">
					<a href="#home">
						<h1>HUMAN STORE</h1>
					</a>
					<input id='searchBar' type="text" placeholder="Search" />
					<div className="buttonContainer">
						<div id='onSaleButton'></div><p>On Sale</p>
						<br />
						<div id='postedWeekButton'></div><p>Posted Within Week</p>
						<button id='showFavorites' onClick={this.changeHashFavorites}>Show Favorites</button>
					</div>
				</div>
			</div>
		)
	}
})

export default LeftMenu