/*
echo update 20130325

html5 Document Type required
jQuery 1.6+   required
please not use jquery1.9 or 1.9+ , it has bug in jquery1.9+

*/
	//START function calculate_boolean_array()
	function calculate_boolean_array($boolean_array){
		var len = $boolean_array.length;
		var flag_temp =true;
		for(var i=0;i<len;i++){
			flag_temp = flag_temp&&$boolean_array[i];		
		};
		return flag_temp;		
	}//END function calculate_boolean_array()
	
//无验证简单提交父表单	
jQuery.fn.extend({
	simpleSubmit_parentForm:function(){		
		jQuery(this).click(function(){
			jQuery(this).parents(".jsv_form").submit();
		});
	}
});

//label_input
jQuery.fn.extend({
	label_input:function(){
		var $obj = jQuery(this);
		var $input = $obj.find('.js_input');
		var $label = $obj.find('label');

		$input.focusin(function(){
			$label.hide();
		});		

		$input.focusout(function(){			
			if(($input.val()===''||$input.val()===undefined)){
				$label.show();
			}else{
			    $label.hide();	
			};
		});	
		//init
		
		
		$input.focusout();
			
			
	}		
});//END label_input

//validate_fe_text
jQuery.fn.extend({
	 validate_fe_text:function(){
		  var $text_obj = jQuery(this);
			var result = false;
			var $error_tip = $text_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
			var error_tip_set = $text_obj.attr('data-error-tip').split('|');
			
			/*
			var multi_result ;
			if(error_tip_set.search(/(\S)+\|/)==-1){//如果不存在多个报错结果文字
				multi_result = false;
			}else{
			    multi_result = true;
			};
			*/
			
			if($text_obj.val()===''||$text_obj.val()===undefined){				
				 $error_tip.empty().html(error_tip_set[0]);
				 $text_obj.closest('.jsv_fe_wrap').addClass('error');
				 result = false;
			}else{
				 $text_obj.closest('.jsv_fe_wrap').removeClass('error');
				 $error_tip.empty();
				 result = true;
			};	
			return result;	
	 }
});


//validate_fe_for_url
jQuery.fn.extend({
	 validate_fe_for_url:function(){
		  var $obj = jQuery(this);
			var result = false;
			var $error_tip = $obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
			var error_tip_set = $obj.attr('data-error-tip').split('|');
			var urlReg_pattern = /[0-9a-zA-Z\&_]{0,}[0-9a-zA-Z\s\&_]*[0-9a-zA-Z_\&]$/ ;
			
			/*
			var multi_result ;
			if(error_tip_set.search(/(\S)+\|/)==-1){//如果不存在多个报错结果文字
				multi_result = false;
			}else{
			    multi_result = true;
			};
			*/
			if($obj.val()==''||$obj.val()=='undefined'){
				$error_tip.empty().html(error_tip_set[0]);
				$obj.closest('.jsv_fe_wrap').addClass('error');
				result = false;
			}else if( !($obj.val().match(urlReg_pattern) )){
				 $error_tip.empty().html(error_tip_set);
				 $obj.closest('.jsv_fe_wrap').addClass('error');
				 result = false;
			}else{
				 $obj.closest('.jsv_fe_wrap').removeClass('error');
				 $error_tip.empty();
				 result = true;
			};	
			return result;	
	 }
});


//validate_fe_email
jQuery.fn.extend({
	 validate_fe_email:function(){
		  var $email_obj = jQuery(this);
			var result = false;			
			
			var $error_tip = $email_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
			var error_tip_set = $email_obj.attr('data-error-tip').split('|');
						
			var pattern_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			
			if($email_obj.val()===''||$email_obj.val()===undefined){				
				$error_tip.empty().html(error_tip_set[0]);
				$email_obj.closest('.jsv_fe_wrap').addClass('error');
				result = false;
			}else if($email_obj.val().search(pattern_reg)===-1){				
				$error_tip.empty().html(error_tip_set[1]);
				$email_obj.closest('.jsv_fe_wrap').addClass('error');
				result = false;
			}else if($email_obj.val().search(pattern_reg)===0){				
				$email_obj.closest('.jsv_fe_wrap').removeClass('error');
				$error_tip.empty();
				result = true;
			};
			return result;
	 }
});





