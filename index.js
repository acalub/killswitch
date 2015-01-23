<<<<<<< HEAD
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
=======
var _ = require("underscore"),
   data; /* killswitch data passed in */ 



module.exports = function(json){
	if(!json){
		throw new Error("new Killswitch(json) failed. Missing required json argument.");
	}
	var killswitches = typeof json === "string" ? JSON.stringify(json) : json;


	this.getBoolean = function(key, info){
		var obj = killswitches[key];
		if(!obj){
			throw new Error("killswitch.getBoolean(key) failed. no matching killswitch key found in killswitches.json.");
		}
		else{
			if(obj.enabled){
				if(obj.targets && obj.targets.length > 0 && obj.targets.indexOf(info.name) > -1 || obj.targets[0] == "*"){
					return true;
				}
				else{
					return false;
				}

			}
			else{
				return false;
			}
		}
	};

	this.getValue = function(key, info){
		var flag = this.getBoolean(key, info);
		var obj = this.get(key, info);
		if(obj.enabledValue && obj.disabledValue && flag){
			return obj.enabledValue;
		}
		else if(obj.enabledValue && obj.disabledValue && !flag){
			return obj.disabledValue;
		}
		else{
			return flag;
		}
	}
			


	this.get = function(key, info){
		return this.getBoolean(key, info) ? killswitches[key] : null;
	};
}



>>>>>>> b95c0a1dee4fce9eda2f5816be93880ed80ff69b
