var image = {
	setImagePreview : function(obj, imgPreId, flag) {
		var localImagI = document.getElementById("imgdiv_initial");
		var imgObjPreview = document.getElementById(imgPreId);
		var array = new Array('gif', 'jpeg', 'png', 'jpg', 'bmp'); //可以上传的文件类型
		if (obj.value == '') {
			$.messager.alert("提示", "让选择要上传的图片!");
			return false;
		} else {
			var fileContentType = obj.value.match(/^(.*)(\.)(.{1,8})$/)[3]; //这个文件类型正则很有用
			////布尔型变量
			var isExists = false;
			var objValue = obj.value;
			try {
				//对于IE判断要上传的文件的大小
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				fileLenth = parseInt(fso.getFile(objValue).size);
			} catch (e) {
				try {
					//对于非IE获得要上传文件的大小
					fileLenth = parseInt(obj.files[0].size);
				} catch (e) {
					return false;
				}
			}
			//循环判断图片的格式是否正确
			for ( var i in array) {
				if (fileContentType.toLowerCase() == array[i].toLowerCase()) {
					//图片格式正确之后，根据浏览器的不同设置图片的大小
					if (obj.files && obj.files[0]) {
						//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
						if (fileLenth > 2048000) {
							obj.value = "";
							alert("请选择小于2M的图片!");
							//   $.messager.alert("提示", "请选择小于2M的图片!");   jqueryUI才可以使用的提示框；
							return false;
						} else {
							imgObjPreview.height = 120;
							if(flag){
								imgObjPreview.height = 250;
							}
							imgObjPreview.src = window.URL.createObjectURL(obj.files[0]);
						}
					} else {
						//IE下，使用滤镜
						obj.select();
						var imgSrc = document.selection.createRange().text;
						//必须设置大小
						//localImagId.style.width = "200px";
						localImagId.style.height = "120px";
						//图片异常的捕捉，防止用户修改后缀来伪造图片
						try {
							localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
							localImagId.filters
									.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
						} catch (e) {
							//      $.messager.alert("提示", "您上传的图片格式不正确，请重新选择!");
							return false;
						}
						imgObjPreview.style.display = 'none';
						document.selection.empty();
					}
					isExists = true;
					return true;
				}
			}
			if (isExists == false) {
				$.messager.alert("提示", "上传图片类型不正确!");
				return false;
			}
			return false;
		}
	}
	
	
	
}
