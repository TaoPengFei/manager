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
$(document).ready(
		function() {
			var language= navigator.language?navigator.language:navigator.userLanguage ;
			 if(language.indexOf('en') > -1){
				 lan=lanI18n["en"];
			 }else {
				 lan=lanI18n["ch"];
			 }
			/**
			 * 设置弹出框位置
			 */
			$("#myModal").modal({show:false});
			$('#myModal').modal().css({
			    width: 'auto',
			    'margin-left':'auto',
			    'margin-right':'auto',
			    'margin-top': function () {
			    	return  ($(this).height() / 4);
			    },
			});
			
			$("#roleList").jqGrid({						
						datatype : "json", // 数据来源，本地数据
						mtype : "POST", // 提交方式
						height : '100%', // 高度，表格高度。可为数值、百分比或'auto'
						autowidth : true, // 自动宽
						colNames : [lan.roleName, lan.roleDesc],
						colModel : [ 
						             {name : 'roleName',index : 'roleName',width : '50%',align : "center"},
						             {name : 'roleDesc',index : 'roleDesc',width : '100%',align : "left"}],
						rownumbers : true, // 添加左侧行号
						altRows : false, // 设置为交替行表格,默认为false
						viewrecords : true, // 是否在浏览导航栏显示记录总数
						rowNum : RowNum, // 每页显示记录数
						rowTotal: 2000,
					    loadonce:true,
						rowList : [15,20,30, 50,100 ], // 用于改变显示行数的下拉列表框的元素数组。
						jsonReader : {
							root : "data"
						},
						pager : $('#rolePager')
					});
			/**
			 * 查询
			 */
			$("#queryRole").click(function() {
				var roleName = $("#roleName").val();
				$("#roleList").jqGrid('setGridParam', {
					url : "getRoles.do",
					datatype : 'json',
					search : true,
					postData : {
						roleName : roleName
					}, // 发送数据
					page : 1
				}).trigger("reloadGrid"); // 重新载入
			});
			
			/**
			 * 重置
			 */
			$("#reset").click(function() {
				$("#roleName").val("");
			});
			
			/**
			 * 显示角色创建窗口
			 */
			$("#addRole").click(function(){
				$("#myModal").modal('show');
			});
			
			/**
			 * 保存角色
			 */
			$("#btn_save").click(function(){
				var roleName = $("#newRole").val();
				var roleDesc = $("#newDesc").val();
				if(roleName == ""){
					alert(lan.enterRole);
					return;
				}
				$.ajax({
					type : "POST",
					url:'addRole.do',
					datatype:'json',
					async : false,
					cache : true,
					data:{
						roleName:roleName,
						roleDesc:roleDesc
					},
					success : function(data,textStatus) {
						if(data){
							if(data.constructor == String){
								data = eval("("+data+")");
							}
							
							var ret = data.code;
							if(ret == "1"){
								$("#myModalForm")[0].reset();									
								$('#myModal').modal('hide');
								$("#queryRole").trigger("click");
								alert(lan.opSuccess);
								
							}else{
								alert(lan.opFailed);
							}
						}					
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert(errorThrown);
					}
				});	
			});
			
			/**
			 * 删除角色
			 */
			$("#delRole").click(function(){
				var rowId = $("#roleList").jqGrid("getGridParam","selrow");
				var rowData = $("#roleList").getRowData(rowId);
				if($.isEmptyObject(rowData)){
					alert(lan.choseRow);
					return;
				}
				$.ajax({
					type : "POST",
					url:'delRole.do',
					datatype:'json',
					async : false,
					cache : true,
					data:{
						roleName:rowData["roleName"]
					},
					success : function(data,textStatus) {
						if(data){
							if(data.constructor == String){
								data = eval("("+data+")");
							}
							
							var ret = data.code;
							if(ret == "1"){
								$("#queryRole").trigger("click");
								alert(lan.opSuccess);
							}else{
								alert(lan.opFailed);
							}
						}					
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert(errorThrown);
					}
				});
			});
		});