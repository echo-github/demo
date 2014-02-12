/*
echo update 20130131

html5 Document Type required
jQuery 1.6+   required

*/

var echoLab = {};

//节点类型
echoLab.Node={
   ELEMENT_NODE:1,
   ATTRIBUTE_NODE:2,
   TEXT_NODE:3,
   CDATA_SECTION_NODE:4,	
   ENTITY_REFERENCE_NODE:5,
   ENTITY_NODE:6,
   PROCESSING_INSTRUCTION_NODE:7,
   COMMENT_NODE:8,
   DOCUMENT_NODE:9,
   DOCUMENT_TYPE_NODE:10,
   DOCUMENT_FRAGMENT_NODE:11,
   NOTATION_NODE:12
}



//获取浏览器信息 browserInfo为全局变量
echoLab.browserInfo= (function get_browserInfo(){				
		var MzBrowser = {};
		var ieVersion ;
		
		if(MzBrowser.platform) return;
		var ua = window.navigator.userAgent;
		MzBrowser.platform = window.navigator.platform;
	
		MzBrowser.firefox = ua.indexOf("Firefox")>0;
		MzBrowser.opera = typeof(window.opera)=="object";
		MzBrowser.ie = !MzBrowser.opera && ua.indexOf("MSIE")>0;
		MzBrowser.mozilla = window.navigator.product == "Gecko";
		MzBrowser.netscape= window.navigator.vendor=="Netscape";
		MzBrowser.safari= ua.indexOf("Safari")>-1;
		
		if(MzBrowser.firefox){
			var re = /Firefox(\s|\/)(\d+(\.\d+)?)/;
		}else if(MzBrowser.ie){
			var re = /MSIE( )(\d+(\.\d+)?)/;
		}else if(MzBrowser.opera){
			var re = /Opera(\s|\/)(\d+(\.\d+)?)/;
		}else if(MzBrowser.netscape){
			var re = /Netscape(\s|\/)(\d+(\.\d+)?)/;
		}else if(MzBrowser.safari){
			var re = /Version(\/)(\d+(\.\d+)?)/;
		}else if(MzBrowser.mozilla){
			var re = /rv(\:)(\d+(\.\d+)?)/;
		};
	
		if(typeof(re)&&re.test(ua)!='undefined'){
			MzBrowser.version = parseFloat(RegExp.$2);
		};
		//console.log(MzBrowser.firefox)
		return MzBrowser;			
})();

echoLab.stopDefault= function(e){
	// Prevent the default browser action (W3C)  
	if ( e && e.preventDefault )  
		e.preventDefault();  
	// A shortcut for stoping the browser action in IE   
	else  
		window.event.returnValue = false;  
	return false;  
}



//generate random INT
echoLab.fRandomBy = function(under, over){
		switch(arguments.length){
				case 1: return parseInt(Math.random()*under+1);
				case 2: return parseInt(Math.random()*(over-under+1) + under);
				default: return 0;
		}
}

echoLab.calculate_boolean_array=function($boolean_array){
	var len = $boolean_array.length;
	var flag_temp =true;
	for(var i=0;i<len;i++){
		flag_temp = flag_temp&&$boolean_array[i];		
	};
	return flag_temp;		
}


//返回顶部
echoLab.go2top = function(){
	   var go2top_html = '<div class="js_go2top go2top"><a href="javascript:;" class="go2top">Top</a></div>';
	   var animate_speed = 500;
	   
	   jQuery(go2top_html).bind('click',function(){
		   jQuery('html, body').animate({scrollTop: 0 },600,function(){
				 jQuery('.js_go2top').hide();
		   });		 
	   }).appendTo('body');
	   
	   var _offset_top = 100;
	   
	   //REG
	   jQuery(window).bind('scroll resize',function(e){
			 var $window = jQuery(window);
			   var h = $window.scrollTop();
			   var H = $window.innerHeight();
			   if(h>0){
				   //jQuery('.js_go2top').css({'top':(h+H/2+_offset_top)}).show();
				   jQuery('.js_go2top').show();
			   };			 
			   if(h==0){
				  jQuery('.js_go2top').hide();
			   };
	   });	
}		
	

