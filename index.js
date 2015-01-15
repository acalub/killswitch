module.exports = function(json){
	if(!json){
		throw new Error("killswitch failed. Missing required json argument");
	}
	if(json.redisConfig){
		//do redis connection here
	}
	else{
		//use flat file approach
		var switches = typeof json === "string" ? JSON.parse(json) : json;
	}


	this.get = function(key, info){
	}

	this.set = function(key, value){


}
