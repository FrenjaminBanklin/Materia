(function(){Namespace("Materia.Sorter").Filter=function(){var appendWidgets,filter,sort,textSearch,widgetSearch;return filter=function(programSort){var contains,defaultProgram,notcontains,programName;return contains=".widget",notcontains="",programName=programSort.val(),defaultProgram=programSort.children("option:first-child").val(),$('.features dt input[type="checkbox"]:checked').each(function(){return contains+=":.widget:contains('"+$(this).val()+"')",notcontains+=".widget:not(:contains('"+$(this).val()+"')), "}),$('.features .supported-data input[type="checkbox"]:checked').each(function(){return contains+=":.widget:contains('"+$(this).val()+"')",notcontains+=".widget:not(:contains('"+$(this).val()+"')), "}),programName!==defaultProgram&&(contains+=":.widget:contains("+programName+")",notcontains+=".widget:not(:contains("+programName+")), "),$(notcontains).fadeTo("fast",.2),$(contains).fadeTo("fast",1)},sort=function(widgets){var sortedData;return null==widgets&&(widgets=$(".widgets .widget")),sortedData=widgets.sorted({by:function(v){return $(v).find("h1").text().toLowerCase()}}),appendWidgets(sortedData)},appendWidgets=function(sortedData){var $widgets,data,_i,_len;for($widgets=$(".widgets"),_i=0,_len=sortedData.length;_len>_i;_i++)data=sortedData[_i],$widgets.append(data);return $(".widget").mouseenter(function(){var card,pos;return pos=$(this).index(".widget"),card=Materia.Widget.Catalog.showInfocard(pos),null!=card?card.mouseleave(function(){return Materia.Widget.Catalog.removeInfocard()}):void 0})},widgetSearch=function(searchValue,section){var found,pattern;return found=!1,pattern=new RegExp(searchValue,"i"),$(section).find(".searchable").each(function(){var matches,repl;return repl=/<span class=[\'|\"]{1}highlighted[\'|\"]>([^<]*)<\/span>/i,null!==$(this).html().match(repl)&&$(this).html($(this).html().replace(repl,"$1")),matches=$(this).html().match(pattern),null!==$(this).html().match(pattern)&&""!==searchValue?($(this).html($(this).html().replace(pattern,"<span class='highlighted'>"+matches+"</span>")),found=!0):""===searchValue?found=!0:void 0}),found},textSearch=function(searchValue){return $(".widgets").children("section").each(function(){var found;return found=testSearch(searchValue,$(this)),found===!1?$(this).fadeTo(1,.2):$(this).fadeTo(1,1)})},{filter:filter,sort:sort}}()}).call(this);