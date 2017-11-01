window._initDict = function(dictTypes, callback) {
	window._postDataJson({
		showMessage : false,
		url : window._BasePath + "/dict/get.json",
		async : false,
		data : dictTypes,
		success : function(data) {
			$.extend((window._dictEntitys = window._dictEntitys || {}), data.data);
			if (callback != undefined) {
				callback(data);
			}
		},
		error : function(data) {
			window._P2MLoader.load("<span style=\"font-size:35px;\">数据字典加载失败！</span>", 3000);;
		}
	});
}