//获取浏览器版本
function is_ie6(){
	var MzBrowser = {};
	var ieVersion ;
	
	if(MzBrowser.platform) return;
	var ua = window.navigator.userAgent;
	MzBrowser.platform = window.navigator.platform;

	MzBrowser.firefox = ua.indexOf("Firefox")>0;
	MzBrowser.opera = typeof(window.opera)=="object";
	MzBrowser.ie = !MzBrowser.opera && ua.indexOf("MSIE")>0;
	MzBrowser.mozilla = window.navigator.product == "Gecko";
	MzBrowser.netscape= window.navigator.vendor=="Netscape";
	MzBrowser.safari= ua.indexOf("Safari")>-1;
	
	if(MzBrowser.firefox){
		var re = /Firefox(\s|\/)(\d+(\.\d+)?)/;
	}else if(MzBrowser.ie){
		var re = /MSIE( )(\d+(\.\d+)?)/;
	}else if(MzBrowser.opera){
		var re = /Opera(\s|\/)(\d+(\.\d+)?)/;
	}else if(MzBrowser.netscape){
		var re = /Netscape(\s|\/)(\d+(\.\d+)?)/;
	}else if(MzBrowser.safari){
		var re = /Version(\/)(\d+(\.\d+)?)/;
	}else if(MzBrowser.mozilla){
		var re = /rv(\:)(\d+(\.\d+)?)/;
	};

	if(typeof(re)&&re.test(ua)!='undefined'){
		MzBrowser.version = parseFloat(RegExp.$2);
	};
	
	if(MzBrowser.ie&&(MzBrowser.version==6)){
		return true;
	}else{
		return false;							
	};
}




/*
//START js_tab
HTML STRUCTRUE

<div class="js_tab">
		<ul>
			<li class="js_tab_holder_item">tab1</li>
			<li class="js_tab_holder_item">tab2</li>
		</ul>
		<div class="js_tab_panel">tab1 content</div>
		<div class="js_tab_panel">tab2 content</div>
</div>
*/

jQuery.fn.extend({
	echoLab_tab:function(trigger_type_str){
			var $root = jQuery(this);
			var $holder_items = $root.find('.js_tab_holder_item');
			var $tab_panels = $root.find('.js_tab_panel');
			var activeClass ='active';
			
			function _removeClassToChild($obj){
				$obj.removeClass(activeClass);
				var len = $obj.children().length;
				if(len>0){					
					$obj.children().each(function(){
						_removeClassToChild(jQuery(this));
					});
				};//end if
			}
			
			function _addClassToChild($obj){
				$obj.addClass(activeClass);
				var len = $obj.children().length;
				if(len>0){					
					$obj.children().each(function(){
						_addClassToChild(jQuery(this));
					});
				};//end if
			}
			
			
			
			switch(trigger_type_str){
				case 'click':
				$holder_items.each(function(idx){
					var $this_item = jQuery(this);
					$this_item.click(function(){						
						$holder_items.each(function(){
							_removeClassToChild(jQuery(this));
						});
						_addClassToChild($this_item);
						$tab_panels.hide().eq(idx).show();	
					});
				})//end $li.each()
				break;
				case 'mouseover':
				$holder_items.each(function(idx){
					var $this_item = jQuery(this);
					$this_item.mouseover(function(){
						$holder_items.each(function(){
							_removeClassToChild(jQuery(this));
						});
						_addClassToChild($this_item);
						$tab_panels.hide().eq(idx).show();	
					});
				})//end $li.each()
				break;
			};//END switch
			
			//init
			switch(trigger_type_str){
				case 'click':
				$holder_items.eq(0).trigger('click');
				break;
				case 'mouseover':
				$holder_items.eq(0).trigger('mouseover');
				break;
			};//END switch	
			
	}
});//END js_tab


//smart_city

