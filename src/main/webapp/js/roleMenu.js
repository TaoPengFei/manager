var language = navigator.language ? navigator.language: navigator.userLanguage ;
var oHead = document.getElementsByTagName('HEAD').item(0);
var oScript = document.createElement("script");
oScript.type = "text/javascript";
if (language.indexOf('en') > -1) {
	oScript.src="../js/jqgrid/js/i18n/grid.locale-en.js";
} else {
	oScript.src="../js/jqgrid/js/i18n/grid.locale-cn.js";
}
oHead.appendChild( oScript)
$(document).ready(function() {
	 var lan;
	 var language= navigator.language?navigator.language:navigator.userLanguage ;
	 if(language.indexOf('en') > -1){
		 lan=lanI18n["en"];
	 }else {
		 lan=lanI18n["ch"];
	 }
	$.ajax({
        url:'../role/roleLoad.do',
        dataType:"json",
        type:"POST",
        success: function(data,textStatus) {
        	var parent = $("#roleName");  
		    if(data){
		    	parent.empty();  //打开窗口先删除子节点
		    	parent.append("<option value=0>"+lan.select+"</option>");
	 		    for ( var id in data.data) {
	 		    	var child = $("<option value='"+data.data[id]+"'>"+data.data[id]+"</option>");
	 				   parent.append(child);
				}
 		    }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        }
   });
	
	$("#roleName").change(function(){
		var roleName = $('#roleName option:selected').val();
		//角色没有的菜单
		var menuLeft = $("#menuLeft");
		//角色已有的菜单
		var menuRight= $("#menuRight");
		
		menuLeft.empty();
		menuRight.empty();
		if(roleName == "0"){
			return;
		}
		$.ajax({
	        url:'getMenus.do',
	        dataType:"json",
	        type:"POST",
	        data:{roleName:roleName},
	        success: function(data,textStatus) {
			    if(data){
			    	if(data.constructor == String){
						data = eval("("+data+")");
					}
					var notecode = data.code;									
					if(notecode == "1"){
						
						//遍历角色没有的菜单				
						$.each(data.menuWithoutRole,function(menuid,menu){
							var child = $("<option value='"+menu.menuid+"'>"+menu.menuname+"</option>");
							menuLeft.append(child);
						});
						
						//遍历角色的菜单
						$.each(data.menuWithRole,function(menuid,menu){
							
							var child = $("<option value='"+menu.menuid+"'>"+menu.menuname+"</option>");
							menuRight.append(child);
						});
						
						
					}else if(notecode == "-2"){
						alert(data.msg);
					}else {
						alert(lan.opFailed);
					}
	 		    }else{
	 		    	alert(lan.opFailed);
	 		    }
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	alert(errorThrown);
	        }
		});
	});
	
	$("#btnAdd").click(function(){
		var roleName = $('#roleName').val();
		var menuLeftVal = $("#menuLeft").val();
		alert(menuLeftVal);
		if(menuLeftVal == null){
			alert(lan.choseRow);
			return;
		}
		$.ajax({
			 url:'insertRoleMenu.do',
		     dataType:"json",
		     type:"POST",
		     data:{roleName:roleName,menuIds:menuLeftVal},
		     success: function(data,textStatus) {
		    	 if(data){
				    	if(data.constructor == String){
							data = eval("("+data+")");
						}
				    	
				    	if(data.code == "1"){
				    		$("#roleName").trigger("change");
				    	}else{
				    		alert(lan.opFailed);
				    	}
		    	 }else{
		 		    alert(lan.opFailed);
		 		 }
		     },
		     error:function(XMLHttpRequest, textStatus, errorThrown){
		        	alert(errorThrown);
		     }
		});
		
	});
	
	$("#btnRemove").click(function(){
		var roleName = $('#roleName').val();
		var menuRightVal = $("#menuRight").val();
		if(menuRightVal == null){
			alert(lan.choseRow);
			return;
		}
		$.ajax({
			 url:'deleteRoleMenu.do',
		     dataType:"json",
		     type:"POST",
		     data:{roleName:roleName,menuIds:menuRightVal},
		     success: function(data,textStatus) {
		    	 if(data){
				    	if(data.constructor == String){
							data = eval("("+data+")");
						}
				    	
				    	if(data.code == "1"){
				    		$("#roleName").trigger("change");
				    	}else{
				    		alert(lan.opFailed);
				    	}
		    	 }else{
		 		    alert(lan.opFailed);
		 		 }
		     },
		     error:function(XMLHttpRequest, textStatus, errorThrown){
		        	alert(errorThrown);
		     }
		});
	});
})
