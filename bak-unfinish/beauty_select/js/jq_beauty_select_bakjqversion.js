


/*
echo 201309 update							
*/
//beauty_select	
jQuery.fn.extend({
	beauty_select:function(){
		var $this = jQuery(this);
		var $body = jQuery('body');	
				
		var tpl_html = '<div class="v3_cus_select_wrap js_select_tpl js_beauty_select"><span class="v3_select_hd js_select_hd"></span><div class="v3_select_bd js_select_bd"><ul class="list"></ul></div></div>';		
		var $tpl = jQuery(tpl_html);
		
		var $options = $this.find('option');
		var $selected_option =  $options.filter('[selected=true]');
		var selected_option_str = $selected_option.text();
		var selected_option_val = $selected_option.attr('value');
		var selected_option_index = $selected_option.index();
		
		var css_option = {};		
		var offsetLeft = 0;
		var offsetTop = -8;
		
		var li_str = '';
		for(var i=0,m = $options.length; i<m; i++){
			li_str = li_str +  '<li data-val="'+ $options.eq(i).attr('value') +'">' + $options.eq(i).text() + '</li>';					
		};
		
		$tpl.find('.js_select_hd').text(selected_option_str);		
		jQuery(li_str).appendTo($tpl.find('.list'));		
		$tpl.find('.js_select_bd .list li').eq(selected_option_index).addClass('selected');		
	
		function getPosition(element) {
			var actualLeft = element.offsetLeft,
				actualTop = element.offsetTop,
				current = element.offsetParent; 
		
			while (current !== null) {
				actualLeft += current.offsetLeft;
				actualTop += current.offsetTop;
				current = current.offsetParent;
			};

			return {
				left: actualLeft,
				top: actualTop
			};
		}
		
		function updateData($sele_ori,str,val){
			$sele_ori.find('option').remove();
			jQuery('<option value="' + val + '">' + str + '</option>').appendTo($sele_ori);
			$sele_ori.find('option')[0].setAttribute("selected","true");
		}
		
		(function(){			
			var top = getPosition($this[0]).top + offsetTop;
			var left = getPosition($this[0]).left;
			var $hd = $tpl.find('.js_select_hd');
			var $bd = $tpl.find('.js_select_bd');			

			
			css_option = {'position':'absolute','top':top,'left':left}; 			
			$tpl.css(css_option);
			$tpl.find('.js_select_bd').hide();
			
			$hd.click(function(){
				if($bd.is(':visible')){
					$bd.hide();
				}else{
					$bd.show();
				}
			});
			
			$bd.delegate('li','click',function(){
			  	var str = jQuery(this).text();
				var val = '';
				var index = jQuery(this).index();
				
				if(str!=selected_option_str){
					$hd.text(str);
					val = jQuery(this).attr('data-val');
					$bd.find('li').removeClass('selected').eq(index).addClass('selected');
					selected_option_str = str;	
					updateData($this,str,val);					
				};
				$bd.hide();										
			});
			
			
			
			$tpl.attr('data-name',$this.attr('name'));
			$tpl.removeClass('js_select_tpl');
			
			$this.hide();			
			$tpl.appendTo($body);
			updateData($this,selected_option_str,selected_option_val);
					
		})();
		

	
	
	
	}
});