/*

<div class="mod_city_filter js_smart_city"> <span class="tit">选择区域</span>
              <select style="width:90px" name="" class="js_province">
                <option value="" data-default-option="yes">选择省份</option>
                <option value="">安徽</option>
                <option value="">北京</option>
                <option value="">重庆</option>
                <option value="">甘肃</option>
                <option value="">广东</option>
                <option value="">四川</option>
                <option value="">西藏</option>
                <option value="">新疆</option>
                <option value="">云南</option>
                <option value="">浙江</option>
              </select>
              <select class="js_city" name="" style="width:90px">
                <option value="" data-default-option="yes">选择城市</option>
                <option data-for-province="安徽">合肥</option>
                <option data-for-province="安徽">芜湖</option>
                <option data-for-province="安徽">蚌埠</option>
                <option data-for-province="安徽">淮南</option>
                <option data-for-province="安徽">马鞍山</option>
                <option data-for-province="安徽">淮北</option>
                <option data-for-province="安徽">铜陵</option>
                <option data-for-province="安徽">安庆</option>
                <option data-for-province="安徽">黄山</option>
                <option data-for-province="安徽">滁州</option>
                <option data-for-province="安徽">阜阳</option>
                <option data-for-province="安徽">宿州</option>
                <option data-for-province="安徽">巢湖</option>
                <option data-for-province="安徽">六安</option>
                <option data-for-province="安徽">亳州</option>
                <option data-for-province="安徽">池州</option>
                <option data-for-province="安徽">宣城</option>
                <option data-for-province="北京">北京</option>
                <option data-for-province="重庆">重庆</option>
                <option data-for-province="甘肃">兰州</option>
                <option data-for-province="甘肃">嘉峪关</option>
                <option data-for-province="甘肃">金昌</option>
                <option data-for-province="甘肃">白银</option>
                <option data-for-province="甘肃">天水</option>
                <option data-for-province="甘肃">武威</option>
                <option data-for-province="甘肃">张掖</option>
                <option data-for-province="甘肃">平凉</option>
                <option data-for-province="甘肃">酒泉</option>
                <option data-for-province="甘肃">庆阳</option>
                <option data-for-province="甘肃">定西</option>
                <option data-for-province="甘肃">陇南</option>
                <option data-for-province="甘肃">临夏</option>
                <option data-for-province="甘肃">甘南</option>
                <option data-for-province="广东">广州</option>
                <option data-for-province="广东">深圳</option>
                <option data-for-province="广东">珠海</option>
                <option data-for-province="广东">汕头</option>
                <option data-for-province="广东">韶关</option>
                <option data-for-province="广东">佛山</option>
                <option data-for-province="广东">江门</option>
                <option data-for-province="广东">湛江</option>
                <option data-for-province="广东">茂名</option>
                <option data-for-province="广东">肇庆</option>
                <option data-for-province="广东">惠州</option>
                <option data-for-province="广东">梅州</option>
                <option data-for-province="广东">汕尾</option>
                <option data-for-province="广东">河源</option>
                <option data-for-province="广东">阳江</option>
                <option data-for-province="广东">清远</option>
                <option data-for-province="广东">东莞</option>
                <option data-for-province="广东">中山</option>
                <option data-for-province="广东">潮州</option>
                <option data-for-province="广东">揭阳</option>
                <option data-for-province="广东">云浮</option>
                <option data-for-province="四川">成都</option>
                <option data-for-province="四川">自贡</option>
                <option data-for-province="四川">攀枝花</option>
                <option data-for-province="四川">泸州</option>
                <option data-for-province="四川">德阳</option>
                <option data-for-province="四川">绵阳</option>
                <option data-for-province="四川">广元</option>
                <option data-for-province="四川">遂宁</option>
                <option data-for-province="四川">内江</option>
                <option data-for-province="四川">乐山</option>
                <option data-for-province="四川">南充</option>
                <option data-for-province="四川">宜宾</option>
                <option data-for-province="四川">广安</option>
                <option data-for-province="四川">达州</option>
                <option data-for-province="四川">眉山</option>
                <option data-for-province="四川">雅安</option>
                <option data-for-province="四川">巴中</option>
                <option data-for-province="四川">资阳</option>
                <option data-for-province="四川">阿坝</option>
                <option data-for-province="四川">甘孜</option>
                <option data-for-province="四川">凉山</option>
                <option data-for-province="西藏">拉萨</option>
                <option data-for-province="西藏">昌都</option>
                <option data-for-province="西藏">山南</option>
                <option data-for-province="西藏">日喀则</option>
                <option data-for-province="西藏">那曲</option>
                <option data-for-province="西藏">阿里</option>
                <option data-for-province="西藏">林芝</option>
                <option data-for-province="香港">香港</option>
                <option data-for-province="新疆">阿拉尔</option>
                <option data-for-province="新疆">乌鲁木齐</option>
                <option data-for-province="新疆">克拉玛依</option>
                <option data-for-province="新疆">吐鲁番</option>
                <option data-for-province="新疆">哈密</option>
                <option data-for-province="新疆">和田</option>
                <option data-for-province="新疆">阿克苏</option>
                <option data-for-province="新疆">喀什</option>
                <option data-for-province="新疆">克孜勒苏柯尔克孜</option>
                <option data-for-province="新疆">巴音郭楞蒙古</option>
                <option data-for-province="新疆">昌吉</option>
                <option data-for-province="新疆">博尔塔拉蒙古</option>
                <option data-for-province="新疆">伊犁哈萨克</option>
                <option data-for-province="新疆">塔城</option>
                <option data-for-province="新疆">阿勒泰</option>
                <option data-for-province="新疆">石河子</option>
                <option data-for-province="新疆">土木舒克</option>
                <option data-for-province="新疆">五家渠</option>
                <option data-for-province="云南">昆明</option>
                <option data-for-province="云南">曲靖</option>
                <option data-for-province="云南">玉溪</option>
                <option data-for-province="云南">保山</option>
                <option data-for-province="云南">昭通</option>
                <option data-for-province="云南">丽江</option>
                <option data-for-province="云南">普洱</option>
                <option data-for-province="云南">临沧</option>
                <option data-for-province="云南">文山</option>
                <option data-for-province="云南">红河</option>
                <option data-for-province="云南">西双版纳</option>
                <option data-for-province="云南">楚雄</option>
                <option data-for-province="云南">大理</option>
                <option data-for-province="云南">德宏</option>
                <option data-for-province="云南">怒江</option>
                <option data-for-province="云南">迪庆</option>
                <option data-for-province="浙江">杭州</option>
                <option data-for-province="浙江">宁波</option>
                <option data-for-province="浙江">温州</option>
                <option data-for-province="浙江">嘉兴</option>
                <option data-for-province="浙江">湖州</option>
                <option data-for-province="浙江">绍兴</option>
                <option data-for-province="浙江">金华</option>
                <option data-for-province="浙江">衢州</option>
                <option data-for-province="浙江">舟山</option>
                <option data-for-province="浙江">台州</option>
                <option data-for-province="浙江">丽水</option>
              </select>
            </div>
						
				
*/
jQuery.fn.extend({
		smart_city:function(){
			var $root = jQuery(this);
			var $province = $root.find('.js_province');
			var $city = $root.find('.js_city');
			var $city_copy = $city.clone(true);	
			
			var $city_options = $city_copy.find('option[data-for-province]');
			var $city_default_copy = $city_copy.find('option[data-default-option="yes"]');	
					
		  function show_city_option(){				
				$city.empty();
				$city_default_copy.appendTo($city);
				
				var $selected_provice = $province.find('option:selected');								
				if(!($selected_provice[0].getAttribute('data-default-option')=='yes')){
					var selected_provice_str = jQuery.trim($selected_provice.text());	
					var $this_provice_city_copy = $city_options.filter('option[data-for-province="'+selected_provice_str+'"]').clone();					
					
					$this_provice_city_copy.appendTo($city);											
				};//end if
				
				$city.find('option[data-default-option="yes"]')[0].setAttribute("selected","selected");		
			}//end function show_city_option()
			
			show_city_option();		
				
			$province.change(function(){
				show_city_option();				
			});
		}		
});//END smart_city


		
		
		var china_city_array = [['北京市','北京市'],
		['上海市','上海市'],
		['天津市','天津市'],
		['重庆市','重庆市'],
		['河北省','石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水'],
		['山西省','太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'],
		['内蒙古自治区','呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善'],
		['辽宁省','沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'],
		['吉林省','长春','吉林','四平','辽源','通化','白山','松原','白城','延边'],
		['黑龙江','哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭'],
		['江苏省','南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁'],
		['浙江省','杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水'],
		['安徽省','合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城'],
		['福建省','福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德'],
		['江西省','南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶'],
		['山东省','济南','青岛','淄博','枣庄','东营','烟台','潍坊','威海','济宁','泰安','日照','莱芜','临沂','德州','聊城','滨州','菏泽'],
		['河南省','郑州','开封','洛阳','平顶山','焦作','鹤壁','新乡','安阳','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店'],
		['湖北省','武汉','黄石','襄樊','十堰','荆州','宜昌','荆门','鄂州','孝感','咸宁','随州','恩施','黄冈','仙桃','潜江','天门','神农架林区'],
		['湖南省','长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西'],
		['广东省','广州','深圳','珠海','汕头','韶关','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'],
		['广西自治区','南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左'],
		['海南省','海口','三亚','文昌','琼海','万宁','五指山','东方','儋州','临高县','屯昌县','定安县','澄迈县','琼中黎族苗族自治县','保亭黎族苗族自治县','白沙黎族自治县','昌江黎族自治县','乐东黎族自治县','陵水黎族自治县'],
		['四川省','成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','宜宾','广安','达州','眉山','雅安','巴中','资阳',"阿坝","甘孜","凉山"],
		['贵州省','贵阳','六盘水','遵义','安顺','铜仁','毕节','黔西南','黔东南','黔南'],
		['云南省','昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','文山','红河','西双版纳','楚雄','大理','德宏','怒江','迪庆'],
		['西藏自治区','拉萨','昌都','山南','日喀则','那曲','阿里','林芝'],
		['陕西省','西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛'],
		['甘肃省','兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南'],
		['青海省','西宁','海东','海北','黄南','海南','果洛','玉树','海西'],
		['宁夏自治区','银川','石嘴山','吴忠','固原','中卫'],
		['新疆自治区','阿拉尔','乌鲁木齐','克拉玛依','吐鲁番','哈密','和田','阿克苏','喀什','克孜勒苏柯尔克孜','巴音郭楞蒙古','昌吉','博尔塔拉蒙古','伊犁哈萨克','塔城','阿勒泰','石河子','土木舒克','五家渠'],
		['香港特别行政区','香港特别行政区'],
		['澳门特别行政区','澳门特别行政区'],
		['台湾省','台北','高雄','基隆','台中','台南','新竹','嘉义']];  
		
