(function(){Namespace("Materia").Player=function(){var addLog,end,init,onWidgetReady,sendPendingLogs,sendStorage,_alert,_baseUrl,_convertedInstance,_embed,_embedDoneDfD,_embedFlash,_embedHTML,_embedTarget,_endLogsPending,_endLogsSent,_endState,_getQuestionSet,_getWidgetInstance,_heartbeatIntervalId,_inst_id,_instance,_isEmbedded,_isPreview,_logInterval,_noFlash,_onLoadFail,_pendingLogs,_play_id,_qset,_scoreScreenPending,_scoreScreenURL,_sendPendingPlayLogs,_sendPendingStorageLogs,_sendToWidget,_sendWidgetInit,_setHeight,_showNoFlashWarning,_showScoreScreen,_startHeartBeat,_startPlaySession,_startTime,_translateForApiVersion,_widget,_widgetType;return _baseUrl=null,_convertedInstance=null,_embedDoneDfD=null,_embedTarget=null,_inst_id=null,_instance=null,_isEmbedded=!1,_isPreview=!1,_logInterval=1e4,_noFlash=!1,_pendingLogs={play:[],storage:[]},_play_id=null,_qset=null,_startTime=0,_widget=null,_widgetType=null,_endState=null,_endLogsPending=!1,_scoreScreenPending=!1,_endLogsSent=!1,_heartbeatIntervalId=-1,_scoreScreenURL=null,_startHeartBeat=function(){var dfd;return dfd=$.Deferred().resolve(),setInterval(function(){return Materia.Coms.Json.send("session_valid",[null,!1],function(data){return data===!1?(alert("You have been logged out due to inactivity.\n\nPlease login again."),window.location.reload()):void 0})},3e4),dfd.promise()},_sendWidgetInit=function(){var dfd;return dfd=$.Deferred().resolve(),_convertedInstance=_translateForApiVersion(_instance),_startTime=(new Date).getTime(),_sendToWidget("initWidget",[_qset,_convertedInstance,_baseUrl]),_isPreview||(_heartbeatIntervalId=setInterval(sendPendingLogs,_logInterval)),dfd.promise()},_sendToWidget=function(type,args){switch(_widgetType){case".swf":return _widget[type].apply(_widget,args);case".html":return _widget.contentWindow.postMessage(JSON.stringify({type:type,data:args}),STATIC_URL)}},_onLoadFail=function(msg){return alert("Failure: "+msg)},_embed=function(){var dfd,enginePath;switch(dfd=$.Deferred(),_widgetType=_instance.widget.player.slice(_instance.widget.player.lastIndexOf(".")),enginePath="http"===_instance.widget.player.substring(0,4)?_instance.widget.player:WIDGET_URL+_instance.widget.dir+_instance.widget.player,_widgetType){case".swf":_embedFlash(enginePath,"10",dfd);break;case".html":_embedHTML(enginePath,dfd)}return dfd.promise()},_embedFlash=function(enginePath,version,dfd){var attributes,express,flashvars,height,params,width;return window.__materia_sendStorage=sendStorage,window.__materia_onWidgetReady=onWidgetReady,window.__materia_sendPendingLogs=sendPendingLogs,window.__materia_end=end,window.__materia_addLog=addLog,params={menu:"false",allowFullScreen:"true",AllowScriptAccess:"always"},attributes={id:_embedTarget},express=BASE_URL+"assets/flash/expressInstall.swf",width="100%",height="100%",flashvars={inst_id:_inst_id,GIID:_inst_id,URL_WEB:BASE_URL,URL_GET_ASSET:"media/"},"undefined"!=typeof ie8Browser&&null!==ie8Browser&&(width="99.7%",height="99.7%"),_embedDoneDfD=dfd,swfobject.embedSWF(enginePath,_embedTarget,width,height,String(version),express,flashvars,params,attributes)},_embedHTML=function(enginePath,dfd){var $iframe,a,expectedOrigin,_onPostMessage;return _embedDoneDfD=dfd,$iframe=$('<iframe src="'+enginePath+'" id="container" class="html"></iframe>'),$("#container").replaceWith($iframe),a=document.createElement("a"),a.href=STATIC_URL,expectedOrigin=a.href.substr(0,a.href.length-1),_onPostMessage=function(e){var msg;if(e.origin!==expectedOrigin)throw new Error("Post message Origin does not match.  Expected: "+expectedOrigin+", Actual: "+e.origin);switch(msg=JSON.parse(e.data),msg.type){case"start":return onWidgetReady();case"addLog":return addLog(msg.data);case"end":return end(msg.data);case"sendStorage":return sendStorage(msg.data);case"sendPendingLogs":return sendPendingLogs();case"alert":return _alert(msg.data);case"setHeight":return _setHeight(msg.data[0]);case"initialize":break;default:throw new Error("Unknown PostMessage recieved from player core: "+msg.type)}},"undefined"!=typeof addEventListener&&null!==addEventListener?addEventListener("message",_onPostMessage,!1):"undefined"!=typeof attachEvent&&null!==attachEvent?attachEvent("onmessage",_onPostMessage):void 0},_getWidgetInstance=function(){var dfd;return dfd=$.Deferred(),_noFlash&&dfd.reject("Flash Player required."),Materia.Coms.Json.send("widget_instances_get",[[_inst_id]],function(widgetInstances){var type,version;return widgetInstances.length<1&&dfd.reject("Unable to get widget info."),_instance=widgetInstances[0],type=_instance.widget.player.split(".").pop(),version=parseInt(_instance.widget.flash_version,10),"swf"===type&&swfobject.hasFlashPlayerVersion(String(version))===!1?(_showNoFlashWarning(),dfd.reject("Newer Flash Player version required.")):(_instance.widget.width>0&&$(".center").width(_instance.widget.width),_instance.widget.height>0&&$(".center").height(_instance.widget.height),dfd.resolve()),$(".widget").show()}),dfd.promise()},_showNoFlashWarning=function(){return _noFlash=!0,$("body").addClass("no-flash"),$(".widget").show(),$("#no_flash").show()},_startPlaySession=function(){var dfd;switch(dfd=$.Deferred(),!1){case!_noFlash:dfd.reject("Flash Player Required.");break;case!_isPreview:dfd.resolve();break;default:_play_id=__PLAY_ID,null!=_play_id?dfd.resolve():dfd.reject("Unable to start play session.")}return dfd.promise()},_getQuestionSet=function(){var dfd;return dfd=$.Deferred(),Materia.Coms.Json.send("question_set_get",[_inst_id,_play_id],function(result){return _qset=result,dfd.resolve()}),dfd.promise()},_sendPendingPlayLogs=function(){var args,dfd;return dfd=$.Deferred(),_pendingLogs.play.length>0?(args=[_play_id,_pendingLogs.play],_isPreview&&args.push(_inst_id),Materia.Coms.Json.send("play_logs_save",args,function(result){return null!=result&&null!=result.score_url&&(_scoreScreenURL=result.score_url),dfd.resolve()}),_pendingLogs.play=[]):dfd.resolve(),dfd.promise()},_sendPendingStorageLogs=function(){var dfd;return dfd=$.Deferred(),!_isPreview&&_pendingLogs.storage.length>0?(Materia.Coms.Json.send("play_storage_data_save",[_play_id,_pendingLogs.storage],function(){return dfd.resolve()}),_pendingLogs.storage=[]):dfd.resolve(),dfd.promise()},_translateForApiVersion=function(inst){var output;switch(parseInt(inst.widget.api_version)){case 1:output={startDate:inst.open_at,playable:inst.widget.is_playable,embedUrl:inst.embed_url,engineName:inst.widget.name,endDate:inst.close_at,GRID:inst.widget.id,type:inst.widget.type,dateCreate:inst.created_at,version:"",playUrl:inst.play_url,QSET:inst.qset,isDraft:inst.is_draft,height:inst.widget.height,dir:inst.group,storesData:inst.widget.is_storage_enabled,name:inst.name,engineID:inst.widget.id,GIID:inst.id,flVersion:inst.flash_version,isQSetEncrypted:inst.widget.is_qset_encrypted,cleanName:inst.widget.clean_name,attemptsAllowed:inst.attempts,recordsScores:inst.widget.is_scorable,width:inst.widget.width,isAnswersEncrypted:inst.widget.is_answer_encrypted,cleanOwner:"",editable:inst.widget.is_editable,previewUrl:inst.preview_url,userID:inst.user_id,scoreModule:inst.widget.score_module};break;case 2:output=inst;break;default:output=inst}return output},_setHeight=function(h){var min_h;return window.top===window.self?(min_h=_instance.widget.height,h>min_h?$("#container").height(h):$("#container").height(min_h)):void 0},init=function(gateway,inst_id,embedTarget,baseUrl){var checkForContext,word,_i,_len;for(_embedTarget=embedTarget,_inst_id=inst_id,_baseUrl=baseUrl,checkForContext=String(window.location).split("/"),_i=0,_len=checkForContext.length;_len>_i;_i++)if(word=checkForContext[_i],"preview"===word){_isPreview=!0,$("body").addClass("preview"),$(".center").prepend($("<header>").addClass("preview-bar"));break}return _isEmbedded=top.location!==self.location,$.when(_getWidgetInstance(),_startPlaySession()).pipe(_getQuestionSet).pipe(_embed).pipe(_sendWidgetInit).pipe(_startHeartBeat).fail(_onLoadFail)},addLog=function(log){return log.game_time=((new Date).getTime()-_startTime)/1e3,_pendingLogs.play.push(log)},sendStorage=function(log){return _isPreview?void 0:_pendingLogs.storage.push(log)},end=function(showScoreScreenAfter){switch(null==showScoreScreenAfter&&(showScoreScreenAfter=!0),_endState){case"sent":if(showScoreScreenAfter)return _showScoreScreen();break;case"pending":if(showScoreScreenAfter)return _scoreScreenPending=!0;break;default:return _endState="pending",clearInterval(_heartbeatIntervalId),addLog({type:2,item_id:0,text:"",value:null}),sendPendingLogs(function(){return _endState="sent",showScoreScreenAfter||_scoreScreenPending?_showScoreScreen():void 0})}},_showScoreScreen=function(){return null===_scoreScreenURL&&(_scoreScreenURL=_isPreview?""+BASE_URL+"scores/preview/"+_inst_id:_isEmbedded?""+BASE_URL+"scores/embed/"+_inst_id:""+BASE_URL+"scores/"+_inst_id),window.location=_scoreScreenURL},sendPendingLogs=function(callback){return null==callback&&(callback=$.noop),$.when(_sendPendingStorageLogs()).pipe(_sendPendingPlayLogs).done(callback).fail(function(){return alert("There was a problem saving.")})},onWidgetReady=function(){switch(_widget=$("#container").get(0),!1){case!(null==_qset):return _embedDoneDfD.reject("Unable to load widget data.");case!(null==_widget):return _embedDoneDfD.reject("Unable to load widget.");default:return _embedDoneDfD.resolve()}},_alert=function(options){var alertWindow,b,buttons,msg,title,type,_i,_len;switch(title=options.title,msg=options.msg,type=options.type,alertWindow=$("<div>"),alertWindow.append("<h1>"+title+"</h1>"),alertWindow.append("<p>"+msg+"</p>"),buttons=[],type){case 1:buttons=["OK"];break;case 2:buttons=["OK","Cancel"];break;case 3:buttons=["Yes","No"]}for(_i=0,_len=buttons.length;_len>_i;_i++)b=buttons[_i],alertWindow.append('<button class="action_button">'+b+"</button>");return $.jqmodal.standalone({modal:!0,backgroundStyle:"light",className:"alert",html:alertWindow.html(),closingSelectors:["button"]})},{init:init}}()}).call(this);