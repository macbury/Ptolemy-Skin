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

			var scrollTop1 = Math.abs($('.sidebar ul').position().top);
			var scrollTop2 = Math.abs($('.main .content').position().top);
			
			$('.sidebar ul, .main .content').jScrollPaneRemove();
			$('.main .content').jScrollPane({
				scrollbarWidth: 14,
				wheelSpeed: 32,
				showArrows: true,
				scrollbarMargin: 0,
				topCapHeight: 17
			});		
			$('.sidebar ul').jScrollPane({
				scrollbarWidth: 14,
				wheelSpeed: 32,
				showArrows: true,
				scrollbarMargin: 0
			});	
			
			$('.sidebar ul')[0].scrollTo(scrollTop1);
			$('.main .content')[0].scrollTo(scrollTop2);
		}).resize();
		
		$("#tree").sortable({
			placeholder: 'placeholder'
		});
		
		setInterval(function () {
			$('.main .header').css('width', $('#songs').width());
		}, 500);
		
		setInterval(function () {
			var top = $('#band').css('margin-top') == "0px" ? -14 : 0;
			
			$('#band').animate({
				'margin-top': top
			}, 1000, 'swing');
		}, 8000);
	},
	
}