//js_choose_city	
jQuery.fn.extend({
		choose_city:function(city_array,selected_provice_str,selected_city_str){
		var $root = jQuery(this);
		var $province = $root.find('.js_province');
		var $city = $root.find('.js_city');
		
		var len = city_array.length;	
		
		
		function init(){
			$province.empty();
			for(var i=0;i<len;i++){
				jQuery('<option value="'+city_array[i][0]+'">'+city_array[i][0]+'</option>').appendTo($province);	
			};//END for
			
			var $selected_provice = $province.find('option').filter('[value="'+selected_provice_str+'"]');
			//$selected_provice.attr('selected','selected'); fix ie6 bug
			$selected_provice.get(0).setAttribute("selected","true");
			
			function get_province_index(provice_str){
				for(var i=0;i<city_array.length;i++){
					if(city_array[i][0]==provice_str){
						return i;
					};//end if
				};//end for
			}//end function get_province_index(str_selected_provice)			
			var selected_provice_index = get_province_index(selected_provice_str);			
			//var selected_provice_index = $selected_provice.index();
			
			
			$city.empty();
			for(var i=0;i<city_array[selected_provice_index].length;i++){
				jQuery('<option value="'+city_array[selected_provice_index][i]+'">'+city_array[selected_provice_index][i]+'</option>').appendTo($city);	
			};//end for
			//$city.find('option').filter('[value="'+selected_city_str+'"]').attr('selected','selected'); fix ie6 bug
			$city.find('option').filter('[value="'+selected_city_str+'"]').get(0).setAttribute("selected","true");
		}  		  
		init();

		//START $this_sel.change()
		$province.change(function(){
			 var $option_sel = $province.find('option:selected');
			 var index = $province.find('option:selected').index();
			 $city.empty();	
			 var city_count = city_array[index].length;				 
			 for(var j=1;j<city_count;j++){
				 jQuery('<option value="'+city_array[index][j]+'">'+city_array[index][j]+'</option>').appendTo($city);
			 };//END for					
		});//END $this_sel.change()		
		}	
});//END choose_city


