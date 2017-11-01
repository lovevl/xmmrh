/* 前后端通信相关的配置,注释只允许使用多行方式 */
(function() {
	return {
		"imageActionName" : (function() {
			return window._BasePath + "/file/upload.jspx"
		})(), /* 执行上传图片的action名称 */
		"imageFieldName" : "file", /* 提交的图片表单名称 */
		"imageMaxSize" : 20480000, /* 上传大小限制，单位B 默认20M */
		"imageAllowFiles" : [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
		"imageCompressEnable" : false, /* 是否压缩图片,默认是true */
		"imageCompressBorder" : 1600, /* 图片压缩最长边限制 */
		"imageInsertAlign" : "none", /* 插入的图片浮动方式 */
		"imageUrlPrefix" : window._BasePath + "/file/read.jspx?fileName=", /* 图片访问路径前缀 */
		"imagePathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		/* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
		/* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
		/* {time} 会替换成时间戳 */
		/* {yyyy} 会替换成四位年份 */
		/* {yy} 会替换成两位年份 */
		/* {mm} 会替换成两位月份 */
		/* {dd} 会替换成两位日期 */
		/* {hh} 会替换成两位小时 */
		/* {ii} 会替换成两位分钟 */
		/* {ss} 会替换成两位秒 */
		/* 非法字符 \ : * ? " < > | */
		/* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

		/* 涂鸦图片上传配置项 */
		"scrawlActionName" : "uploadscrawl", /* 执行上传涂鸦的action名称 */
		"scrawlFieldName" : "upfile", /* 提交的图片表单名称 */
		"scrawlPathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		"scrawlMaxSize" : 20480000, /* 上传大小限制，单位B 默认20M */
		"scrawlUrlPrefix" : "", /* 图片访问路径前缀 */
		"scrawlInsertAlign" : "none",

		/* 截图工具上传 */
		"snapscreenActionName" : "uploadsnapscreen", /* 执行上传截图的action名称 */
		"snapscreenFieldName" : "upfile", /* 提交的图片表单名称 */
		"snapscreenPathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		"snapscreenUrlPrefix" : "", /* 图片访问路径前缀 */
		"snapscreenInsertAlign" : "none", /* 插入的图片浮动方式 */

		/* 抓取远程图片配置 */
		"catcherLocalDomain" : ["127.0.0.1", "localhost", "img.baidu.com"],
		"catcherActionName" : "catchimage", /* 执行抓取远程图片的action名称 */
		"catcherFieldName" : "source", /* 提交的图片列表表单名称 */
		"catcherPathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		"catcherUrlPrefix" : "", /* 图片访问路径前缀 */
		"catcherMaxSize" : 20480000, /* 上传大小限制，单位B 默认20M */
		"catcherAllowFiles" : [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 抓取图片格式显示 */

		/* 上传视频配置 */
		"videoActionName" : "uploadvideo", /* 执行上传视频的action名称 */
		"videoFieldName" : "upfile", /* 提交的视频表单名称 */
		"videoPathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		"videoUrlPrefix" : "", /* 视频访问路径前缀 */
		"videoMaxSize" : 5120000000, /* 上传大小限制，单位B，默认5000MB */
		"videoAllowFiles" : [".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */

		/* 上传文件配置 */
		"fileActionName" : "uploadfile", /* controller里,执行上传视频的action名称 */
		"fileFieldName" : "upfile", /* 提交的文件表单名称 */
		"filePathFormat" : "", /* 上传保存路径,可以自定义保存路径和文件名格式 */
		"fileUrlPrefix" : "", /* 文件访问路径前缀 */
		"fileMaxSize" : 5120000000, /* 上传大小限制，单位B，默认5000MB */
		"fileAllowFiles" : [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid", ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"], /* 上传文件格式显示 */

		/* 列出指定目录下的图片 */
		"imageManagerActionName" : "listimage", /* 执行图片管理的action名称 */
		"imageManagerListPath" : "/u/cms/", /* 指定要列出图片的目录 */
		"imageManagerListSize" : 20, /* 每次列出文件数量 */
		"imageManagerUrlPrefix" : "", /* 图片访问路径前缀 */
		"imageManagerInsertAlign" : "none", /* 插入的图片浮动方式 */
		"imageManagerAllowFiles" : [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 列出的文件类型 */

		/* 列出指定目录下的文件 */
		"fileManagerActionName" : "listfile", /* 执行文件管理的action名称 */
		"fileManagerListPath" : "/u/cms/", /* 指定要列出文件的目录 */
		"fileManagerUrlPrefix" : "", /* 文件访问路径前缀 */
		"fileManagerListSize" : 20, /* 每次列出文件数量 */
		"fileManagerAllowFiles" : [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid", ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"] /* 列出的文件类型 */

		// 工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的重新定义
		,
		toolbars : [['customstyle', // 自定义标题
		'fontfamily', // 字体
		'forecolor', // 字体颜色
		'fontsize', // 字号
		'paragraph', // 段落格式'bold', // 加粗
		'indent', // 首行缩进
		'italic', // 斜体
		'underline', // 下划线
		'strikethrough', // 删除线
		'fontborder', // 字符边框
		'subscript', // 下标
		'superscript', // 上标
		'justifyleft', // 居左对齐
		'justifyright', // 居右对齐
		'justifycenter', // 居中对齐
		'justifyjustify', // 两端对齐
		'rowspacingtop', // 段前距
		'rowspacingbottom', // 段后距
		'inserttable', // 插入表格
		'insertrow', // 前插入行
		'insertcol', // 前插入列
		'mergeright', // 右合并单元格
		'mergedown', // 下合并单元格
		'deleterow', // 删除行
		'deletecol', // 删除列
		'splittorows', // 拆分成行
		'splittocols', // 拆分成列
		'splittocells', // 完全拆分单元格
		'deletecaption', // 删除表格标题
		'inserttitle', // 插入标题
		'mergecells', // 合并多个单元格
		'deletetable', // 删除表格
		'insertparagraphbeforetable', // "表格前插入行"
		'edittable', // 表格属性
		'edittd', // 单元格属性
		'simpleupload', // 单图上传
		'imagenone', // 默认
		'imageleft', // 左浮动
		'imageright', // 右浮动
		'imagecenter', // 居中
		'fullscreen', // 全屏
		],
		// ['link', // 超链接
		// 'unlink', // 取消链接
		// 'emotion', // 表情
		// 'spechars', // 特殊字符
		// 'searchreplace', // 查询替换
		// 'help', // 帮助
		// ], ['backcolor', // 背景色
		// 'insertorderedlist', // 有序列表
		// 'insertunorderedlist', // 无序列表
		// 'directionalityltr', // 从左向右输入
		// 'directionalityrtl', // 从右向左输入
		// 'pagebreak', // 分页
		// 'wordimage', // 图片转存
		// 'lineheight', // 行间距
		// 'edittip ', // 编辑提示
		// 'autotypeset', // 自动排版
		// 'touppercase', // 字母大写
		// 'tolowercase', // 字母小写
		// 'background', // 背景
		// 'drafts', // 从草稿箱加载
		// ], ['anchor', // 锚点,
		// 'webapp', // 百度应用
		// 'insertframe', // 插入Iframe
		// 'insertcode', // 代码语言
		// 'map', // Baidu地图
		// 'gmap', // Google地图
		// 'insertvideo', // 视频
		// 'charts', // 图表
		// 'insertimage', // 多图上传
		// 'template', // 模板
		// 'scrawl', // 涂鸦
		// 'music', // 音乐
		// 'attachment', // 附件
		// ], ['undo', // 撤销
		// 'redo', // 重做
		// 'selectall', // 全选
		// 'snapscreen', // 截图
		// ], ['source', // 源代码
		// 'print', // 打印
		// 'preview', // 预览
		// 'date', // 日期
		// 'time', // 时间
		// 'blockquote', // 引用
		// 'formatmatch', // 格式刷
		// 'pasteplain', // 纯文本粘贴模式
		// 'horizontal', // 分隔线
		// 'removeformat', // 清除格式
		// 'cleardoc', // 清空文档
		// ]
		]
	}
})()