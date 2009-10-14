var PlayListController = {
	
	songs: new DataSource({
		remote_url: 'data/songs.js',
		inflector: ['song', 'songs'],
		
		onRefresh: function () {
			PlayListController.playListTableView.tableView('reloadData');
			PlayListController.onWindowResize();
		}
	}),
	
	init: function(){
		var self = this;
		
		$('.search input').focus(function () {
			if ($(this).val() == 'Search...') { $(this).val(''); };
		}).blur(function () {
			if ($(this).val() == '') { $(this).val('Search...'); };
		});
		
		this.playListTableView = $('.main').tableView({ delegate: this });
		
		var resize_updater = null;
		
		$(window).resize(function(){ 
			clearTimeout(resize_updater);
			
			resize_updater = setTimeout(function () {
				self.onWindowResize();
			}, 200);
		});
		
		self.onWindowResize();
		$('.main .content')[0].scrollTo(0);
		
		$("#tree").sortable({
			placeholder: 'placeholder'
		});
	},
	
	onWindowResize: function(){
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
		
		$('.main .header').css('width', $('.main .content table').width());
	},
	
	/* UITableView Delegate */
	
	tableColumns: function (tableView) {
		return  [{ text: '', css: 'status' }, { text: 'Title' }, { text: 'Time', css: 'time' }, { text: 'Artist', css: 'artist' }, { text: 'Genre', css: 'genre' } ];
	},
	
	contentForHeaderColumn: function(tableView, column, index){ 
		var th = $('<th>'+column.text+'</th>');
		th.addClass(column.css);
		return th;
	},
	
	dataSource: function(tableView) {
		return this.songs;
	},
	
	clickedRow: function(tableView, row) {
		
	},
	
	doubleClickedRow: function(tableView, row) { 
		$('#band').text(row.artist);
		$('#name').text(row.title);
	},
	
	hintForDraggedRow: function(tableView, row) {
		return row.title + " - " + row.artist;
	}, 
	
	contentForRowByColumn: function(tableView, row, column, column_index){
		var td = $('<td></td>');
		td.addClass(column.css);
		
		if (column_index == 1) {
			td.text(row.title);
		} else if (column_index == 2) {
			td.text(distance_of_time_in_words(row.time));
		} else if (column_index == 3) {
			td.text(row.artist);
		} else if (column_index == 4) {
			td.text(row.genre);
		}
		
		return td;
	},
}