//js_fade_slide

/*
<div class="js_fade_slide">
	<div class="js_stage">
		<div class="first_img"><img src="images/first_img.png" alt=""/></div>
	</div>	
	<div class="imgs">
		<div class="img_item"><img src="images/1.png" alt=""/></div>
		<div class="img_item"><img src="images/2.png" alt=""/></div>
		<div class="img_item"><img src="images/3.png" alt=""/></div>
		<div class="img_item"><img src="images/4.png" alt=""/></div>
		<div class="img_item"><img src="images/5.png" alt=""/></div>
	</div>	
	<div class="js_holder">
		<a>1</a>
		<a>2</a>
		<a>3</a>
		<a>4</a>
	</div>
</div>
*/
jQuery.fn.extend({
	fade_slide:function($holder_items,$imgs,$stage){
			var $root = jQuery(this);
			var $stage = $root.find('.js_stage').css({'position':'relative'});		
			var len = $imgs.length;
			var imgs_src = [];
			var fade_speed = 1000;
			var interval_time = 5000;
		
			$imgs.each(function(idx){
				 var $this_img = jQuery(this);
				 imgs_src[idx] = $this_img.attr('src');	
			});		

			$holder_items.eq(0).addClass('active');
	
			//START function addimg(index){}
			var $last_img = null;		
			function addimg(i,speed){			 
					if($last_img){
						$last_img.fadeOut(speed,function(){
								jQuery(this).remove();
						});	
					};
					
					$last_img = jQuery('<div><img src="'+imgs_src[i]+'" alt="" /></div>').css({
						'position':'absolute',
						'left':0,
						'top':0,
						'display':'none'
					}).appendTo($stage).fadeIn(speed);	 				
					
					$holder_items.removeClass('active');
					$holder_items.eq(i).addClass('active');
			};//END function addimg(i){}	

			$holder_items.each(function(index){
				jQuery(this).click(function(){
					 addimg(index,fade_speed);	
					 if(index==(len-1)){
						 n=0;
					 }else{
						 n=index+1;
					 };//end if else
				});
	  	});	//end $root.find('.btns a').each()
		
			var stop_flag = false;
			$root.hover(function(){stop_flag = true},function(){stop_flag = false});			
  
			setTimeout(function(){
			   $stage.find('.first_img').fadeOut(fade_speed,function(){
					   jQuery(this).remove();
				});
			},interval_time);

			var n=1;			
				var Timer_2=window.setInterval(function(){
					if(!stop_flag){
						addimg(n,fade_speed);						
						n++;
						if(n>=$imgs.length){
							n=0;
						};//END if		
					};//END if					
				},interval_time);//END Timer_2			
	}	
});//END js_fade_slide




