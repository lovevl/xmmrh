window._postData = function(opt) {
	if (opt.showMessage != false) {
		var flag = true;
		//var startTime = new Date().getTime();
		// 封装原success
		if (opt.success != null && opt.success != undefined) {
			var success = opt.success;
			opt.success = function(data) {
				// 设置默认消息提醒，可自定义覆盖。
				var str = "",width;
				if (data.message != null && data.message != undefined && data.message != "") {
					success(data);
					window._MRHLoader.slowDestroy(300,data.message,70);
				} else {
					var i = document.createElement("i");
					if (data.result === true) {
						str = "载入中.....";
					} else {
						str = "错误，请重试" ;
						width = 80;
					}
					window._MRHLoader.load(str,width);
					success(data);
					window._MRHLoader.slowDestroy(120);
				}
				//console.log((new Date().getTime() - startTime) / 1000 + "秒");
			}
		}
	} else {
		if (opt.success != null && opt.success != undefined) {
			var success = opt.success;
			opt.success = function(data) {
				if (data.message != null && data.message != undefined && data.message != "") {
					alert(data.message);
				}
				if(data.result == undefined){
					alert("数据冲突，请清除cookie后重新登录");
				}
				success(data);
			}
		}	
		opt.error = null;
	}
	delete opt.showMessage;
	// 设置默认error
	var options = {
		type : "POST",
		contentType : "application/json;charset=utf-8",
		error : function(){alert("出错了，请稍后重试")}
	};
	$.extend(options, opt);
	$.ajax(options);
}
window._postDataJson = function(opt) {
	if (opt.data == undefined || opt.data == null) {
		opt.data = {};
	}
	opt.data = JSON.stringify(opt.data);
	window._postData(opt);
}
window._formOption = function(form, callback) {
	if (form == null || !(form.length > 0) || (!$(form).validate().form())) {
		return false;
	}
	var options = {
		url : form.action,
		type : form.method,
		data : $(form).serializeJSON(),
		success : function(data) {
			callback(data);
		}
	}
	return options;
}
	
window.ajaxSubmitForm = function(form, callback) {
	var options = window._formOption(form, callback);
	if (options === false) {
		return false;
	}
	options.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
	options.showMessage = false;
	window._postData(options);
	return false;
}

window.loginSuccess = function(data) {
	if (data.result === true) {
		if (localStorage._AUTOLOGIN == "true") {
			var username = $("input[name=username]").val();
			var password = $("input[name=password]").val();
			if (username != null && username != "" && password != null && password != "") {
				localStorage.user = JSON.stringify({
					username : username,
					password : password
				});
			}
		}
		if(data.data.returnurl != undefined){
			window.location.href = data.data.returnurl;
		}else{
			window.location.href =  window._BasePath + "/i/index.jspx";
		}
		//setTimeout("window._P2MLoader.destory('【登陆成功，请稍候……】')", 550);
//		if(window.location.pathname.search(/login/) > 0 || window.location.pathname.search(/register/) > 0){
//			window.location.href =  window._BasePath + "/i/index.jspx";
//		}else{
//			location.reload();
//		}
	} else {
		localStorage._AUTOLOGIN = false;
		localStorage.user = null;
	}
}
window._logout = function(redrect_url) {
	if(redrect_url == undefined){
		redrect_url = window.location.pathname.replace(window._BasePath,"");
	}
	localStorage._AUTOLOGIN = "false";
	localStorage.user = null;
	window.location.href = window._BasePath + "/logout.jspx?returnUrl="+redrect_url;
}
window.sendEmailCode = function(email,$obj) {
	var flag = false;
	//var p = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	var p = /^1[34578]\d{9}$/;
	if (!p.exec(email)) {
		alert("请输入正确的手机号！");
		return false;
	}
	$obj.removeAttr("onclick").text("正在发送");
	window._postDataJson({
		url : window._BasePath + "/email/sendEmailCode.json",
		//async : false,
		data : {
			email : email
		},
		success : function(data) {
			if (data.result === true) {
				alert("验证码发送成功");
			} else {
				alert("验证码发送失败，请刷新后重试！");
			}
		}
	});
	return true;
	//return flag;
}
//t多少秒内不能按，$obj该按钮的$对象，methodStr按钮触发的方法
window.time = function(t,$obj,methodStr){
	   if(t == 0){
		   $obj.attr("onclick",methodStr);
		   $obj.removeAttr("style");
		   $obj.text("发送验证码");
	   }else{
		   $obj.removeAttr("onclick");
		   $obj.css({"background-color" : "grey"});
		   t--;
		   $obj.text(t+"秒");
		   setTimeout(function(){
			   time(t,$obj,methodStr);
		   },1000);
	   }
   } 

