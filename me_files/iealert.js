/*
 * IE Alert! jQuery plugin
 * version 1
 * author: David Nemes http://nmsdvid.com
 * http://nmsdvid.com/iealert/
 */
(function($){
	setTimeout(function(){
		$("#goon").on("click", function(){
			$("#ie-alert-overlay").hide();	
			$("#ie-alert-panel").hide();
		});
	},600);
function initialize($obj, support, title, text)
{
	var panel = "<span>"+ title +"</span>"
			  + "<p style='margin:0px;padding:0;'> "+ text +"</p>"
			  + "<div class='browser'>"
			  + "<ul>"
			  + "<li><a class='chrome' href='http://www.google.cn/intl/zh-CN/chrome/browser/' target='_blank'></a></li>"
			  + "<li><a class='firefox' href='http://firefox.com.cn/download/' target='_blank'></a></li>"
			  + "<li><a class='ie9' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'></a></li>"
			  + "<li><a class='safari' href='http://support.apple.com/downloads/#internet' target='_blank'></a></li>"
			  + "<li><a class='opera' href='http://www.opera.com/zh-cn/computer/windows' target='_blank'></a></li>"
			  + "<ul>"
			  + "</div>"; 
	var overlay = $("<div id='ie-alert-overlay'></div>");
	var iepanel = $("<div id='ie-alert-panel'>"+ panel +"</div>");

	var docHeight = $(document).height();
	overlay.css("height", docHeight + "px");
	if (support === "ie8") // shows the alert msg in IE8, IE7, IE6
	{ 			
		if ($.browser.msie  && parseInt($.browser.version, 10) < 9)
		{	
			$obj.prepend(iepanel);
			$obj.prepend(overlay);	
		}

		if ($.browser.msie  && parseInt($.browser.version, 10) === 6)
		{
			$("#ie-alert-panel").css("background-position","-626px -116px");
			$obj.css("margin","0");
		}	
	}
	else if (support === "ie7") 	// shows the alert msg in IE7, IE6
	{
		if ($.browser.msie  && parseInt($.browser.version, 10) < 8)
		{	
			$obj.prepend(iepanel);
			$obj.prepend(overlay);
		}
		if ($.browser.msie  && parseInt($.browser.version, 10) === 6)
		{	
			$("#ie-alert-panel").css("background-position","-626px -116px");
			$obj.css("margin","0");
		}
		
	}
	else if (support === "ie6") 	// shows the alert msg only in IE6
	{	
		if ($.browser.msie  && parseInt($.browser.version, 10) < 7)
		{	
			$obj.prepend(iepanel);
			$obj.prepend(overlay);
			$("#ie-alert-panel").css("background-position","-626px -116px");
			$obj.css("margin","0");	
		}
	}
}; //end initialize function
	$.fn.iealert = function(options)
	{
		var defaults = { 
			support: "ie8",  // ie8 (ie6,ie7,ie8), ie7 (ie6,ie7), ie6 (ie6)
			title: "您使用的浏览器版本过低，本系统已不再支持IE6/7/8 !", // title text   
			text: "我们推荐您升级到以下浏览器（同时本系统也支持大部分的智能手机浏览器，您可以使用手机登录系统）：<span style='font-size:14px;color:#666;margin-top:12px;'>注意：如果使用的是360之类的双核浏览器，请切换到极速模式即可</span><span id='goon' style='font-size:16px !important;font-weight:normal;color:#333;cursor:pointer;text-align:right;margin-right:50px;margin-top:0;'><a href='javascript:;'>继续访问 &gt;&gt;</a></span>"
		};
		var option = $.extend(defaults, options);
		return this.each(function()
		{
			if ( $.browser.msie )
			{
				var $this = $(this);  
				initialize($this, option.support, option.title, option.text);
			} //if ie	
		});		       
	};
})(jQuery);
