# killswitch
Simple utility to help roll in new website features while providing a clearly defined backout "killswitch" mechanism.

## Installation
  After install node:

$ npm install killswitch

## Usage
First create a json file that will define each of the killswitches in an application.
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
Each killswitch definition must have the following required properties `enabled`,`description`, `targets` as an array, `startDate`, `endDate` and the following option properties `enabledValue` and `disabledValue`. These optional values will be returned via the method `getValue(key, info)`, this method will default to boolean `true/false` if either `enabledValue` and `disabledValue` are missing.

Next, consume in feature module and create condition check:
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
    return ks.getBoolean("newFeatureOne", info) ? newFeatureData : oldFeatureData;
```
Alternatively if we did include an `enabledValue/disabledValue` we could have done something like:
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
and returned as:
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