//validate_fe_postcode
jQuery.fn.extend({
	validate_fe_postcode:function(){
		    var $postcode_obj = jQuery(this);
			var result = false;
			var $error_tip = $postcode_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
			var error_tip_set = $postcode_obj.attr('data-error-tip').split('|');

			var pattern_reg = /^[\d]{6}$/;
			
			if($postcode_obj.val()===''||$postcode_obj.val()===undefined){
				$error_tip.empty().html(error_tip_set[0]);
				$postcode_obj.closest('.jsv_fe_wrap').addClass('error');
				result = false;
			}else if($postcode_obj.val().search(pattern_reg)===-1){
				$error_tip.empty().html(error_tip_set[1]);
				$postcode_obj.closest('.jsv_fe_wrap').addClass('error');
				result = false;
			}else if($postcode_obj.val().search(pattern_reg)===0){
				$postcode_obj.closest('.jsv_fe_wrap').removeClass('error');
				$error_tip.empty();
				result = true;
			};
			return result;
		}
});

//validate_fe_mobile
jQuery.fn.extend({
	validate_fe_mobile:function(){
		var $mobile_obj = jQuery(this);
		var result = false;
		var $error_tip = $mobile_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $mobile_obj.attr('data-error-tip').split('|');

		var pattern_reg = /(^1\d{10}$)/;
		
		if($mobile_obj.val()===''||$mobile_obj.val()===undefined){
			$error_tip.empty().html(error_tip_set[0]);
			$mobile_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($mobile_obj.val().search(pattern_reg)==-1){
			$error_tip.empty().html(error_tip_set[1]);
			$mobile_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($mobile_obj.val().search(pattern_reg)==0){
			$mobile_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;
	}
});

//validate_fe_phone
jQuery.fn.extend({
	validate_fe_phone:function(){/* 验证手机和固话，区号和分机用-分隔，如13800138000， 021-58976398-8603 21-66552211 ，或无区号的全国电话400-1234-5678 ，800-5588-9966 */
		var $phone_obj = jQuery(this);
		var result = false;
		var $error_tip = $phone_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $phone_obj.attr('data-error-tip').split('|');

		var pattern_reg = /(^1\d{10}$)|((^400\d{8}$)|(^800\d{8}$))|(^((0\d{2,3})-)(\d{8})(-(\d{1,}))?$)/;
		
		if($phone_obj.val()===''||$phone_obj.val()===undefined){
			$error_tip.empty().html(error_tip_set[0]);
			$phone_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($phone_obj.val().search(pattern_reg)==-1){
			$error_tip.empty().html(error_tip_set[1]);
			$phone_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($phone_obj.val().search(pattern_reg)==0){
			$phone_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;
	}
});

//validate_fe_number
jQuery.fn.extend({
	validate_fe_number:function(){
		var $number_obj = jQuery(this);
		var result = false;
		var $error_tip = $number_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $number_obj.attr('data-error-tip').split('|');
		
		console.log('number')

		var pattern_reg = /^[\d]{3,}$/;
		
		if($number_obj.val()===''||$number_obj.val()===undefined){
			$error_tip.empty().html(error_tip_set[0]);
			$number_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($number_obj.val().search(pattern_reg)===-1){
			$error_tip.empty().html(error_tip_set[1]);
			$number_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($number_obj.val().search(pattern_reg)===0){
			$number_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;
	}
});

//validate_fe_password
jQuery.fn.extend({
	validate_fe_password:function(){
		var $password_obj = jQuery(this);
		var result = false;
		var $error_tip = $password_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $password_obj.attr('data-error-tip').split('|');

		var pattern_reg = /^\w{6,16}$/;
		
		if($password_obj.val()===''||$password_obj.val()===undefined){
			$error_tip.empty().html(error_tip_set[0]);
			$password_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($password_obj.val().search(pattern_reg)==-1){
			$error_tip.empty().html(error_tip_set[1]);
			$password_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($password_obj.val().search(pattern_reg)==0){
			$password_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;
	}
});


//validate_fe_checkbox
	/*
	checkbox     : <div class="jsv_fe_wrap">
	<span class="jsv_fe" data-jsv-type="checkbox"><label><input type="checkbox" autocomplete="off"/>请仔细阅读<a href="#" target="_blank">网站隐私条款</a></label></span>
	<div class="error_tip jsv_error_tip">请至少选择一项</div>	
	</div>
	*/
jQuery.fn.extend({
	validate_fe_checkbox:function(){
		var $checkbox_obj = jQuery(this);
		var result = false;
		var $error_tip = $checkbox_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $checkbox_obj.attr('data-error-tip').split('|');

		var checked_num = 0;
		var len = $checkbox_obj.find('input.jsv_fe_checkbox').length;
		
		for(var i=0;i<len;i++){
			if($checkbox_obj.find('input.jsv_fe_checkbox')[i].checked){checked_num++};//end if
		};//end for
		
		if(checked_num==0){
			$error_tip.empty().html(error_tip_set[0]);
			$checkbox_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if(checked_num>=1){
			$checkbox_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;
		

	}
});	

//validate_fe_select
/*
<div class="jsv_fe_wrap">
 <select class="jsv_fe" data-jsv-type="select" autocomplete="off">
     <option data-default-option="yes">default option</option>
	 <option>option 1</option>
	 <option>option 2</option>
	 <option>option 3</option>
 </select>
<div class="error_tip jsv_error_tip">这里是报错文字</div>	
</div>
*/
jQuery.fn.extend({
	validate_fe_select:function(){
		var $select_obj = jQuery(this);
		var result = false;
		var $error_tip = $select_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $select_obj.attr('data-error-tip').split('|');

		if($select_obj.find('option:selected').is('[data-default-option="yes"]')){
			$error_tip.empty().html(error_tip_set[0]);
			$select_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else{
			$select_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		};
		return result;	
	}
});	

//validate_fe_passsword_confirm
jQuery.fn.extend({
	/*
	password         : <input type="password"  data-jsv-type="password" id="id_str"/>
	password_confirm : <input type="password"  data-jsv-type="password_confirm" data-jsv-for="id_str" class="jsv_fe" data-error-tip="这里是报错文字"/>
	*/
	validate_fe_passsword_confirm:function(){
		var $passsword_confirm_obj = jQuery(this);
		var $password_obj = jQuery('#'+$passsword_confirm_obj.attr('data-jsv-for'));
		var result = false;
		var $error_tip = $passsword_confirm_obj.closest('.jsv_fe_wrap').find('.jsv_error_tip');
		var error_tip_set = $passsword_confirm_obj.attr('data-error-tip').split('|');

	
        if($passsword_confirm_obj.val()===''||$passsword_confirm_obj.val()===undefined){
			$error_tip.empty().html(error_tip_set[0]);
			$passsword_confirm_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		}else if($passsword_confirm_obj.val()===$password_obj.val()){
			$passsword_confirm_obj.closest('.jsv_fe_wrap').removeClass('error');
			$error_tip.empty();
			result = true;
		}else{
			$error_tip.empty().html(error_tip_set[1]);
			$passsword_confirm_obj.closest('.jsv_fe_wrap').addClass('error');
			result = false;
		};
		return result;
	}
});	



//blur_validate
jQuery.fn.extend({
  blur_validate:function(){
		var $form_obj = jQuery(this);
		var $items = $form_obj.find('.jsv_fe');
		var len = $items.length;
		var $items_text = $items.filter('[data-jsv-type="text"]');
		var $items_select = $items.filter('[data-jsv-type="select"]');
		var $items_checkbox = $items.filter('[data-jsv-type="checkbox"]');
		var $items_email = $items.filter('[data-jsv-type="email"]');
		var $items_phone = $items.filter('[data-jsv-type="phone"]');
		var $items_mobile = $items.filter('[data-jsv-type="mobile"]');
		var $items_postcode = $items.filter('[data-jsv-type="postcode"]');
		var $items_number = $items.filter('[data-jsv-type="number"]');
		var $items_password = $items.filter('[data-jsv-type="password"]');
		var $items_password_confirm = $items.filter('[data-jsv-type="password_confirm"]');
		

		//START traverse validate
		for(var j=0;j<len;j++){
			var jsv_type = $items.eq(j).attr('data-jsv-type');
			switch(jsv_type){
				case 'text':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_text();	
				});
				break;
				
				case 'select':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_select();	
				});
				break;
				
				case 'checkbox':				
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_checkbox();	
				});
				break;
				
				case 'email':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_email();	
				});
				break;
				
				case 'phone':				
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_phone();	
				});
				break;
				
				case 'mobile':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_mobile();	
				});
				break;
				
				case 'postcode':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_postcode();	
				});
				break;
				
				case 'number':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_number();	
				});
				break;
				
				case 'password':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_password();	
				});
				break;
				
				case 'password_confirm':
				$items.eq(j).blur(function(){
				    jQuery(this).validate_fe_password_confirm();	
				});
				break;
			};
		};//END traverse validate
		
	}
});	



