(function(){Namespace("Materia.Store").Spotlight=function(){var get,init,populateSpotlight,spotlightArray;return spotlightArray=null,init=function(){},get=function(callback){return Materia.Coms.Json.send("widget_spotlight_get",null,function(data){return spotlightArray=data,populateSpotlight(function(){return callback?callback():void 0})})},populateSpotlight=function(callback){var checked,hide,i,spotlight,_i,_len;for(i=_i=0,_len=spotlightArray.length;_len>_i;i=++_i)spotlight=spotlightArray[i],hide="",checked="",0!==i?hide="hidden":checked='checked="checked"',$(".main_container").append('<article class="store_main '+hide+'" id="spolight_'+i+'" >'+spotlight+"</article>"),$(".cycler").append('<input type="radio" name="spotlight" id="slide_'+i+'" '+checked+' class="radio_spotlight" />');return callback?callback():void 0},{init:init,get:get}}()}).call(this);