//START select_simulator
jQuery.fn.extend({
	select_simulator:function(){
		var $root = jQuery(this);
		var $selected_option = $root.find('.selected_option');
		var $tpl = $root.find('.dropdown_list');	
		var $copy = $tpl.clone();
		var target_pos = $selected_option.position();	
		
		var $form = $root.find('form.js_choose_category');
		
		$copy.css({'left':target_pos.left,'top':target_pos.top,'display':'none','z-index':'10'}).mouseleave(function(){
				jQuery(this).hide();
		}).appendTo($root.offsetParent());//添加到$root定义了position的最近一级的祖先元素 (this is important)
		
		$copy.find('li a').each(function(){
			jQuery(this).click(function(){
				$form.find('.js_selected_val').attr('value',jQuery(this).attr('rel'));
				$form.submit();
				return false;
			});
		});
				
	  $selected_option.mouseover(function(){
		  $copy.css({'display':'block'}).show();
	  });	
	}
});//end select_simulator


/*
js_slide_h

<div class="js_slide_h">
  <div class=" js_play_list">
    <div class="js_play_item"></div>
    <div class="js_play_item"></div>
    <div class="js_play_item"></div>
    <div class="js_play_item"></div>
    <div class="js_play_item"></div>
  </div>
  <div class="btn_prev"><a href="javascript:;" class="js_btn_prev">&nbsp;</a></div>
  <div class="btn_next"><a href="javascript:;" class="js_btn_next">&nbsp;</a></div>
</div>


*/

jQuery.fn.extend({
	slide_h:function(){
		var $root = jQuery(this);
		var $list= $root.find('.js_play_list');
		var $btn_prev = $root.find('.js_btn_prev');
		var $btn_next = $root.find('.js_btn_next');
		var $items = $list.find('.js_play_item');
		var len = $items.length;
		var animate_style= 'easeOutBack';
		var animate_speed = 400;
		var w = $items.width();
		var flag = true;
		
		var cur_idx = 0;
		
		$btn_prev.addClass('disabled');
		
		var go2 = function(idx){
			var marginLeft = -idx*w;
			$list.stop(true,false).animate({marginLeft:marginLeft},animate_speed,function(){
				cur_idx = idx;
				if(cur_idx==0){
					$btn_prev.addClass('disabled');
				}else if(cur_idx==(len-1)){
					$btn_next.addClass('disabled');
				}else if((cur_idx>0)&&(cur_idx<(len-1))){
					$btn_prev.removeClass('disabled');
					$btn_next.removeClass('disabled');
				};//end if else
			});//end animate
		}//end go2(idx)
		
		$btn_prev.click(function(){			
			if((!($list.is(':animated')))&&(!($btn_prev.hasClass('disabled')))){
				--cur_idx;
        go2(cur_idx);
			};//end if
	  });//end reg click
		
		$btn_next.click(function(){			
			if((!($list.is(':animated')))&&(!($btn_next.hasClass('disabled')))){
				++cur_idx;
        go2(cur_idx);
			};//end if
	  });//end reg click
		
		
	}
});//end slide_h

