(function(){Namespace("Materia").Notification=function(){var checkForOverflow,displayNotifications,getNotifications,init;return init=function(){},getNotifications=function(){return Materia.Coms.Json.send("notifications_get",null,function(notifications){return $.isArray(notifications)&&displayNotifications(notifications),!1},!0)},checkForOverflow=function(){var holder;return holder=$("#notices")[0],$.data(holder,"info")||$.data(holder,"info",{last:0}),holder.clientWidth<holder.scrollWidth?$(holder).css("padding-right",holder.scrollWidth-holder.clientWidth):holder.clientWidth!==$.data(holder,"info").last&&$(holder).css("padding-right",0),$.data(holder,"info",{last:holder.clientWidth})},displayNotifications=function(notifications){var $notice,$noticeSrc,areaHeight,note,num,_i,_len,_results;if((!notifications.msg||"Invalid Login"!==notifications.msg.title)&&(areaHeight=$(window).height()-$("header").height(),$("#notices").css("max-height",areaHeight),$("#notices").hide(),num=notifications.length,0!==num)){for($("#notifications_link").show(),$("#notifications_link").attr("data-notifications",num),$("#notifications_link").click(function(){var $object;return $(this).hasClass("selected")?$("#notices").slideUp(function(){return $("#notifications_link").removeClass("selected"),"undefined"!=typeof ie8Browser&&null!==ie8Browser?($("#swfplaceholder").hide(),$("object").css("visibility","visible")):void 0}):($object=$("object"),"undefined"!=typeof ie8Browser&&null!==ie8Browser&&($("#swfplaceholder").length>0&&$("#swfplaceholder").show(),$object.css("visibility","hidden")),$("#notifications_link").addClass("selected"),$("#notifications_link").show(),$("#notices").children().fadeIn(),$("#notices").slideDown(function(){return checkForOverflow()}))}),$noticeSrc=$($("#t-notification").html()),_results=[],_i=0,_len=notifications.length;_len>_i;_i++)note=notifications[_i],$notice=$noticeSrc.clone(),$notice.removeAttr("id"),$.data($notice[0],"info",{id:note.id}),$notice.find(".senderAvatar").attr("src",note.avatar),$notice.find(".subject").html(note.subject),$notice.find(".noticeClose").click(function(){var noteID;return noteID=$.data($(this).parent()[0],"info").id,Materia.Coms.Json.send("notification_delete",[noteID]),$(this).parent().slideUp(function(){return $(this).remove(),$("#notifications_link").attr("data-notifications",$("#notices").children().length),checkForOverflow(),0===$("#notices").children().length?($("#notices").remove(),$("#notifications_link").removeClass("selected"),$("#notifications_link").hide()):void 0}),!1}),$("#notices").append($notice),_results.push($($notice).hide());return _results}},{init:init,checkForOverflow:checkForOverflow,getNotifications:getNotifications}}()}).call(this);