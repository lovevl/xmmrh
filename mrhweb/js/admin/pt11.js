//标签插件的初始化
$(function() {
    $('#tags_1').tagsInput({
        width: 'auto'
    });
});

selectionImg = function(obj){
		window.options = {
				wd : null,
				ht : null,
				imgInit : document.getElementById("imgInitId"),
				imgFile : document.getElementById("imgFileId"),
			};
			//debugger;
		(function(w){
		$img_crop_scale_200 = 200, //裁剪图片为宽200px
		$img_crop_scale_125 = 125;  //裁剪图片高125px
		//图片裁剪
		$img_select_obj = $(w.imgInit).imgAreaSelect({
			aspectRatio : '1:0.625',//裁剪图片比例
			handles : true,
			fadeSpeed : 200,
			instance : true,
			onSelectChange : function(img, selection) {//selection裁剪对象
				if (!selection.width || !selection.height) {
					return;
				}
				X1 = selection.x1
				Y1 = selection.y1
				Width = selection.width //裁剪区蚂蚁线内的宽
				Height = selection.height//裁剪区蚂蚁线内的高
				$("#imgData").val(X1 + "," + Y1 + "," + Width + "," + Height);
				//缩放比例
				var scaleX1 = $img_crop_scale_200 / selection.width;
				var scaleY1 = $img_crop_scale_125 / selection.height;
				//裁剪
				$(w.imgFile).css({
					width : Math.round(scaleX1 * w.wd),
					height : Math.round(scaleY1 * w.ht),
					marginLeft : -Math.round(scaleX1 * selection.x1),
					marginTop : -Math.round(scaleY1 * selection.y1)
				});
			}
		});
		var $imgFile = $("#imgFileId");
		$imgFile.attr('src',obj.src);
		var nWidth,nHeight;
		if(obj.naturalHeight){
			nWidth = obj.naturalWidth;
			nHeight  = obj.naturalHeight;
		}else{
			var image = new Image();
			image.src = obj.src;
			nWidth = image.width;
			nHeight = image.height;
		}
		scale = 250 / nHeight;
		w.ht = 250;
		w.wd = Math.round(scale * nWidth);
		$imgFile.attr("width",window.options.wd);
		$img_select_obj.setSelection(50, 50, 250, 175, true);
		$img_select_obj.setOptions({
			show : true
		});
		$img_select_obj.update();
		})(window.options);
	}