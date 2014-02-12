jQuery(function(){
   var BeautySelect = new Class();
   
  //console.dir(BeautySelect);
   
   BeautySelect.include({	   
	  change:function(func){
		   func.apply(jQuery(this),arguments);
	  },
	  sourceSelectObj:jQuery(this),
	  getOptions:function(){
		  
	  },
	  init:function(element){
		  this.element = jQuery(element);
		  this.element.change(this.proxy(this.change));		
	  }
   });
   
   var province = new BeautySelect('.js_province');
   
   
   province.change = function(){
	  console.log('aa');   
   }
   
   
})