window.collectTime = function(t,$collectA,methodStr){
	   if(t == 0){
		   $collectA.attr("onclick",methodStr);
	   }else{
		   $collectA.removeAttr("onclick");
		   t--;
		   setTimeout(function(){
			   collectTime(t,$collectA,methodStr);
		   },1000);
	   }
} 

window.collectOne = function(user,obj,staffEntity){
	if(!user){
		alert("请先登录！");
	}else{
		window.collectTime(2,$(obj),"window.collectOne('"+user+"',this,'"+staffEntity+"')");
		var ajaxUrl = "";
		switch(staffEntity){
		case "downl" : ajaxUrl = "/waycd/saveStaff.json";break;
		case "tutor" : ajaxUrl = "/fromWeb/saveStaff.json";break;
		}
		var data_id = $(obj).attr("data_id");
		var data_one_id = $(obj).attr("data_one_id");
		window._postDataJson({
			url : window._BasePath + ajaxUrl,
			data : {id:data_id,foreignId:data_one_id},
			success : function(data){
				if(data.data.staff != undefined){
					$(obj).removeClass("entypo-heart-empty").addClass("entypo-heart").addClass("collect").attr("data_id",data.data.staff.id);
				}else{
					$(obj).removeClass("collect").removeClass("entypo-heart").addClass("entypo-heart-empty").removeAttr("data_id");
				}		
			}
		});		
	}
}

window._anchor = function(hash) {
	if (hash != null && hash != "") {
		try {
			$("#" + hash)[0].scrollIntoView();
			window._queryOptions.hash = null;
		} catch (e) {
			hash = null;
		}
		hash = null;
	}
}

window._MRHLoader = {
		t:null,
		$message : null,
		load : function(text,width){
			var style = "style='width:55px;'";
			if(width != undefined){
				style = "style=\"width:"+width+"px\"";
			}
			var strHtml = "<div class='body_message'><div class='alert alert-message' "+style+"><span>"+text
						+ "</span></div></div>";
			window._MRHLoader.$message = $(strHtml);
			$("body").append(window._MRHLoader.$message);
		},
		destroy : function(){
			$("body .body_message").find(".alert-message").remove();
		},
		slowDestroy :function(delay,text,width){
			var $htmlMsg = $("body").find(".body_message");
			if($htmlMsg != undefined){window.clearInterval(window._MRHLoader.t);$htmlMsg.remove();}
			var opa = 0.88;
			if(text != undefined){
				window._MRHLoader.load(text,width);
			}else{
				window._MRHLoader.load("载入成功");
			}
			var message = window._MRHLoader.$message.find(".alert-message")[0];
			if(delay != undefined){
				var average = 0.88 / delay;
				window._MRHLoader.t = setInterval(function(){
					opa -= average;
					message.style.opacity = opa;
				if(opa < 0){window.clearInterval(window._MRHLoader.t);
				if(window._MRHLoader.$message != null)
				window._MRHLoader.$message.remove();}	
				},1)
			}
		}
}

window.copyPwd = function(obj){
	var spanTxt = $(obj).prev()[0];
	var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(spanTxt);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
}

window._P2MLoader = {
	load : function(text, delay) {
		if (text == undefined) {
			text = "";
		} else {
			text = "<b style='text-align:center;font-size:15px;'>" + text + "</b>";
		}
		// 如果已加载JQM
		if ($.mobile != undefined) {
			if (text != "") {
				$.mobile.loading("show", {
					theme : 'b',
					textVisible : true,
					textonly : false,
					html : text
				});
			} else {
				$.mobile.loading("show", {
					theme : 'b'
				});
			}
			if (delay != undefined) {
				window._P2MLoader.destory(delay);
			}
		} else {
			window.__Loader.bodyLoader.load(text, delay);
		}
	},
	destory : function(delay) {
		window.__Loader.bodyLoader.destory(delay);
	}
}
