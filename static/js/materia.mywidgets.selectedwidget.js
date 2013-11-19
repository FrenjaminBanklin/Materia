(function(){Namespace("Materia.MyWidgets").SelectedWidget=function(){var STORAGE_TABLE_MAX_ROWS_SHOWN,copyWidget,createSemesterString,createStorageDataTable,createStorageDataTables,dateRanges,getCurrentSemester,getEmbedLink,getPlayLogs,getScoreSummaries,getSelectedId,getSemesterFromTimestamp,getStorageData,init,loadDateRanges,noAccess,noWidgets,normalizeStorageDataColumns,populateAttempts,populateAvailability,populateDisplay,populateScoreWrapper,processDataIntoSemesters,scoreSummaries,selectedData,selectedWidgetInstId,semesterPlayLogs,setScoreView,setSelected,showAllScores,storageData,toggleShareWidgetContainer,toggleTableSort,updateData,updateGraph,updateSemesterScores,updateSummary,updateTable;return STORAGE_TABLE_MAX_ROWS_SHOWN=100,selectedWidgetInstId=0,scoreSummaries={},semesterPlayLogs={},storageData={},selectedData=null,dateRanges=null,init=function(){return $(".show-older-scores-button").click(function(e){return e.preventDefault(),Materia.MyWidgets.SelectedWidget.showAllScores()})},getSelectedId=function(){return selectedWidgetInstId},setSelected=function(inst_id){return $(".page").is(":visible"&&!$("section .error").is(":visible"))&&Materia.Set.Throbber.startSpin(".page"),selectedWidgetInstId=inst_id,$(".gameSelected").removeClass("gameSelected"),$("#widget_"+selectedWidgetInstId).addClass("gameSelected"),Materia.MyWidgets.Statistics.clearGraphs(),populateDisplay()},getCurrentSemester=function(){return selectedData.year+" "+selectedData.term},populateAttempts=function(attemptsAllowed){return attemptsAllowed=parseInt(attemptsAllowed,10),$("#attempts").html(attemptsAllowed>0?attemptsAllowed:"Unlimited")},populateAvailability=function(startDateInt,endDateInt){var $availability,availability,end,start;return $("section.directions").is(":visible")&&($("section.directions").hide(),$("section.page").show()),availability=Materia.Set.Availability.get(startDateInt,endDateInt),$availability=$("#avaliability"),0>endDateInt&&0>startDateInt?($availability.removeAttr("data-type"),$availability.html("Anytime")):0>startDateInt&&endDateInt>0?($availability.attr("data-type","endDateOnly"),$availability.html('Open until <span class="available_date">'+availability.end.date+'</span> at <span class="available_time">'+availability.end.time+"</span>")):startDateInt>0&&0>endDateInt?(start=new Date(startDateInt),$availability.attr("data-type","startDateOnly"),$availability.html('Anytime after <span class="available_date">'+availability.start.date+'</span> at <span class="available_time">'+availability.start.time+"</span>")):(start=new Date(startDateInt),end=new Date(endDateInt),$availability.removeAttr("data-type"),$availability.html('From <span class="available_date">'+availability.start.date+'</span> at <span class="available_time">'+availability.start.time+'</span> until <span class="available_date">'+availability.end.date+'</span> at <span class="available_time">'+availability.end.time+"</span>"))},noAccess=function(){return $("section.page").children().hide(),$("section.directions").is(":visible")&&($("section.directions").hide(),$("section.page").show()),$("section.page").append($("#t-error").html())},populateDisplay=function(){var count,widgetID;return count=null,widgetID=null,$("section .error").is(":visible")&&$("section .error").remove(),Materia.Coms.Json.send("session_valid",["basic_author"],function(){return loadDateRanges(function(){return Materia.Widget.getWidget(selectedWidgetInstId,function(inst){var $editButton,$scoreWrapper,beardType,clean_name,e,existing,widgetName,_i,_len;if(clean_name=widgetName=inst.clean_name,widgetID=inst.widget.id,$editButton=$("#edit_button"),Materia.User.getCurrentUser(function(user){return Materia.Coms.Json.send("permissions_get",[0,inst.id],function(perms){var accessLevel,id,jqmodalOptions,str,user_perms,widget_user_perms;user_perms=perms.user_perms,widget_user_perms=perms.widget_user_perms,accessLevel=0,"undefined"!=typeof user_perms[user.id]&&"undefined"!=typeof user_perms[user.id][0]&&(accessLevel=Number(user_perms[user.id][0])),0===accessLevel?($editButton.unbind(),$editButton.attr("href","#"),$editButton.click(function(){return!1}),$editButton.addClass("disabled"),$(".copy").addClass("disabled"),$("#copy_widget_link").addClass("disabled"),$("#delete_widget_link").addClass("disabled").parent().addClass("disabled")):(1===Number(inst.widget.is_editable)?$editButton.removeClass("disabled"):($editButton.unbind(),$editButton.attr("href","#"),$editButton.click(function(){return!1}),$editButton.addClass("disabled")),$(".copy").removeClass("disabled"),$("#copy_widget_link").removeClass("disabled"),$("#delete_widget_link").removeClass("disabled").parent().removeClass("disabled")),0===accessLevel||inst.is_draft===!0?($(".attempts_parent").addClass("disabled"),$("#edit-avaliability-button").addClass("disabled"),$("#attempts").addClass("disabled"),$("#avaliability").addClass("disabled")):($(".attempts_parent").removeClass("disabled"),$(".copy").removeClass("disabled"),$("#copy_widget_link").removeClass("disabled"),$("#copy_widget_link").unbind("click"),$("#delete_widget_link").removeClass("disabled"),$("#delete_widget_link").unbind("click"),$("#edit-avaliability-button").removeClass("disabled"),$("#attempts").removeClass("disabled"),$("#avaliability").removeClass("disabled")),$("#edit-avaliability-button").unbind("click"),$("#attempts").unbind("click"),$("#avaliability").unbind("click"),jqmodalOptions={modal:!0,backgroundStyle:"light",className:"availability",html:$("#t-availibility").html(),closingSelectors:[".cancel_button"]},$("#edit-avaliability-button").not(".disabled").jqmodal(jqmodalOptions,Materia.MyWidgets.Availability.popup),$("#attempts").not(".disabled").jqmodal(jqmodalOptions,Materia.MyWidgets.Availability.popup),$("#avaliability").not(".disabled").jqmodal(jqmodalOptions,Materia.MyWidgets.Availability.popup),$(".copy").unbind("click"),$(".copy.disabled").click(function(){return!1}),$(".copy").not(".disabled").jqmodal({modal:!0,backgroundStyle:"light",className:"copy",html:$("#t-copy-popup").html(),closingSelectors:[".cancel_button"]},function(){var newTitle;return $("#popup.copy input").focus(),newTitle=$("#popup.copy input.newtitle").val(),$("#popup.copy input.newtitle").keypress(function(e){return 10===e.which||13===e.which?copyWidget():void 0}),$("#popup.copy .copy_button").click(function(e){return e.preventDefault(),copyWidget()})}),$(".delete_dialogue").hide(),$(".additional_options").fadeIn("fast"),$(".delete").unbind("click"),$(".delete.disabled").click(function(){return!1}),$(".delete").not(".disabled").toggle(function(){return $(".additional_options").hide(),$(".delete_dialogue").fadeIn("fast"),$(".delete_dialogue").show()},function(){return $(".delete_dialogue").hide(),$(".additional_options").fadeIn("fast")}),count=0;for(id in widget_user_perms)id!==user.id&&count++;return str="Collaborate",count>0&&(str+=" ("+count+")"),$("#share_widget_link").text(str)})}),populateAvailability(inst.open_at,inst.close_at),populateAttempts(inst.attempts),$(".page hgroup h1").html(inst.name),$(".page hgroup h3").html(inst.widget.name),$(".overview .icon").attr("src",Materia.Image.iconUrl(inst.widget.dir,275)),"undefined"!=typeof BEARD_MODE&&BEARD_MODE===!0){for(existing=$(".overview .icon_container").attr("class").split(" "),_i=0,_len=existing.length;_len>_i;_i++)e=existing[_i],"icon_container"!==e&&"big_bearded"!==e&&$(".overview .icon_container").removeClass(e);beardType=$(".widget.gameSelected .icon").attr("class").split(" ")[2],beardType="med"+beardType.substring(5),$(".overview .icon_container").addClass("big_bearded"),$(".overview .icon_container").addClass(beardType)}return $(".page").is(":hidden")?$(".page").show():$(".page").children().show(),$("#preview_button").attr("href","/preview/"+selectedWidgetInstId+"/"+inst.clean_name).click(function(){return $(this).hasClass("disabled")?!1:void 0}),$editButton.attr("href",BASE_URL+"edit/"+selectedWidgetInstId+"/"+inst.clean_name),$editButton.unbind("click"),inst.is_draft||0===inst.widget.is_playable?($(".share-widget-container").addClass("draft").fadeTo("fast",.3).children("h3").html("Publish to share with your students"),$("#play_link").attr("disabled","disabled"),$editButton.click(function(){return Materia.Coms.Json.send("widget_instance_lock",[selectedWidgetInstId],function(success){return success?window.location=$editButton.attr("href"):alert("This widget is currently locked you will be able to edit this widget when it is no longer being edited by somebody else.")}),!1})):($(".share-widget-container").removeClass("draft").fadeTo("fast",1).children("h3").html("Share with your students"),$("#play_link").unbind("click").val(BASE_URL+"play/"+String(selectedWidgetInstId)+"/"+inst.clean_name).click(function(){return $(this).select()}),$("#embed_link").unbind("click").val(getEmbedLink(inst)).click(function(){return $(this).select()}),$(".share-widget-container input").removeAttr("disabled"),$editButton.jqmodal({modal:!0,backgroundStyle:"light",className:"edit-published-widget",html:$("#t-edit-widget-published").html(),closingSelectors:[".cancel_button"]},function(){return $(".edit-published-widget .action_button").attr("href",$editButton.attr("href"))})),inst.widget.is_draft?($(".my_widgets .page .scores").hide(),$(".my_widgets .page .embed").hide()):($(".my_widgets .page .scores").show(),$(".my_widgets .page .embed").show(),inst.widget.is_scorable||$(".my_widgets .page .scores").hide(),$("#play_link").val(BASE_URL+"play/"+String(selectedWidgetInstId)+"/"+inst.clean_name),$("#embed_link").val(getEmbedLink(inst)),$("#embed_link").hide(),$(".share-widget-container span").unbind("click"),$(".share-widget-container span").click(function(e){return e.preventDefault,$("#embed_link").slideToggle("fast")}),toggleShareWidgetContainer("close"),$(".container:hidden").length>0&&$(".container").fadeIn(),$scoreWrapper=$(".scoreWrapper"),$scoreWrapper.length>1&&$scoreWrapper.slice(1).remove(),$(".show-older-scores-button").hide(),$(".chart").attr("id","").empty(),getScoreSummaries(selectedWidgetInstId,function(data){var $exportScoresButton,d,hasScores,_j,_len1,_ref;if($("#export_scores_button").unbind(),$exportScoresButton=$("#export_scores_button"),0===data.list.length)return $exportScoresButton.addClass("disabled"),$(".noScores").show(),$scoreWrapper.hide();for($(".noScores").hide(),populateScoreWrapper($scoreWrapper,data.last),data.list.length>1&&$(".show-older-scores-button").show(),hasScores=!1,_ref=data.list,_j=0,_len1=_ref.length;_len1>_j;_j++)if(d=_ref[_j],null!=d.distribution){hasScores=!0;break}return hasScores?$exportScoresButton.removeClass("disabled"):$exportScoresButton.addClass("disabled"),$('#export_scores_button:not(".disabled")').jqmodal({modal:!0,className:"csv_popup",html:$("#t-csv").html(),closingSelectors:[".cancel",".download"]},function(){return Materia.MyWidgets.Csv.buildPopup()})})),0===inst.widget.is_playable?($("#preview_button").addClass("disabled"),$(".arrow_right").addClass("disabled")):($("#preview_button").removeClass("disabled"),$(".arrow_right").removeClass("disabled")),Materia.Set.Throbber.stopSpin(".page")})})})},copyWidget=function(){var field,inst_id,newTitle;return $("#popup.copy .copy_error").hide(),field=$("#popup.copy input.newtitle"),field.val().length>0&&field.val()!==newTitle?(inst_id=$(".gameSelected").attr("id").split("_")[1],Materia.MyWidgets.Tasks.copyWidget(inst_id,field.val()),$("#popup.copy .cancel_button").click()):($("#popup.copy .copy_error").css("display","block"),newTitle=field.val())},getEmbedLink=function(inst){var draft,height,width;return width="0"!==String(inst.widget.width)?inst.widget.width:800,height="0"!==String(inst.widget.height)?inst.widget.height:600,draft=inst.is_draft?""+inst.widget.name+" Widget":inst.name,"<iframe src='"+BASE_URL+"embed/"+selectedWidgetInstId+"/"+inst.clean_name+"' width='"+width+"' height='"+height+"' style='margin:0;padding:0;border:0;'><a href='"+BASE_URL+"play/"+selectedWidgetInstId+"/"+inst.clean_name+"'>"+draft+"</a></iframe>"},loadDateRanges=function(callback){return null==dateRanges?Materia.Coms.Json.send("semester_date_ranges_get",[],function(data){return dateRanges=data,callback()}):callback()},toggleShareWidgetContainer=function(state){var $shareWidgetContainer,_ref;return $shareWidgetContainer=$(".share-widget-container"),null==state&&(state=null!=(_ref=$shareWidgetContainer.hasClass("closed"))?_ref:{open:"close"}),"open"===state?$shareWidgetContainer.switchClass("closed","",200):"close"===state?$shareWidgetContainer.switchClass("","closed",200):void 0},populateScoreWrapper=function($scoreWrapper,data){return $scoreWrapper.attr("data-semester",data.id),$scoreWrapper.attr("data-semester-str",createSemesterString(data)),$scoreWrapper.find(".view").html(data.term+" "+data.year),"undefined"==typeof data.distribution&&"undefined"!=typeof data.storage?($scoreWrapper.show(),$scoreWrapper.find("li:nth-child(1) a").hide(),$scoreWrapper.find("li:nth-child(2) a").hide(),$scoreWrapper.find("li:nth-child(3) a").show(),setScoreView(data.id,"data")):($scoreWrapper.show(),$scoreWrapper.find("li:nth-child(1) a").show(),$scoreWrapper.find("li:nth-child(2) a").show(),"undefined"==typeof data.storage?$scoreWrapper.find("li:nth-child(3) a").hide():$scoreWrapper.find("li:nth-child(3) a").show(),$scoreWrapper.find(".chart").attr("id","chart_"+data.id),setScoreView(data.id,"graph"))},processDataIntoSemesters=function(logs,getTimestampFunction){var semesters,timestamp;return semesters={},timestamp=null,$.each(logs,function(i,log){var logMeta,semesterString;return timestamp=getTimestampFunction(log),logMeta=getSemesterFromTimestamp(timestamp),semesterString=logMeta.year+" "+logMeta.semester.toLowerCase(),semesters[semesterString]||(semesters[semesterString]=[]),semesters[semesterString].push(log)}),semesters},getSemesterFromTimestamp=function(timestamp){var range,_i,_len;for(_i=0,_len=dateRanges.length;_len>_i;_i++)if(range=dateRanges[_i],timestamp>=parseInt(range.start,10)&&timestamp<=parseInt(range.end,10))return range;return void 0},normalizeStorageDataColumns=function(rows){var curRow,fields,j,r,_i,_j,_k,_len,_len1,_len2;for(fields={},_i=0,_len=rows.length;_len>_i;_i++)for(r=rows[_i],curRow=r.data,_j=0,_len1=curRow.length;_len1>_j;_j++)j=curRow[_j],"undefined"==typeof j&&(j=null);for(_k=0,_len2=rows.length;_len2>_k;_k++)r=rows[_k],r.data=$.extend({},fields,r.data);return rows},setScoreView=function(semester,newScoreView){var $scoreWrapper;switch($scoreWrapper=$('.scoreWrapper[data-semester="'+semester+'"]'),$scoreWrapper.attr("data-score-view",newScoreView),$scoreWrapper.find(".choices li.scoreTypeSelected").removeClass("scoreTypeSelected"),$scoreWrapper.find(".display.table").hide(),$scoreWrapper.find(".display.graph").hide(),$scoreWrapper.find(".display.data").hide(),newScoreView){case"graph":$scoreWrapper.find(".display.graph").show(),$scoreWrapper.find(".choices li:first-child").addClass("scoreTypeSelected"),$scoreWrapper.find(".numeric li").show();break;case"table":$scoreWrapper.find(".display.table").show(),$scoreWrapper.find(".choices li:nth-child(2)").addClass("scoreTypeSelected"),$scoreWrapper.find(".numeric li").show();break;case"data":$scoreWrapper.find(".display.data").show(),$scoreWrapper.find(".choices li:nth-child(3)").addClass("scoreTypeSelected"),$scoreWrapper.find(".numeric li").hide()}return updateSemesterScores(semester)},updateSemesterScores=function(semester){var $scoreWrapper,scoreView;switch($scoreWrapper=$('.scoreWrapper[data-semester="'+semester+'"]'),scoreView=$scoreWrapper.attr("data-score-view")){case"table":updateTable($scoreWrapper);break;case"data":updateData($scoreWrapper);break;default:updateGraph($scoreWrapper)}return updateSummary(semester)},getScoreSummaries=function(inst_id,callback){return"undefined"==typeof scoreSummaries[inst_id]?Materia.Coms.Json.send("score_summary_get",[inst_id,!0],function(data){var d,last,o,_i,_len;if(null!==data&&data.length>0){for(o={},last=data[0].id,_i=0,_len=data.length;_len>_i;_i++)d=data[_i],o[d.id]=d;scoreSummaries[inst_id]={list:data,map:o,last:data[0]}}else scoreSummaries[inst_id]={list:[],map:{},last:void 0};return callback(scoreSummaries[inst_id])}):callback(scoreSummaries[inst_id])},getPlayLogs=function(inst_id,semester,year,callback){var logKey;return logKey=""+semester+"_"+year+"_"+inst_id,null==semesterPlayLogs[logKey]?Materia.Coms.Json.send("play_logs_get",[inst_id,semester,year],function(logs){return semesterPlayLogs[logKey]=processDataIntoSemesters(logs,function(o){return o.time}),callback(semesterPlayLogs[logKey])}):callback(semesterPlayLogs[logKey])},getStorageData=function(inst_id,callback){return"undefined"==typeof storageData[inst_id]?Materia.Coms.Json.send("play_storage_get",[inst_id],function(data){var getPlayTime,semesterData,semesterId,semestersData,tableData,tableName,temp;storageData[inst_id]={},temp={},getPlayTime=function(o){return o.play.time};for(tableName in data)tableData=data[tableName],temp[tableName]=processDataIntoSemesters(tableData,getPlayTime);for(tableName in temp){semestersData=temp[tableName];for(semesterId in semestersData)semesterData=semestersData[semesterId],"undefined"==typeof storageData[inst_id][semesterId]&&(storageData[inst_id][semesterId]={}),storageData[inst_id][semesterId][tableName]=semesterData.length>STORAGE_TABLE_MAX_ROWS_SHOWN?{truncated:!0,total:semesterData.length,data:semesterData.slice(0,STORAGE_TABLE_MAX_ROWS_SHOWN)}:{truncated:!1,data:semesterData},storageData[inst_id][semesterId][tableName].data=normalizeStorageDataColumns(storageData[inst_id][semesterId][tableName].data)}return callback(storageData[inst_id])}):callback(storageData[inst_id])},updateSummary=function(semester){return getScoreSummaries(selectedWidgetInstId,function(data){var $scoreWrapper,dis,plays,semesterData,_i,_len,_ref;if(semesterData=data.map[semester],$scoreWrapper=$('.scoreWrapper[data-semester="'+semester+'"]'),plays=0,null!=semesterData.students&&$scoreWrapper.find(".players").html(semesterData.students),null!=semesterData.average&&$scoreWrapper.find(".final-average").html(semesterData.average),null!=semesterData.distribution){for(_ref=semesterData.distribution,_i=0,_len=_ref.length;_len>_i;_i++)dis=_ref[_i],plays+=dis;return $scoreWrapper.find(".score-count").html(plays)}})},updateGraph=function($scoreWrapper){var semester;return semester=$scoreWrapper.attr("data-semester"),Materia.Set.Throbber.startSpin('.scoreWrapper[data-semester="'+semester+'"]"'),getScoreSummaries(selectedWidgetInstId,function(data){var brackets;return Materia.Set.Throbber.stopSpin('.scoreWrapper[data-semester="'+semester+'"]"'),brackets=data.map[semester].distribution,Materia.MyWidgets.Statistics.createGraph("chart_"+semester,brackets)})},updateTable=function($scoreWrapper){var semester,semesterStr;return semester=$scoreWrapper.attr("data-semester"),semesterStr=$scoreWrapper.attr("data-semester-str"),Materia.Set.Throbber.startSpin('.scoreWrapper[data-semester="'+semester+'"] .display.table'),getPlayLogs(selectedWidgetInstId,semesterStr.split("_")[1],semesterStr.split("_")[0],function(logsBySemester){var $table,tableSort;return $table=$scoreWrapper.find(".display.table"),tableSort=$table.attr("data-sort"),Materia.MyWidgets.Statistics.createTable($table,logsBySemester[semesterStr.replace("_"," ")],tableSort),Materia.Set.Throbber.stopSpin('.scoreWrapper[data-semester="'+semester+'"] .display.table')})},updateData=function($scoreWrapper){var semester,semesterStr;return semester=$scoreWrapper.attr("data-semester"),semesterStr=$scoreWrapper.attr("data-semester-str"),Materia.Set.Throbber.startSpin('.scoreWrapper[data-semester="'+semester+'"] .data'),getStorageData(selectedWidgetInstId,function(data){return createStorageDataTables(data[semesterStr.replace("_"," ")],$scoreWrapper.find(".display.data")),Materia.Set.Throbber.stopSpin('.scoreWrapper[data-semester="'+semester+'"] .data')})},createStorageDataTables=function(tables,$element){var $label,$select,name,tableData,tableName,tableNames,_i,_len;$element.empty(),tableNames=[],$label=$('<div class="table-label"><h4>Table:</h4></div>'),$select=null;for(tableName in tables)tableData=tables[tableName],tableNames.push(tableName);if(1===tableNames.length)$label.append("<span>"+tableNames[0]+"</span>");else{for($select=$("<select></select>"),_i=0,_len=tableNames.length;_len>_i;_i++)name=tableNames[_i],$select.append('<option value="'+name+'">'+name+"</option>");$select.change(function(event){var selectedTableName,semester;return semester=$(event.target).parents(".scoreWrapper").attr("data-semester-str"),selectedTableName=$(event.target).find(":selected").val(),getStorageData(selectedWidgetInstId,function(data){return createStorageDataTable(data[semester.toLowerCase().replace("_"," ")][selectedTableName],$element)})}),$label.append($select)}return $element.append($label),$element.prepend('<a class="storage">Download Table</a>'),$(".storage").click(function(event){var $scoreWrapper,$tableLabel,semester,table;return event.preventDefault(),$scoreWrapper=$(event.target).parents(".scoreWrapper"),$tableLabel=$scoreWrapper.find(".table-label"),table="",table=$tableLabel.find("select").length>0?$tableLabel.find("select").val():$tableLabel.find("span").text(),""!==table?(semester=$scoreWrapper.attr("data-semester-str").replace("_","-"),window.location="/scores/storage/"+selectedWidgetInstId+"/"+table+"/"+semester):void 0}),createStorageDataTable(tables[tableNames[0]],$element)},createStorageDataTable=function(tableObject,$element){var $curTr,$headers,$table,$tbody,fieldData,fieldName,len,nullValue,row,rowData,rowName,rows,_i,_len,_ref,_ref1;if($element.find(".dataTables_wrapper").remove(),$element.find(".truncated-table").remove(),tableObject.truncated&&$element.append('<p class="truncated-table">Showing only the first '+STORAGE_TABLE_MAX_ROWS_SHOWN+" entries of this table. Download the table to see all "+tableObject.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" entries.</p>"),rows=tableObject.data,rows.length>0){$table=$("<table></table>"),$headers=$("<tr><th>user</th><th>firstName</th><th>lastName</th><th>time</th></tr>"),$tbody=$("<tbody></tbody>"),len=rows.length,_ref=rows[0].data;for(rowName in _ref)rowData=_ref[rowName],$headers.append("<th>"+rowName+"</th>");for($headers.wrap("<thead>"),$table.append($headers.parent()),_i=0,_len=rows.length;_len>_i;_i++){row=rows[_i],$curTr=$("<tr><td>"+row.play.user+"</td><td>"+row.play.firstName+"</td><td>"+row.play.lastName+"</td><td>"+row.play.time+"</td></tr>"),_ref1=row.data;for(fieldName in _ref1)fieldData=_ref1[fieldName],nullValue=null===fieldData,nullValue&&(fieldData="--"),$curTr.append("<td"+(nullValue?' class="null"':"")+">"+fieldData+"</td>");$tbody.append($curTr)}return $table.append($tbody),$element.append($table),$table.dataTable({sScrollX:"100%"})}},toggleTableSort=function(semester){var $scoreWrapper,$table,tableSort;return $scoreWrapper=$('.scoreWrapper[data-semester="'+semester+'"]'),$table=$scoreWrapper.find(".display.table"),tableSort=$table.attr("data-sort"),$(this).hasClass("up")?$(this).removeClass("up").addClass("down"):$(this).hasClass("down")&&$(this).removeClass("down").addClass("up"),$table.attr("data-sort","desc"===tableSort?"asc":"desc"),updateTable($scoreWrapper)},showAllScores=function(){return getScoreSummaries(selectedWidgetInstId,function(data){var $clone,$scores,$semester,i,_i,_ref,_results;for($semester=$(".scoreWrapper"),$scores=$(".scores"),$(".show-older-scores-button").hide(),_results=[],i=_i=1,_ref=data.list.length-1;_ref>=1?_ref>=_i:_i>=_ref;i=_ref>=1?++_i:--_i)$clone=$semester.clone(),$scores.append($clone),_results.push(populateScoreWrapper($clone,data.list[i]));return _results})},createSemesterString=function(o){return(o.year+"_"+o.term).toLowerCase()},noWidgets=function(){var rightSide;return $("section.page").hide(),rightSide=$("section.directions"),rightSide.show(),rightSide.children("h1").html("You have no widgets!"),rightSide.children("p").html("Make a new widget in the widget catalog."),$("header nav ul li:first-child").qtip({content:"Click here to start making a new widget!",position:{corner:{target:"bottomMiddle",tooltip:"topMiddle"},adjust:{y:15}},style:{background:"#b944cc",color:"#ffffff",padding:10,border:{width:2,radius:5,color:"#b944cc"},tip:{corner:"topMiddle",size:{width:15,height:10}}},show:{ready:!0}})},{init:init,noAccess:noAccess,populateAvailability:populateAvailability,populateAttempts:populateAttempts,setSelected:setSelected,getCurrentSemester:getCurrentSemester,setScoreView:setScoreView,toggleTableSort:toggleTableSort,showAllScores:showAllScores,toggleShareWidgetContainer:toggleShareWidgetContainer,selectedWidgetInstId:selectedWidgetInstId,noWidgets:noWidgets,getSelectedId:getSelectedId}}()}).call(this);