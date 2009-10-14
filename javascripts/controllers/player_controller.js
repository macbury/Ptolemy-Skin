var PlayerController = {

	init: function(){
		var self = this;
		
		$('#volume').slider({
			value: 75,
			animate: true
		}).removeClass('ui-corner-all');
		
		$('#progress').slider({
			value: 0,
			range: "min",
			min: 1,
			max: 700
		}).removeClass('ui-corner-all');
		
		setInterval(function () {
			var top = $('#band').css('margin-top') == "0px" ? -14 : 0;
			
			$('#band').animate({
				'margin-top': top
			}, 1000, 'swing');
		}, 8000);
		
	},

}