//validate_form
jQuery.fn.extend({
  validate_form:function(){
		var $form_obj = jQuery(this);
		var $items = $form_obj.find('.jsv_fe');
		var len = $items.length;
		var flag_set =[];
		var $items_text = $items.filter('[data-jsv-type="text"]');
		var $items_select = $items.filter('[data-jsv-type="select"]');
		var $items_checkbox = $items.filter('[data-jsv-type="checkbox"]');
		var $items_email = $items.filter('[data-jsv-type="email"]');
		var $items_phone = $items.filter('[data-jsv-type="phone"]');
		var $items_mobile = $items.filter('[data-jsv-type="mobile"]');
		var $items_postcode = $items.filter('[data-jsv-type="postcode"]');
		var $items_number = $items.filter('[data-jsv-type="number"]');
		var $items_password = $items.filter('[data-jsv-type="password"]');
		var $items_password_confirm = $items.filter('[data-jsv-type="password_confirm"]');
		var $items_for_url = $items.filter('[data-jsv-type="for_url"]');
		
		for(var i=0;i<len;i++){
			flag_set[i]=false;
		};

		//START traverse validate
		for(var j=0;j<len;j++){
			var jsv_type = $items.eq(j).attr('data-jsv-type');
			switch(jsv_type){
				case 'text':
				flag_set[j] = $items.eq(j).validate_fe_text();
				break;
				case 'for_url':
				flag_set[j] = $items.eq(j).validate_fe_for_url();
				break;
				case 'select':
				flag_set[j] = $items.eq(j).validate_fe_select();
				break;
				case 'checkbox':
				flag_set[j] = $items.eq(j).validate_fe_checkbox();
				break;
				case 'email':
				flag_set[j] = $items.eq(j).validate_fe_email();
				break;
				case 'phone':
				flag_set[j] = $items.eq(j).validate_fe_phone();
				break;
				case 'mobile':
				flag_set[j] = $items.eq(j).validate_fe_mobile();
				break;
				case 'postcode':
				flag_set[j] = $items.eq(j).validate_fe_postcode();
				break;
				case 'number':
				flag_set[j] = $items.eq(j).validate_fe_number();
				break;
				case 'password':
				flag_set[j] = $items.eq(j).validate_fe_password();
				break;
				case 'password_confirm':
				flag_set[j] = $items.eq(j).validate_fe_password_confirm();
				break;
			};
		};//END traverse validate
		
		var jsv_form_flag = calculate_boolean_array(flag_set).valueOf();
		return jsv_form_flag;	
	}
});	


