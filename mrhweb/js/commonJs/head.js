//consoce调试信息记录工具
window.__Console={
		message:"调试信息:",
		print:function(message){
			window.__Console.message = window.__Console.message+"\n<p>"+message+"</p>";
			console.log("\n"+message);
		},
		showMessage:function(){
			window._P2MLoader.load(window.__Console.message,5000);
		}
}
// Loader
window.__Loader={
		jq_elmt:null,
		load:function(jq_elmt,text,delay){
			try{window.__Loader.destory();}
			catch(e){window.__Console.print("__Loader为空");}
			window.__Loader.jq_elmt = jq_elmt;
			if(text!=undefined){
				window.__Loader.jq_elmt.loader("show","<div>"+text+"</div>");
			}else{
				window.__Loader.jq_elmt.loader("show","<div></div>");
			}
			if(delay!=undefined){
				window.__Loader.destory(delay);
			}
		},
		destory:function(delay){
			if(delay!=undefined){
				setTimeout(function(){window.__Loader.jq_elmt.loader("hide")},delay);
			}else{
				window.__Loader.jq_elmt.loader("hide");
			}
		},
		divLoader:{
			load:null,destory:null,divElmt:null,createCenterDiv:null
			},
		bodyLoader:{
			load:function(){},destory:function(){}
			},
		loaderBeforeLeave:null
		};
window.__Loader.divLoader.createCenterDiv=function(){
	var divElmt = document.createElement("div");
	divElmt.style.position="absolute";
	divElmt.style.marginTop=-document.body.clientHeight/3/2+"px";
	divElmt.style.width="100%";
	divElmt.style.height=document.body.clientHeight/3+"px";
	$(window.__Loader.divLoader.divElmt).remove();
	window.__Loader.divLoader.divElmt =  divElmt;
};
window.__Loader.divLoader.destroy=function(){
	$(window.__Loader.divLoader.divElmt).loader('hide');
	$(window.__Loader.divLoader.divElmt).remove();
};
window.__Loader.divLoader.load=function(text,delay){
	window.__Loader.divLoader.createCenterDiv();
	var htmlStr = '<img style="height:35px; width:35px;" src="'+window._BasePath+'/js_lib/jquery_mobile/images/ajax-loader.gif"/>';
	if(text!=undefined){
		htmlStr="<div>"+text+"</div>";
	}
	document.body.appendChild(window.__Loader.divLoader.divElmt);
	$(window.__Loader.divLoader.divElmt).loader('show',htmlStr);
	if(delay!=undefined){
		setTimeout(function(){window.__Loader.divLoader.destroy()},delay);
	}
};
window.__Loader.bodyLoader.load=function(text,delay){
	if($(".loader").length>0){
		$('body').loader('hide');
	}
	var htmlStr = '<img style="height:35px; width:35px;" src="'+window._BasePath+'/js_lib/jquery_mobile/images/ajax-loader.gif"/>';
	if(text!=undefined){
		htmlStr="<div><div style='position:fixed;top:40%;'>"+text+"</div></div>";
	}
	var bodyObj = $("body");
	if(bodyObj.length!=0){
		bodyObj.loader('show',htmlStr);
		if(delay!=undefined){
			window.__Loader.bodyLoader.destory(delay);
		}
	}else{
		setTimeout(function(){_window.__Loader.bodyLoader.load()},50);
	}
};
window.__Loader.bodyLoader.destory=function(delay){
	if(delay!=undefined){
		setTimeout(function(){$('body').loader('hide');},delay);
	}else{
		setTimeout(function(){$('body').loader('hide');},1500);
	}
};
window.__Loader.loaderBeforeLeave=function(){
	$.ajax({
		url:"/Template/empty.jspx",
		success:window.__Loader.loaderBeforeLeave,
		error:function(){
			console.log("error,in");
			window.__Loader.bodyLoader.load();
			window.__Loader.loaderBeforeLeave();
			console.log("error,out");
		}
	});
};

// createDOM
function createDocumentByFrame(data, tagname) {//
	var rootElmt = document.createElement(tagname);
	for (var x in data) {
		if ("object" == typeof data[x]&&data[x]!=null&&data[x]!=undefined) {
			for(var y = 0;y<data[x].length;y++){
				rootElmt.appendChild(createDocumentByFrame(data[x][y], x));
			}
		} else if ("string" == typeof data[x] || "number"== typeof data[x]) {
			if (x == "clazz") {
				rootElmt.setAttribute("class", data[x]);
			} else if (x == "innerHTML" || x == "text") {
				rootElmt.innerHTML = data[x];
			} else {
				rootElmt.setAttribute(x, data[x]);
			}
		}
	}
	return rootElmt;
}
