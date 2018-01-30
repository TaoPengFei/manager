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
$(document).ready(function(){
	 var EmpId = "";
	 var lan;
	 //alert(document.acceptLanguage);
	 var language= navigator.language?navigator.language:navigator.userLanguage ;
	 if(language.indexOf('en') > -1){
		 lan=lanI18n["en"];
	 }else {
		 lan=lanI18n["ch"];
	 }
	 $("#empreset").click(function(){
		 $("#empinfo-form")[0].reset();
	 });
	 
		$("#myModal").modal({show:false});
		$('#myModal').modal().css({
		    width: 'auto',
		    'margin-left':'auto',
		    'margin-right':'auto',
		    'margin-top': function () {
		    	return  ($(this).height() / 4);
		    },
		
		});
		
		$.ajax({
            url:'../role/roleLoad.do',
            dataType:"json",
            type:"POST",
            success: function(data,textStatus) {
            	var parent = $("#newRole");  
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
		
		
		$("#listEmp").jqGrid({
			datatype:"json",	 //数据来源，本地数据
			mtype:"POST",		//提交方式
			height:'auto',
			autowidth:true,		//自动宽
			colNames:[lan.userName,lan.password,lan.roleName,lan.desc,lan.status],
			colModel:[
			            {name:'userName',index:'userName', width:'100', align:"center"},
			            {name:'password',index:'password', width:'100', align:"center",hidden:true},
			            {name:'roleName',index:'roleName', width:'100', align:"center"},
			            {name:'description',index:'description', width:'100', align:"center"},
			            {name:'enabled',index:'enabled', width:'30', align:"center", formatter:'select',editoptions:{value:"true:"+lan.enable+";false:"+lan.unable}, editable:false}
			           
			        ],
			rownumbers:true,	//添加左侧行号
			altRows:false,		//设置为交替行表格,默认为false
			viewrecords: true,  //是否在浏览导航栏显示记录总数
		    rowNum:RowNum,	//每页显示记录数
		    loadonce:true,
		    rowList:[15,20,30,50,100],  //用于改变显示行数的下拉列表框的元素数组。
		    jsonReader:{
		    	root: "data",		    	 
		    	records: "totalCount"
	        },
	        postData:{
			},
	        pager:$('#empPager'),
	        onSelectRow:function(rowid,status){
	        	var rowDatas = $("#listEmp").getRowData(rowid);
	        	if(rowDatas["enabled"] == "false"){
	        		$("#flagUser").text(lan.enable);
	        	}else{
	        		$("#flagUser").text(lan.unable);
	        	}
	        },
	        ondblClickRow : function(rowid, iRow, iCol, e) {
	        	$("#myModalLabel").html(lan.verifyUser);
	        	var rowDatas = $("#listEmp").getRowData(rowid);
		        	$("#newUserName").val(rowDatas["userName"]);
		        	$("#newUserName").attr("disabled",true);
		        	$("#newRole").val(rowDatas["roleName"]);
		        	$("#newDesc").val(rowDatas["description"]);
					$("#myModal").modal('show');
			}
		});
		
		
		$("#queryEmp").click(function(){
			var userName = $("#userName").val();
			
			  $("#listEmp").jqGrid('setGridParam',{ 
				  url:"queryUser.do",
			        datatype:'json',  
			        postData:{
			        	userName:userName
			        			}, //发送数据  
			        page:1  
			    }).trigger("reloadGrid"); //重新载入
		});
	
	$("#flagUser").click(function(){
		var rowId = $("#listEmp").jqGrid('getGridParam', 'selrow');
		if (rowId == null) {
			alert(lan.choseRow);
			return;
		}
		var rowData = $("#listEmp").jqGrid('getRowData', rowId);
		 if(rowData["enabled"] == "false"){
			 updateEnabled(rowData["userName"],true);
		 }else{
			 updateEnabled(rowData["userName"],false);
		 } 
	});
	function updateEnabled(userName,enabled){
		 $.ajax({
				type:"POST",
				url : 'updateUser.do',
				dataType: "json",
				async:false,
				cache:true,
				
				data:{
					name:userName,
					enabled:enabled
					},
				success:function(data,textStatus){
					
					if(data){
						if(data.constructor == String){
							data = eval("("+data+")");
						}
						var notecode = data.code;									
						if(notecode == "1"){
							$("#queryEmp").trigger("click");
							alert(lan.opSuccess);
						}else if(notecode == "-2"){
							alert(data.msg);
						}else {
							alert(lan.opFailed);
						}
					}
				},   
				error:function(XMLHttpRequest, textStatus, errorThrown){
					alert(errorThrown);
				}			
			});	
	}
	
	
	 $("#addEmp").click(function(){
		 $("#myModalForm")[0].reset();
		 $("#myModalLabel").html(lan.addUser);
		 $("#newUserName").attr("disabled",false);
		 $("#myModal").modal('show');
	 });
	 
	 $("#btn_save").click(function(){
		 var oldName = "";
		 var oldRole="";
		 var enabled;
		 var url = "";
		 var rowId = $("#listEmp").jqGrid('getGridParam', 'selrow');
		 if(rowId != null && rowId >0){ 
			 var rowData = $("#listEmp").jqGrid('getRowData', rowId);
			 oldName=rowData["userName"];
			 oldRole=rowData["roleName"];
			 enabled = rowData["enabled"];
		}
		 var addOrUpdate = $("#myModalLabel").text();
		 var userName = $("#newUserName").val();
		 var newDesc = $("#newDesc").val();
		 var role = $("#newRole option:selected").val();
		 var newPassword = $("#password").val();
		 var confirmPassword = $("#confirmpwd").val();
		 if(userName == '' || userName== null){
			 alert(lan.enterName);
			 return;
		 }else if(role == '' || role== null){
			 alert(lan.enterRole);
			 return;
		 }
		 if(addOrUpdate == lan.addUser){
			 if(newPassword == null || newPassword ==''){
				 alert(lan.enterPwd);
				 return;
			 }else if(newPassword != confirmPassword){
				 alert(lan.passDiff);
				 return;
			 }else{
				 url = "addUser.do";
			 }
		 }else {
			 if(newPassword != confirmPassword){
				 alert(lan.pwdDiff);
				 return;
			 }
			url = "updateUser.do";
		}
		 $.ajax({
				type:"POST",
				url : url,
				dataType: "json",
				async:false,
				cache:true,
				
				data:{	
						name:userName,
						password:newPassword,
						role:role,
						oldRole:oldRole,
						desc:newDesc,
						enabled:enabled
					  },
				success:function(data,textStatus){
					
					if(data){
						if(data.constructor == String){
							data = eval("("+data+")");
						}
						var notecode = data.code;									
						if(notecode == "1"){
							 $("#empinfo-form")[0].reset();
							 $("#myModal").modal('hide');
							alert(lan.opSuccess);
							$("#queryEmp").trigger("click");
						}else if(notecode == "-2"){
							alert(data.msg);
						}else {
							alert(lan.opFailed);
						}
					}
				},   
				error:function(XMLHttpRequest, textStatus, errorThrown){
					alert(errorThrown);					
				}			
			});		
	 });
});