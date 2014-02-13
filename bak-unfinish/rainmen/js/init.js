// JavaScript Document
jQuery(function(){
	var $w = jQuery(window);
    var $page = jQuery('.js_page');
	var interval_time = 1000;
	
	function setPageSize(){
		$page.width($w.innerWidth()).height($w.innerHeight());
	}
	
	$w.resize(function(){
		setPageSize();
	});
	
	var rainmen = function(scale,position){
		this.scale = scale;
		this.position = position;
		
		
		
	}
	
	
      
});