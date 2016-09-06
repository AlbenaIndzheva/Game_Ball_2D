/* Albena 

Навигация с падащи менюта при клик. 
Падащите менюта да се скриват при повторен клик или клик извън менюто.
Да се направят два варианта, едни с jQuery и един без jQuery. 

*/

jQuery(document).ready(function(){
	jQuery( ".dropdown" ).click(function() {
		jQuery( ".dropdown" ).not(this).removeClass( "show" );
		jQuery( this ).toggleClass( "show" );
	});
	jQuery( window ).click(function(event) {
		 var target = $( event.target ).attr("class");
		  if (target !== "sub-menu-target") {
		  	 jQuery( ".dropdown"  ).removeClass( "show" );
		  }
	 
	});
});