//get_formData
jQuery.fn.extend({
//未完善 file类型的输入数据
	 get_formData:function(){
		  var $form_obj = jQuery(this);
			var data_obj = {};
	    var $data_items = $form_obj.find('.js_data_item');
			
			var len = $data_items.length;
			
			for(var i=0;i<len;i++){
				
				var data_ele_type = '';// radio | checkbox | text | password | file | select | textarea
				
				
				var $this_ele = $data_items.eq(i);				

			  var item_val = '';
				
				if($this_ele.is('input')){					
						var input_type = $this_ele.attr('type');						
						switch(input_type){
							case 'radio':
							input_type= 'radio' ;
							break;
							case 'checkbox':
							input_type= 'checkbox' ;
							break;
							case 'text':
							input_type= 'text' ;
							break;	
							case 'hidden':
							input_type= 'hidden' ;
							break;	
							case 'password':
							input_type= 'password' ;
							break;
							case 'file':
							input_type= 'file' ;
							break;
						};//end switch
						
						data_ele_type = input_type;
						
				}else if($this_ele.is('select')){
					  data_ele_type = 'select';
				}else if($this_ele.is('textarea')){
					  data_ele_type = 'textarea';
				};//end if else if
				
				switch(data_ele_type){
					case 'radio' :
						if($this_ele.is(':checked')){
							var item_name = $this_ele.attr('name');
							item_val = $this_ele.attr('value');
							data_obj[item_name]=item_val;				 
						};
					break;
					case 'checkbox':
						if($this_ele.is(':checked')){
							var item_name = $this_ele.attr('name');
							item_val = $this_ele.attr('value');
							data_obj[item_name]=item_val;				 
						};
					break;
					case 'text':
						var item_name = $this_ele.attr('name');
						item_val = $this_ele.attr('value');
						data_obj[item_name]=item_val;				 
					break;	
					case 'hidden':
						var item_name = $this_ele.attr('name');
						item_val = $this_ele.attr('value');
						data_obj[item_name]=item_val;				 
					break;	
					case 'password':
						var item_name = $this_ele.attr('name');
						item_val = $this_ele.attr('value');
						data_obj[item_name]=item_val;				 
					break;
					case 'select':
						var item_name = $this_ele.attr('name');
						item_val = $this_ele.find('option:selected').attr('value');
						data_obj[item_name]=item_val;				 
					break;
					case 'textarea':
						var item_name = $this_ele.attr('name');
						item_val = $this_ele.attr('value');
						data_obj[item_name]=item_val;				 
					break;	
				};//end switch
				
			};//end for

			 return data_obj;
	 }
});//END get_formData