/*
js_slide_v
<div class="slide_v js_slide_v">
          <div class="js_stage"></div>
          <div class="js_item_des"></div>
          <div class="btn_prev_group"><a href="javascript:;" class="js_btn_prev_group"></a></div>
          <div class="btn_next_group"><a href="javascript:;" class="js_btn_next_group"></a></div>
          <div class="holder">
            <ul class="js_list">
              <li><img src="images/en/pic/school_pop_gallery_thumb_1.png" alt="这里是每张图片的描述文字 1" data-big-src="images/en/pic/school_pop_gallery_pic_1.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_2.png" alt="这里是每张图片的描述文字 2" data-big-src="images/en/pic/school_pop_gallery_pic_2.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_3.png" alt="这里是每张图片的描述文字 3" data-big-src="images/en/pic/school_pop_gallery_pic_3.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_4.png" alt="这里是每张图片的描述文字 4" data-big-src="images/en/pic/school_pop_gallery_pic_4.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_5.png" alt="这里是每张图片的描述文字 5" data-big-src="images/en/pic/school_pop_gallery_pic_5.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_6.png" alt="这里是每张图片的描述文字 6" data-big-src="images/en/pic/school_pop_gallery_pic_6.png"/><span class="thumb_mask"></span></li>
              <li><img src="images/en/pic/school_pop_gallery_thumb_7.png" alt="这里是每张图片的描述文字 7" data-big-src="images/en/pic/school_pop_gallery_pic_7.png"/><span class="thumb_mask"></span></li>
            </ul>
          </div>
        </div>
*/
//START slide_v
jQuery.fn.extend({
   slide_v:function(){
		var $root = jQuery(this);
		var $stage = $root.find('.js_stage');
		var $list= $root.find('.js_list');
		var $btn_prev_group = $root.find('.js_btn_prev_group');
		var $btn_next_group = $root.find('.js_btn_next_group');
		var $items = $list.find('li');
		var $item_des = $root.find('.js_item_des');
		var len = $items.length;
		var animate_style= 'easeOutBack';
		var animate_speed = 400;
		var fade_speed = 1000;
		var h = $items.outerHeight(true);
		var flag = true;
		var big_src = [];
		var pic_des = [];
		var step_size = 4;
		var interval_time = 5000;
	  var step_distance = h*step_size;
		var max_group_idx = Math.floor((len-1)/step_size);
		var cur_idx = 0;	
		var $last_img = null;
		
		for(var i=0;i<len;i++){
			big_src[i]=$items[i].getElementsByTagName('img')[0].getAttribute('data-big-src');
			pic_des[i] = $items[i].getElementsByTagName('img')[0].getAttribute('alt');
		};//end for
		
		function addimg(i){
			if($last_img){
				$last_img.animate({'opacity':0},fade_speed,function(){
					jQuery(this).remove();
				});
			};//end if	
					
			$last_img = jQuery('<img src="'+big_src[i]+'" alt="'+pic_des[i]+'" />').css({
				'position':'absolute',
				'top':0,
				'left':0,
				'opacity':0
			}).appendTo($stage).animate({'opacity':1},fade_speed);
		}//end function addimg(i)
		
		function go2group(group_idx){
			$list.stop(true,false).animate({'top':-group_idx*step_distance},animate_speed,animate_style,function(){
				if(group_idx==max_group_idx){
					$btn_next_group.addClass('disabled');
					$btn_prev_group.removeClass('disabled');
				}else if(group_idx==0){
					$btn_prev_group.addClass('disabled');
					$btn_next_group.removeClass('disabled');
				}else if((group_idx>0)&&(group_idx<max_group_idx)){
					$btn_prev_group.removeClass('disabled');
					$btn_next_group.removeClass('disabled');
				};//end if else
			});//end $list.animate			
		}//end function go2group(idx)
		
		$btn_prev_group.click(function(){
			if((!$btn_prev_group.hasClass('disabled'))&&(!($list.is(':animated')))){
				var	prev_group_idx = Math.floor(cur_idx/step_size)-1;				
				go2group(prev_group_idx);
				$items.eq(prev_group_idx*step_size).trigger('click');
			};//end if
		});//end reg $btn_prev_group.click
		
		$btn_next_group.click(function(){
			if((!$btn_next_group.hasClass('disabled'))&&(!($list.is(':animated')))){
				var	next_group_idx = Math.floor(cur_idx/step_size)+1;				
				go2group(next_group_idx);
				$items.eq(next_group_idx*step_size).trigger('click');
			};//end if
		});//end reg $btn_next_group.click
		
		
		$items.each(function(i){
			jQuery(this).click(function(){
				addimg(i);
				$items.removeClass('active').eq(i).addClass('active');
				$item_des.empty().append(pic_des[i]);
				cur_idx = i;
				n = i;
			});//end reg click
		});//end $items.each
		
		//init
		(function(){
			if(len<=step_size){
				$btn_prev_group.hide();
				$btn_next_group.hide();
			};			
			$btn_prev_group.addClass('disabled');
			$items.eq(0).trigger('click'); 
		})();
		
		//$stage.hover(function(){flag = true;},function(){flag = false;})
		
		var n=0;
		var Timer = window.setInterval(function(){
			if(flag){
				n++;
				if(n>=len){
					n=0;
				};
				$items.eq(n).trigger('click');
				go2group(Math.floor(n/step_size));				
			};//end if
		},interval_time);//end setInterval
		
		

	 }	
});//end slide_v


