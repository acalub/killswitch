# killswitch
Simple utility to help roll in new website feature while providing quick backout "kill" switch.

## Installation
  After install node:

$ npm install killswitch

## Usage
first create a json file that will store all of your killswitch information:
```JSON
  {
    "newFeatureOne":{
      "enabled":true,
      "description":"Killswitch to control toggle between existing implementation and new Updated version",
      "targets":["feature-module", "another-module"],
      "startDate":"Jan 15, 2015",
      "endDate":"Feb 15, 2015"
      },
      "useSpriteImages":{
        "enabled":false,
        "description":"Implementation of sprites for thumbnails",
        "targets":["npm-thumbs"],
        "startDate":"Dec 1, 2014",
        "endDate":"Mar 10, 2015"
      }
  }
  ```
  
  next, consume in feature module and create condition check:
  ```Javascript
  //in feature-module.js
  var Killswitch = require("killswitch"),
      info = require("../package.json"),
      ks = new Killswitch();
  module.exports.getJSON = function(){
    var oldFeatureData = { name:"John Doe", age:30, address:"100 Pine Street"};
    var newFeatureData = { name:"Jane Doe", age:30, address"100 Pine Street", layoutType:"basic", url:"www.thedoes.com", familyHistory:"coming soon"}
    
    //notice this killswitch 'newFeatureOne' does not have enabledValue or disabledValue
    //will default to true if enabled or false if disabled
    return ks.get("newFeatureOne", info) ? newFeatureData : oldFeatureData;
```
Alternatively if we did include a enabledValue/disabledValue we could have done something like:
```JSON
"newFeatureOne":{
      "enabled":true,
      "description":"Killswitch to control toggle between existing implementation and new Updated version",
      "targets":["feature-module", "another-module"],
      "startDate":"Jan 15, 2015",
      "endDate":"Feb 15, 2015",
      "enabledValue":"newFeature",
      "disabledValue":"oldFeature"
}
```
and return as:
```Javascript
  var obj = {};
  obj[ks.getValue("newFeatureOne", info)] = ks.getBoolean("newFeatureOne", info) ? newFeatureData : oldFeatureData;
  return obj;
```
Would produce:
```Javascript
{
  newFeature: { name:"Jane Doe", age:30, address"100 Pine Street", layoutType:"basic", url:"www.thedoes.com", familyHistory:"coming soon"}
}
```
Which would simplify our handlebars template changes to:
```Handlebars
<div>
    {{#if newFeature}}
      {{> myNewPartial newFeature}}
    {{otherwise}}
      {{> currentPartial oldFeature}} 
    {{/if}}
</div>
```

