(function(){Namespace("Materia.Set").DateTime=function(){var fixTime,parseObjectToDateString,parseTime;return parseObjectToDateString=function(time){var timeObj,year;return timeObj=new Date(1e3*time),year=String(timeObj.getFullYear()),timeObj.getMonth()+1+"/"+timeObj.getDate()+"/"+year.substr(2)},parseTime=function(time){var amPm,hour,minute,timeObj;return timeObj=new Date(1e3*time),amPm="am",hour=timeObj.getHours(),minute=timeObj.getMinutes(),10>minute&&(minute="0"+minute),hour>11?(12!==hour&&(hour-=12),amPm="pm"):0===hour&&(hour="12"),hour+":"+minute+amPm},fixTime=function(time,servTime){var clientUTCDate,clientUTCTimestamp,fixedDateStr,newDate,now,offset,serverDateFromPage,serverUTCDate,serverUTCTimestamp,timeToFix;return timeToFix=new Date(time).getTime(),serverDateFromPage=servTime,now=new Date,clientUTCDate=new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds()),serverUTCDate=new Date(serverDateFromPage),clientUTCTimestamp=clientUTCDate.getTime(),serverUTCTimestamp=serverUTCDate.getTime(),offset=serverUTCTimestamp-clientUTCTimestamp,newDate=new Date(timeToFix+offset),fixedDateStr=newDate.getHours()%12+":"+String("00"+newDate.getMinutes()).slice(-2),fixedDateStr+=newDate.getHours()>11?"pm":"am"},{parseObjectToDateString:parseObjectToDateString,parseTime:parseTime,fixTime:fixTime}}()}).call(this);