//START ini_astv2_datepicker

/*
s
参考项目  //mm06 
         //mh01

*/
jQuery.fn.extend({
	ini_astv2_datepicker:function(cur_lang,begin_minDate_dateObj){
		   var $root = jQuery(this);
			 var $date_begin=$root.find('.js_date_begin');
			 var $date_end=$root.find('.js_date_end');
			 
			 //$date_begin.attr('value','');
			 //$date_end.attr('value','');
			 
			function parseDate( str ){
				var ra = /([\d]{2,4})-([\d]{1,2})-([\d]{1,2})/.exec(str);
				return Date.parse(ra[2] + '/' + ra[3] + '/' + ra[1]);
			}			
				
			 switch(cur_lang){
				 case 'en':
							datepicker_settings = {
							dateFormat : 'yy-mm-dd',
							monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
							monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
							prevText : 'Earlier',
							nextText : 'Later',
							dayNames : ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
							dayNamesMin : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
							dayNamesShort :['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
							yearSuffix : '',
							'showMonthAfterYear':false
						};
				 break;
				 case 'zh':
							datepicker_settings = {
							monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
							monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
							prevText : '上一月',
							nextText : '下一月',
							dayNames : ['日','一','二','三','四','五','六'],
							dayNamesMin : ['日','一','二','三','四','五','六'],
							dayNamesShort :  ['日','一','二','三','四','五','六'],
							dateFormat : 'yy-mm-dd',
							yearSuffix : '年',
							'showMonthAfterYear':true
						};
				 break;
			 };//END switch()			 

				if( $date_begin.length && $date_end.length ){				
					$date_begin.datepicker(datepicker_settings);
					$date_end.datepicker(datepicker_settings);
					
					$date_begin.datepicker('option',{
						'minDate' : begin_minDate_dateObj,/*new Date('<?php echo date( "Y/m/d" , time() ) ?>')*/
						'maxDate':'+1y'
					});
					
					var date_begin_str = begin_minDate_dateObj.getFullYear() + '-' + (begin_minDate_dateObj.getMonth()+1) + '-' + begin_minDate_dateObj.getDate();
					
					$date_end.datepicker('option',{
						'minDate':begin_minDate_dateObj,//(new Date( parseDate(date_begin_str)+24*3600*1000 ) ),
						'maxDate':(new Date( parseDate(date_begin_str)+366*24*3600*1000 ) )	
					});
					
					//REG $date_begin events
					$date_begin.datepicker( 'option', {
						'onSelect':function(dateText, inst) {
							$date_end.datepicker( 'option', {'minDate':(new Date( parseDate(dateText) ) ),'maxDate':(new Date( parseDate(dateText)+366*24*3600*1000 ) )} );
						}//end 'onSelect':function(dateText, inst) {}
					});// end REG $date_begin events
					
				};//end if
	}

})



//END ini_astv2_datepicker



	//google map		
	echoLab.googleMap = {};
	
	
	//写入google map 地图坐标 ，接受参数为坐标对数组
	echoLab.googleMap.set_icons_to_map = function(){
					
	};






