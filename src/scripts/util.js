var UTIL = {
	formatTitle:function(str){
	    if(str.length > 30){ 
			var str = str.substr(0, 30)
		    str = str.substr(0,Math.min(str.length, str.lastIndexOf(" ")))
		    return str + "..."
	    }
	    return str
	},
	isEmptyObject:function(obj) {
	    var name;
	    for (name in obj) {
	        return false;
	    }
	    return true;
	}
}

export default UTIL