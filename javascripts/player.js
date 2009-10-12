var player = {
	
	init: function(){
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
		
		$('.search input').focus(function () {
			if ($(this).val() == 'Search...') { $(this).val(''); };
		}).blur(function () {
			if ($(this).val() == '') { $(this).val('Search...'); };
		});

		$(window).resize(function(){ 
			var scrollTop = Math.abs($('.sidebar ul').position().top);
			
			$('.sidebar ul').jScrollPaneRemove();
			$('.sidebar ul').jScrollPane({
				scrollbarWidth: 14,
				wheelSpeed: 32,
				showArrows: true,
				scrollbarMargin: 0
			});		
			console.log(scrollTop);		
			$('.sidebar ul')[0].scrollTo(scrollTop);
		}).resize();
		
		$("#tree").sortable({
			placeholder: 'placeholder'
		});
		
		setInterval(function () {
			var top = $('#band').css('margin-top') == "0px" ? -14 : 0;
			
			$('#band').animate({
				'margin-top': top
			}, 1000, 'swing');
		}, 8000);
	},
	
}