(function(){Namespace("Materia").Engine=function(){var addLog,alert,disableResizeInterval,end,escapeScriptTags,getImageAssetUrl,sendPendingLogs,sendStorage,setHeight,start,_baseUrl,_initWidget,_instance,_lastHeight,_onPostMessage,_resizeInterval,_sendPostMessage,_widgetClass;return _baseUrl=null,_widgetClass=null,_instance=null,_resizeInterval=null,_lastHeight=-1,_onPostMessage=function(e){var msg;switch(msg=JSON.parse(e.data),msg.type){case"initWidget":return _initWidget(msg.data[0],msg.data[1]),_baseUrl=msg.data[2];default:throw new Error("Error: Engine Core received unknown post message: "+msg.type)}},_sendPostMessage=function(type,data){return parent.postMessage(JSON.stringify({type:type,data:data}),"*")},_initWidget=function(qset,instance){return _widgetClass.start(instance,qset.data,qset.version),_instance=instance},start=function(widgetClass){switch(!1){case"undefined"==typeof addEventListener||null===addEventListener:addEventListener("message",_onPostMessage,!1);break;case"undefined"==typeof attachEvent||null===attachEvent:attachEvent("onmessage",_onPostMessage)}return null!=widgetClass.manualResize&&widgetClass.manualResize===!1&&(_resizeInterval=setInterval(function(){return setHeight()},300)),_widgetClass=widgetClass,_sendPostMessage("initialize"),_sendPostMessage("start",null)},sendStorage=function(){return _sendPostMessage("sendStorage",arguments[0])},addLog=function(type,item_id,text,value){return null==type&&(type=""),null==item_id&&(item_id=0),null==text&&(text=""),_sendPostMessage("addLog",{type:type,item_id:item_id,text:text,value:value})},alert=function(title,msg,type){return null==type&&(type=1),_sendPostMessage("alert",{title:title,msg:msg,type:type})},getImageAssetUrl=function(id){return""+_baseUrl+"media/"+id},end=function(showScoreScreenAfter){return null==showScoreScreenAfter&&(showScoreScreenAfter=!0),_sendPostMessage("end",showScoreScreenAfter)},sendPendingLogs=function(){return _sendPostMessage("sendPendingLogs",{})},setHeight=function(h){return h||(h=$("html").height()),h!==_lastHeight?(_sendPostMessage("setHeight",[h]),_lastHeight=h):void 0},disableResizeInterval=function(){return clearInterval(_resizeInterval)},escapeScriptTags=function(text){return text.replace(/</g,"&lt;").replace(/>/g,"&gt;")},{start:start,addLog:addLog,alert:alert,getImageAssetUrl:getImageAssetUrl,end:end,sendPendingLogs:sendPendingLogs,sendStorage:sendStorage,disableResizeInterval:disableResizeInterval,setHeight:setHeight,escapeScriptTags:escapeScriptTags}}()}).call(this);