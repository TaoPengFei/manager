$(document).ready(function() {
	

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
	
	// 创建表格
	$("#list4").jqGrid({
		// url:"corp_getCorpByObj.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST", // 提交方式
		// height:'100%', //高度，表格高度。可为数值、百分比或'auto'
		height : 'auto',
		autowidth : true,
		// width:'100%',//自动宽
		colNames : [ '', '菜单名', '菜单地址', '状态', '最后的修改时间' ],
		colModel : [ {name : 'menuid',index : 'menuid',width : '100%',align : 'center',hidden : true}, 
		             {name : 'menuname',index : 'menuname',width : '100%',align : "center"},
		             {name : 'menupath',index : 'menupath',width : '150%',align : "center"}, 
		             {name : 'menustatus',index : 'menustatus',width : '100%',align : "center"}, 
		             {name : 'modifydate',index : 'modifydate',width : '150%',align : "center",
		            	 formatter : 'date',formatoptions : {
		            		 srcformat : 'Y-m-d H:i:s',
		            		 newformat : 'Y-m-d H:i:s'}
		             }, ],
		rownumbers : true, // 添加左侧行号
		altRows : false, // 设置为交替行表格,默认为false
		viewrecords : true, // 是否在浏览导航栏显示记录总数
		rowNum : RowNum, // 每页显示记录数
		rowTotal : 2000,
		loadonce : true,
		rowList : [ 15, 20, 30, 50, 100 ], // 用于改变显示行数的下拉列表框的元素数组。
		multiselect : true,//添加一列选择列
		jsonReader : {
			root : "data",
			records : "totalCount"
		},
		pager : $('#gridPager'),
		ondblClickRow : function(rowid, iRow, iCol, e) {
			var rowDatas = $("#list4").getRowData(rowid);
			corpid = rowDatas["corpid"];
			// 获得每行的数据
			$("#corpcode").val(rowDatas["corpcode"]);
			// 设置按钮禁用
			$("#corpcode").attr("disabled", true);
			$("#menu_name").val(rowDatas["menuname"]);
			$("#unuserdiv").val(rowDatas["menustatus"]);
			$("#menu_address").val(rowDatas["menupath"]);
			$("#menuinfoModalLabel").text("修改菜单信息");
			$("#menuModal").modal('show');
		}
	});

	// 查询
	$("#menu_query").click(function() {
		var set_up_qry = $("#menu_type option:selected").text();
		$("#list4").jqGrid('setGridParam', {
			url : 'menuManage_selectMenu.do',
			datatype : 'json',
			postData : {
				set_up_qry : set_up_qry,
			}, // 发送数据
			page : 1
		}).trigger("reloadGrid");// 重新载入

	});

	// 新增弹窗
	$("#menu_add").click(function() {
		//先 
		$("#choice_menutype option:selected").val();
		$("#unuserdiv").css("display","none");
		$("#menu_name").val("");
		$("#menu_address").val("");
		$("#menuinfoModalLabel").text("新增菜单");
		$("#menuModal").modal('show');
	});
	
	//新增保存
	$("#menu_save").click(function() {
		var menuType = $("#choice_menutype option:selected").val();
		if(menuType=="请选择菜单类型"){
			alert("请选择菜单类型");
			return;
		}
		var menuName = $("#menu_name").val();
		var menuAddress = $("#menu_address").val();
		var unuser = $("#unuser option:selected").val();
		//获得id
		//var rowIds = $("#list4").jqGrid('getGridParam','selarrrow');
		var menuId ;
//		for(var i in rowIds){
//			var id = rowIds[i];
//			var rowData = $("#list4").jqGrid('getRowData',id);
//			 menuId = rowData["menuid"];
//		}
		$.ajax({
			type: 'POST',
			url: 'menuManage_insertMenu.do',
			datatype: 'json',
			data: {
				menuType : menuType,
				menuName : menuName,
				menuAddress : menuAddress,
//				unuser : unuser,
//				menuId : menuId,
			},
			success:function(data,textStatus){
				if(data){
					if(data.constructor == String){
						data = eval("("+data+")");
					}					
					var notecode = data.data[0].ret;
					if(notecode == "1"){
						alert("保存成功");
						$("#menuModal").modal('hide');
						$("#menu_query").trigger("click"); //重新载入																								
					}else {
						alert("保存失败");
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert("保存失败，数据遗失到二次元空间");
			}
		});
	});
	
	//删除
	$("#menu_delete").click(function(){
		var rowIds = $("#list4").jqGrid('getGridParam','selarrrow');
		if(rowIds.length <=0){
			alert("请选择要删除的行");
			return;
		}
		var menuArray = new Array();
		for(var i in rowIds){
			var id = rowIds[i];
			var rowData = $("#list4").jqGrid('getRowData',id);
			var menuId = rowData["menuid"];
			menuArray.push({menuId:menuId});
		}
		$.ajax({
			type:'POST',
			url:'menuManage_deleteMenu.do',
			datatype:'josn',
			async:false,//请求类型 默认为true异步请求，设为false用户需等请求完成后才能操作
			cache:false,//缓存页面，默认为true缓存此页面
			data:{
				menuArray:JSON.stringify(menuArray),
			},
			success:function(data,textStatus){
				if(data){
					if(data.constructor == String){
						data = eval("("+data+")");
					}					
					var notecode = data.data[0].ret;
					if(notecode == "1"){
						alert("删除成功");
						$("#menulModal").modal('hide');
					    $("#menu_query").trigger("click"); //重新载入																								
					}else {
						alert("删除失败");
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert(XMLHttpRequest + textStatus + errorThrown);
				alert("迷失在二次元空间");
			},
		});
	});
	
	//修改菜单
	$("#menu_update").click(function(){
		var rowIds = $("#list4").jqGrid('getGridParam','selarrrow');
		if(rowIds.length <=0){
			alert("请选择要修改的行");
			return;
		}
		var menuArray = new Array();
		for(var i in rowIds){
			var id = rowIds[i];
			var rowData = $("#list4").jqGrid('getRowData',id);
			var menuId = rowData["menuid"];
			$("#menu_name").val(rowData["menuname"]);
			$("#unuserdiv").val(rowData["menustatus"]);
			$("#menu_address").val(rowData["menupath"]);
			$("#menuinfoModalLabel").text("修改菜单信息");
			$("#menuModal").modal('show');
		}
	});
})
