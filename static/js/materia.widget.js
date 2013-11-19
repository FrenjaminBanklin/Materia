(function(){Namespace("Materia").Widget=function(){var addWidget,cache,getWidget,getWidgets,removeWidget,saveWidget,sortWidgets,widgetTemplate,_buildSidebar,_widgets;return _widgets=[],widgetTemplate=null,cache=null,sortWidgets=function(){return null==cache&&(cache=_widgets.slice(),cache.sort(function(a,b){return b.created_at-a.created_at})),_buildSidebar(cache)},getWidgets=function(callback){return 0===_widgets.length?(Materia.WidgetInstance.clearAll(),Materia.WidgetInstance.getAll(function(widgets){return _widgets=widgets,callback(_widgets)})):callback(_widgets)},_buildSidebar=function(cachedWidgets){var $clone,$clonedListItem,cached,clonedHtml,clonedListItem,fixedHtml,i,myWidgets,rand,widgetList,_i,_len,_ref;for(myWidgets=[],widgetTemplate||(widgetTemplate=$("div[data-template=widget-list]")),$clone=widgetTemplate.clone().removeClass("_template_evenOdd").removeClass("template").removeAttr("data-template").addClass("widget"),clonedHtml=$clone.wrap("<div>").parent().html(),widgetList=$('<div class="widget_list"></div>'),i=_i=0,_len=cachedWidgets.length;_len>_i;i=++_i)cached=cachedWidgets[i],fixedHtml=clonedHtml.replace("_template_title",cached.name).replace("_template_type",cached.widget.name).replace("_template_scores",cached.numPlays+(null!=(_ref=cached.numPlays>1)?_ref:{s:""})),$clonedListItem=$(fixedHtml).attr("id","widget_"+cached.id).attr("data-created",cached.dateCreate).addClass(i%2===0?"odd":"even"),cached.is_draft===!0&&($clonedListItem.addClass("is_draft"),$clonedListItem.find(".score").html("Draft")),$clonedListItem.children(".icon").attr("src",Materia.Image.iconUrl(cached.widget.dir,60)),"undefined"!=typeof BEARD_MODE&&null!==BEARD_MODE&&BEARD_MODE===!0&&(rand=Math.floor(Math.random()*beards.length+1)-1,$clonedListItem.children("div:first-child").addClass("small_"+beards[rand])),clonedListItem=$clonedListItem.get(0),cached.element=clonedListItem,myWidgets.push(clonedListItem);return $(widgetList).append(myWidgets),$(".courses").animate({opacity:.1},100,function(){var $courses,$currentWidget,parPos,selectedId;return $(".courses").html(widgetList),selectedId=Materia.MyWidgets.SelectedWidget.getSelectedId(),selectedId&&($currentWidget=$("#widget_"+selectedId),$currentWidget.addClass("gameSelected"),$courses=$currentWidget.parent().parent().parent(),parPos=$courses.offset(),$(".courses").scrollTop(0)),$(".courses").animate({opacity:1},100,function(){var pos;return Materia.MyWidgets.SelectedWidget.getSelectedId()?(pos=$(".gameSelected").position(),$(".courses").animate({scrollTop:pos.top-200})):void 0})})},getWidget=function(inst_id,callback){return Materia.WidgetInstance.get(inst_id,callback)},saveWidget=function(_params,callback){var params;return params={widget_id:null,qset:null,is_draft:null,inst_id:null,open_at:null,close_at:null,attempts:null},$.extend(params,_params),Materia.Coms.Json.send("widget_instance_save",[params.widget_id,params.name,params.qset,params.is_draft,params.inst_id,params.open_at,params.close_at,params.attempts],function(widget){return null!=widget?(Materia.WidgetInstance.updateWidget(widget),callback(widget)):void 0})},addWidget=function(inst_id){return Materia.WidgetInstance.get(inst_id,function(){return Materia.WidgetInstance.get(null,function(widgets){var element;return _widgets=widgets,cache=null,element=$(".typeSelected"),element.removeClass("typeSelected"),Materia.MyWidgets.SelectedWidget.setSelected(inst_id),sortWidgets()})})},removeWidget=function(){var curWidge,i,newID,widgetList,widgetListLength,_i;if(widgetList=$(".widget_list").children(),widgetListLength=widgetList.size(),newID=null,widgetListLength>1)for(curWidge=$(".gameSelected"),newID=curWidge.is(":first-child")?curWidge.next().attr("id").split("_")[1]:curWidge.prev().attr("id").split("_")[1],curWidge.remove(),$(".odd").removeClass("odd"),$(".even").removeClass("even"),i=_i=0;widgetListLength>=0?widgetListLength>=_i:_i>=widgetListLength;i=widgetListLength>=0?++_i:--_i)$(widgetList[i]).addClass(i%2===0?"odd":"even");else $(".gameSelected").remove();return null!=newID?Materia.MyWidgets.SelectedWidget.setSelected(newID):Materia.MyWidgets.SelectedWidget.noWidgets()},{getWidgets:getWidgets,getWidget:getWidget,sortWidgets:sortWidgets,saveWidget:saveWidget,addWidget:addWidget,removeWidget:removeWidget}}()}).call(this);