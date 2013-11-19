(function(){Namespace("Materia.Permissions").Widget=function(){var buildPermsList,init,saveAndClose;return init=function(){},buildPermsList=function(){var access_list,expiration_bridge,found,id,popup_data,selectedGame,user_ids;return expiration_bridge=[],$("#popup .access_list div.user_perm").each(function(){var existing_user_id;return existing_user_id=parseInt($(this).data("user-id")),expiration_bridge[existing_user_id]=$(this).data("expirationDate")}),$("#popup .access_list").empty(),selectedGame=$(".gameSelected").attr("id").split("_")[1],popup_data=$("#popup.share").data(),access_list={},user_ids=[],found=-1,id=-1,Materia.User.getCurrentUser(function(current_user){return Materia.Coms.Json.send("permissions_get",[0,selectedGame],function(permInfo){var accessLevel,i,perms,user_id;perms=permInfo.widget_user_perms,accessLevel=Number(permInfo.user_perms[current_user.id][0]),0===accessLevel&&($("#popup.share .access_list").addClass("no-add-access"),$("#popup.share .cancel_button").html("Close"),$("#popup.share .input_label").remove(),$("#popup.share .user_add").remove()),"undefined"==typeof popup_data.usersToAdd&&(popup_data.current_user_access=accessLevel,popup_data.usersToAdd=[],popup_data.usersToRemove=[]);for(id in popup_data.usersToRemove)-1!==(found=$.inArray(popup_data.usersToRemove[id],popup_data.usersToAdd))&&(popup_data.usersToRemove.splice(id,1),popup_data.usersToAdd.splice(found,1));for(user_id in perms)-1===$.inArray(user_id,popup_data.usersToRemove)&&(access_list[user_id]=perms[user_id],user_ids.push(user_id));for(i in popup_data.usersToAdd)id=popup_data.usersToAdd[i],access_list[id]=[0,null],user_ids.push(id);return 0!==user_ids.length?Materia.Coms.Json.send("user_get",[user_ids],function(users){var $perm_temp,collaborator,collaboratorAccess,collaboratorExpirationTimestamp,onlyUser;users.sort(function(a,b){return a.first<b.first||a.first===b.first&&a.last<b.last||a.last===b.last&&a.middle<b.middle?-1:1}),$("body").append("<div id='permdump'></div>"),$perm_temp=$("#permdump"),$perm_temp.addClass("user_perm"),$perm_temp.append($("#t-share-person").html()),onlyUser=1===users.length;for(i in users)collaborator=users[i],collaboratorAccess=parseInt(access_list[collaborator.id][0],10),collaboratorExpirationTimestamp=null!=expiration_bridge[collaborator.id]?expiration_bridge[collaborator.id]:access_list[collaborator.id][1],Materia.Permissions.User.createCollaboratorRow(collaborator,collaboratorAccess,accessLevel,collaboratorExpirationTimestamp);return $perm_temp.remove(),$("#popup").tablock("reset")}):void 0})})},saveAndClose=function(){return Materia.Set.Throbber.startSpin("#popup"),Materia.User.getCurrentUser(function(current_user){var allUserPerms,collaboration_count,delete_self,inst_id,popup_data,str,user,usersToAdd,usersToRemove,_i,_len;if(inst_id=$(".gameSelected").attr("id").split("_")[1],allUserPerms=[],collaboration_count=0,popup_data=$("#popup.share").data(),usersToRemove=popup_data.usersToRemove,usersToAdd=popup_data.usersToAdd,delete_self=-1!==$.inArray(current_user.id,usersToRemove),0===popup_data.current_user_access)return delete_self&&Materia.Permissions.User.updatePerms([{user_id:current_user.id,expiration:null,perms:[!1]}],function(){return Materia.Widget.removeWidget(inst_id)}),Materia.Set.Throbber.stopSpin("#popup"),void 0;for($("#popup.share .user_perm").each(function(){var p,userPerm;return p=$(this).data(),p.currentUser||null!==p.expirationDate&&1e3*p.expirationDate<(new Date).valueOf()||collaboration_count++,userPerm={},userPerm.user_id=p.userId,userPerm.expiration=p.expirationDate,userPerm.perms=[],userPerm.perms[p.access]=!0,allUserPerms.push(userPerm)}),_i=0,_len=usersToRemove.length;_len>_i;_i++)user=usersToRemove[_i],allUserPerms.push({user_id:user,expiration:null,perms:[!1]});return Materia.Permissions.User.updatePerms(allUserPerms,function(){Materia.Set.Throbber.stopSpin("#popup"),delete_self&&Materia.Widget.removeWidget(inst_id)}),str="Collaborate",collaboration_count>0&&(str+=" ("+collaboration_count+")"),$("#share_widget_link").text(str)})},{init:init,buildPermsList:buildPermsList,saveAndClose:saveAndClose}}()}).call(this);