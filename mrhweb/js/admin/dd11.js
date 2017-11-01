
//     $('.filter-api').click(function(e) {
//			var $tableTr = $("table").find(" > tbody > tr:not(.footable-row-detail) > td:first-child"); 
//			var $text = $('.filter-api');
//			var text = $('.filter-api').text();
//			if(text == "全部展开"){
//				$text.text("全部收回");
//			} else {
//				$text.text("全部展开");
//			}          
//			$tableTr.each(function(index,tr){
//				//alert(tr);
//				$(tr).trigger('footable_toggle_row');
//			});
//      });
    
    initTypes = function(){
    		var $st = $("div.col-sm-6 .type");
    		for(var key in window._dictEntitys["downloadType"]){
    			$st.append("<option value="+key+">"+window._dictEntitys["downloadType"][key]+"</option>");
    		}
    }
    
	keywordSearch = function (obj){
			var text = $.trim($(obj).val())
			if("" != text){
				window._queryOptions.options.keyword = text;
				window._queryOptions.title = null;
				window._queryOptions.options.page.pageNo = 1;
				window._queryOptions.query();
			}else{
				$(obj).val("");
				$(obj).attr('placeholder','搜索列表');
			}
	}

	queryDownls = function(){
		(function(w){
		if(w.title != null)
		createTitle(w.options.parentId,w.title);
			window._postDataJson({
	    		url : window._BasePath + "/governor/dowload/findchild.json",
	    		data : w.options,
	    		success : function(data){
	    			w.options.page = data.data.page;
	    			w.options.id = null;
	    			w.title = null;
	    			var downlList = data.data.list;
	    			tr_tdList(downlList);
	    			var $pag = $(".pagination");
	    			$pag.empty().append(createPageCount(w.options.page));
	    		}
    		});	
		})(window._queryOptions);
	}    
	
	tr_tdList = function(d){
			var $oldF = $('#footable-res2');
			$oldF.remove();
			if(d != undefined){
			(function(w){
				var $newF = w.f.clone(true);
				w.$bodyNest.append($newF);
				var $tbody = $newF.find("tbody");
				for(var i = 0 ,length = d.length; i < length; i ++){
					var $tr = $("<tr></tr>");
					var $td0 = $("<td>"+d[i].title+"</td>");
					var $td1 = $("<td><a href=\""+d[i].onDiskUrl+"\" target='_blank'>"+d[i].onDiskUrl+"</a></td>");
					var $td2 = $("<td>"+d[i].password+"</td>");
					var $td3 = $("<td>"+window._dictEntitys["downloadType"][d[i].type]+"</td>");
					var $td4 = $("<td></td>");
					var rL = d[i].mrhDownloads;
					a_rlList($td4,rL);
					var $td5 = $("<td  parentid='"+d[i].id+"'></td>");
					var $td6 = $("<td></td>");
					var $span1 = $('<span class="status-metro status-active"><a href="'+window._BasePath+'/governor/dowload/edit.do?id='+d[i].id+'">编辑</a></span>');
					var $span2 = $("<span class='status-metro status-suspended'>删除</span>")
									.attr({"onclick":"deleteDownl(this,'"+d[i].id+"','"+d[i].type+"','"+d[i].none+"')"});
					$td6.append($span1).append($span2);
					if(d[i].type == 1){
						var str = "展开文件夹";
						if(d[i].none == false){
							str = "空文件夹";
						}
						var $span3 = $("<span class='status-metro status-disabled'>"+str+"</span>")
									.attr({"onclick":"openFolder('"+d[i].id+"','"+d[i].title+"')"});
						$td6.append($span3);
					}
					var strNo = "";
					if(d[i].stick){
						strNo = "checked='checked'";
					}
					var labelNo = "<label class='switch switch-danger'><input type='checkbox' class='switch-input'" +
						" onclick=\"stickThis('"+d[i].id+"',this);\" "+strNo+"><span class='switch-label' data-on='On'" +
						" data-off='Off'></span><span class='switch-handle'></span></label>";
					$td6.append($(labelNo));
					$tr.append($td0).append($td1).append($td2).append($td3).append($td4).append($td5).append($td6);
					$tbody.append($tr);
				}
				$newF.footable();
				})(window._queryOptions);
			}
	}
	
	a_rlList = function($td,r){
			var lh = r.length;
			if(lh > 0){
				for(var i = 0; i < lh; i ++){
					var $a = $("<a>"+r[i].title+"</a>").attr({href:window._BasePath + "/governor/dowload/edit.do?id="+r[i].id});
					$td.append($a);
				}
			}else{
				$td.append("<span>暂无相关资料</span>");
			}
	}
	
	stickThis = function(id,obj){
		var stick = "no";
		if(obj.checked)stick = "yes";
		window._postDataJson({
			showMessage : false,
			url : window._BasePath + "/governor/dowload/stickOne.json",
			data : {id:id,stick:stick},
			success : function(data){
				var pTitle = data.pTitle;
				var tutor = data.tutor;
				if(data.result == true){
					stickList(pTitle,tutor);
				}else{
					deleteStick(id);
				}
			}
		});
	}
	
	stickList = function(p,t){
		var fileOr = "file";
		if(t.type==1)fileOr = "folder";
		var strNo = "";
		if(t.stick)strNo = "checked='checked'";
		var strH = "<tr data-id='"+t.id+"'><td><span class='ui-draggable "+fileOr+"'><a href=\""
			+window._BasePath+"/governor/tutorial/edit.do?id="+t.id+"\" title='点击进入编辑'>" 
			+t.title + "</a></span></td><td>" +window._dictEntitys["downloadType"][t.type]
			+"</td><td>"+p+"</td><td><a href=\"#\" onclick=\"updateStick('"+t.id+"',this);return false;\" >刷新置顶</a>"
			+"<label class='switch switch-danger'><input type='checkbox' class='switch-input'" 
			+" onclick=\"stickThis('"+t.id+"',this);\" "+strNo+"><span class='switch-label' data-on='On'" 
			+" data-off='Off'></span><span class='switch-handle'></span></label></td></tr>";
		window._queryOptions.$bodyTable.find("tbody").append($(strH));
	}
	updateStick = function(id,obj){
		$.ajax({
			url : window._BasePath + "/governor/dowload/updateStick.json",
			data : {id:id},
			type : 'post',
			success : function(data){
				if(data=="true"){
					var $tr = $(obj).parents("tr");
					var $newTr = $tr.clone(true);
					$tr.remove();
					window._queryOptions.$bodyTable.find("tbody").prepend($newTr);
				}
			}
		});
	}
	deleteStick = function(id){
		window._queryOptions.$bodyTable.find("tbody tr[data-id="+id+"]").remove();
	}
	
	openFolder = function(id,title){
			window._queryOptions.title = title;
			querys(id);
			
	}
	
	querys = function(id){
		(function(w){
			w.options.keyword = null;
			w.options.parentId = id;
			w.options.page.pageNo = 1;
			w.query();
		})(window._queryOptions); 
	}
	
	createTitle = function(id,title){
		var $ul = $("#breadcrumb");
		var $li1 = $('<li><i class="icon-chevron-right"></i></li>');
		var $li2 = $('<li  onclick="$(this).trigger(\'clickT\')"><a href="#" title="">'+title+'</a></li>');
		$li2.unbind("clickT").bind("clickT",function(e){
			window._queryOptions.title = null;
			window._queryOptions.options.page.pageNo = 1;
			querys(id);
			$(this).nextAll().remove();
			return false;
		});
		$ul.append($li1).append($li2);
	}
	
	deleteDownl = function(id,type,flag){
		if(type == 1 && flag=="true"){
			alert("非空文件夹不可删除");
		}else{
			window._queryOptions.options.id = id;
			window._queryOptions.query();
		}
	}
	