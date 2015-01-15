var _ = require("underscore"),
   data; /* killswitch data passed in */ 



module.exports = function(json){
	if(!json){
		throw new Error("new Killswitch(json) failed. Missing required json argument.");
	}
	var killswitches = typeof json === "string" ? JSON.stringify(json) : json;




	this.get = function(key, info){
		var obj = killswitches[key];
		if(!obj){
			throw new Error("killswitch.get(key) failed. no matching killswitch key found in killswitches.json.");
		}
		else{
			if(obj.enabled){
				if(obj.targets && obj.targets.length > 0 && obj.targets.indexOf(info.name > -1)){
					return obj.enabledValue;
				}
				else{
					return obj.disabledValue;
				}

			}
			else{
				return obj.disabledValue;
			}
		}
	};
}



