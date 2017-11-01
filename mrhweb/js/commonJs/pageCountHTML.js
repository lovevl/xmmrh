window._pageCount={
		param : null,
		createPageCount:function(page) {
			//var staticPage_start = Math.floor((page.pageNo - 1) / 5) * 5 + 1;
			var caler = (Math.ceil(page.pageNo /5) - 1)*5;
			var staticPage_start = caler==0?1:caler;
			//debugger;
			if(page.totalPage > (page.pageNo+1)&&page.pageNo%5==0){
				if(window._pageCount.param == "up"){
					staticPage_start = page.pageNo;
				}else if(window._pageCount.param == "down"){
					staticPage_start = page.pageNo==5?1:page.pageNo-5;
				}
			}
			var endCal = ((staticPage_start + 5) < page.totalPage) ? (staticPage_start + 5) : page.totalPage;
			var endCal0 = 5 < page.totalPage ? 5 : page.totalPage;
			var staticPage_end = page.pageNo < 5?endCal0:endCal;
			if(window._pageCount.param == "down"&&page.pageNo==5){
				staticPage_end = endCal0;
			}
			var li_pageFirst = [{innerHTML : "<a href=\"javascript:;\">首页</a>"}];
			var li_pageNoPre = [{innerHTML : "<a href=\"javascript:;\"><</a>"}];
			var li_pageStatic = [];
			for (var i = staticPage_start; i < staticPage_end+1; i++) {
				var li = {
					innerHTML : "<a href=\"javascript:;\">" + i + "</a>",
					
				};
				li_pageStatic[li_pageStatic.length] = li;
			}
			var li_pageNoNext = [{ innerHTML : '<a href=\"javascript:;\">></a>'}];
			var li_pageLast = [{ innerHTML : '<a  href=\"javascript:;\">末页</a>' }];
			var li_pageTotal = [{ innerHTML : '<a  href=\"javascript:;\">第'+page.pageNo+'/'+page.totalPage+'页</a>' }];
			var lis = li_pageFirst.concat(li_pageNoPre).concat(li_pageStatic).concat(li_pageNoNext).concat(li_pageLast).concat(li_pageTotal);
			var ul = createDocumentByFrame({
				li : lis,
			}, "ul");
			window._pageCount.initPageFunc(ul);
			window._pageCount.setPageClass(ul);
			return ul;
		},
		initPageFunc : function(ul){
			var lis = $(ul).children("li");
			lis[0].onclick = window._pageCount.fistPage;
			lis[1].onclick = window._pageCount.prePage;
			for(var i = 2;i<lis.length - 3;i++){
				lis[i].onclick = window._pageCount.goPage;
			}
			lis[lis.length - 3].onclick = window._pageCount.nextPage;
			lis[lis.length - 2].onclick = window._pageCount.lastPage;
		},
		fistPage : function(){
			if (window._queryOptions.options.page.pageNo > 1) {
				window._queryOptions.options.page.pageNo = 1;
				window._queryOptions.query();
				$(this).addClass("disabled");
			} else {
				$(this).addClass("disabled");
				return false;
			}
		},
		prePage : function() {
			window._pageCount.param = "down";
			if (window._queryOptions.options.page.pageNo > 1) {
				window._queryOptions.options.page.pageNo--;
				window._queryOptions.query();
			} else {
				return false;
			}
		},
		nextPage : function() {
			window._pageCount.param = "up";
			if (window._queryOptions.options.page.pageNo < window._queryOptions.options.page.totalPage) {
				window._queryOptions.options.page.pageNo++;
				window._queryOptions.query();
			} else {
				return false;
			}
		},
		lastPage : function() {
			if (window._queryOptions.options.page.pageNo < window._queryOptions.options.page.totalPage) {
				window._queryOptions.options.page.pageNo = window._queryOptions.options.page.totalPage;
				window._queryOptions.query();
				$(this).addClass("disabled");
			} else {
				$(this).addClass("disabled");
				return false;
			}
		},
		goPage : function(){
			var tempNo = window._queryOptions.options.page.pageNo;
			var	pageNo = $(this).find("a")[0].innerHTML;
			if(tempNo > pageNo){
				window._pageCount.param = "down";
			}else{
				window._pageCount.param = "up";
			}
			if(pageNo>0){
				window._queryOptions.options.page.pageNo=pageNo;
				window._queryOptions.query();
			}
		},
		setPageClass : function(ul) {
			var $li = $(ul).children("li");
			var length = $li.length;
			(function(p){
//				$li.last().addClass("cursorDefault");
//				if(p.pageNo == 1){
//					$li.eq(0).addClass("cursorDefault");
//					$li.eq(1).addClass("cursorDefault");
//				}
//				if(p.pageNo == p.totalPage){
//					$li.eq(length-3).addClass("cursorDefault");
//					$li.eq(length-2).addClass("cursorDefault");
//				}
				for(var i = 2; i < length-3; i++){
					if($li.eq(i).find("a").text() == p.pageNo){
						$li.eq(i).addClass("active");
					}
				}
			})(window._queryOptions.options.page);
		},
		refresh_paganation : function(jq_paganation) {
			jq_paganation.empty().append(createPageCount(window._queryOptions.options.page));
		}
};
window.createPageCount=window._pageCount.createPageCount;