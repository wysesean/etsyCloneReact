import React from 'react'
import LeftMenu from './components/leftMenu'
import ACTIONS from '../actions'
import STORE from '../store'
import UTIL from '../util'


var DetailPage = React.createClass({
	componentWillMount:function(){
		ACTIONS.fetchDetailListing(this.props.itemIDProp)
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount:function(){
		STORE.reset()
		STORE.off()
	},
	getInitialState:function(){
		return STORE.data
	},
	render:function(){
		if(!UTIL.isEmptyObject(this.state.detailModel)){
			return(
				<div id='detail-page'>
					<LeftMenu />
					<DetailView listingInfo={this.state.detailModel} />
				</div>
			)
		}
		else{
			return(
				<div id='detail-page'>
					<LeftMenu />
				</div>
			)
		}
	}
})

var DetailView = React.createClass({
	render: function(){
		return(
			<div id='details-container'>
				<GalleryView imgArray={this.props.listingInfo.get('Images')} />
				<p id="detail-price">${this.props.listingInfo.get('price')} </p>
				<button id="detail-button">Buy Now</button>
				<p id="arrows"><i id="leftArrow" className="material-icons">chevron_left</i><i id="rightArrow" className="material-icons">chevron_right</i></p>
				<p id="detail-description">{this.props.listingInfo.get('description')}</p>
			</div>
		)
	}
})

var GalleryView = React.createClass({
	addImgCounter:function(imgArr){
		if(imgArr[this.state.imgCounter+1]){
			this.setState({
				imgCounter: ++this.state.imgCounter
			})
		}
		else{
			this.setState({
				imgCounter: 0
			})
		}
	},
	getInitialState:function(){
		return {imgCounter: 0}
	},
	handleClickLocation:function(e,imgArr){
		var pWidth = $(e.target).innerWidth()
		var x = e.pageX - $(e.target).offset().left
		if(pWidth/2>x){
			console.log('prev img')
			if(imgArr[this.state.imgCounter-1]){
				this.setState({
					imgCounter: --this.state.imgCounter
				})
			}
			else{
				this.setState({
					imgCounter: imgArr.length-1
				})
			}
		}
		else{
			console.log('next img')
			if(imgArr[this.state.imgCounter+1]){
				this.setState({
					imgCounter: ++this.state.imgCounter
				})
			}
			else{
				this.setState({
					imgCounter: 0
				})
			}
		}
	},
	render: function(){
		if(this.props.imgArray){
			return(
				<div id="detail-gallery">
					<img onClick={(e)=>{this.handleClickLocation(e, this.props.imgArray)}} src={this.props.imgArray[this.state.imgCounter].url_570xN} />
					<ImageScroll imgArr={this.props.imgArray} />
				</div>
			)
		}
		else{
			return(
				<div id="detail-gallery">
				</div>
			)
		}

	}
})

var ImageScroll = React.createClass({
	render: function(){
		return(
			<div id='image-scroll'>

			</div>
		)
	}
})

export default DetailPage