//Author: Buras Arkadiusz
//Blog:  http://macbury.jogger.pl

$.widget("ui.tableView", {
	_init: function(){
		var element = $(this.element);
		
		var header = $('<table><tr></tr></table>');
		header.addClass(this.options.header_class.replace('.',''));
		element.append(header);
		this._buildTableColumns();
		
		var content = $('<div><table></table></div>');
		content.addClass(this.options.content_class.replace('.',''));
		element.append(content);
		
	},
	
	_setupSelectable: function(){
		var delegate = this.options.delegate || this.options;
		var self = this;
		
		var rows = $(this.element).find(this.options.content_class)
									 .find('table')
									 .find('tr');
		
		rows.click(function (e) {
			$(this).siblings('tr').removeClass('ui-selected');
			$(this).addClass('ui-selected');
				delegate.clickedRow(self, delegate.dataSource(self).findById($(this).data('id')));
		}).dblclick(function (e) {
			e.stopPropagation();
			$(this).siblings('tr').removeClass('ui-selected');
			$(this).addClass('ui-selected');
				delegate.doubleClickedRow(self, delegate.dataSource(self).findById($(this).data('id')));
		});
		
		rows.draggable({
			cursor: 'move',
			contaiment: 'body',
			revert: true,
			helper: function(event) {
				var element = delegate.dataSource(self).findById($(event.currentTarget).data('id'));
				var obj = $('<div class="ui-table-drag-helper"></div>');
				obj.text(delegate.hintForDraggedRow(self, element));
				obj.css('width', rows.width());
				return obj;
			}
		});
	},
	
	_buildTableColumns: function(){
		var self = this;
		var header = $(self.element).find(self.options.header_class).find('tr');
		var delegate = this.options.delegate || this.options;
		
		$.each(delegate.tableColumns(), function (index, column) {
			header.append(delegate.contentForHeaderColumn(self, column, index));
		});
	},
	
	reloadData: function(){
		var self = this;
		var content = $(this.element).find(this.options.content_class).find('table');
		var delegate = this.options.delegate || this.options;
		
		var dataSource = delegate.dataSource(self);
		
		content.empty();
		$.each(dataSource.toArray(), function (row_index, data) {
			var row = $('<tr></tr>');
			row.attr('id', dataSource.to_dom_id(data));
			row.data('id', data.id);
			
			if (self.options.useAlternatingRowBackground && row_index % 2 != 0) { row.addClass(self.options.alternatingRowBackgroundClass.replace('.', '')) };
			
			$.each(delegate.tableColumns(), function (column_index, column) { 
				row.append(delegate.contentForRowByColumn(self, data, column, column_index));
			});
			
			content.append(row);
		});
		
		this._setupSelectable();
	},
});

$.ui.tableView.defaults = {
	header_class: '.header',
	content_class: '.content',
	delegate: null,
	
	useAlternatingRowBackground: true,
	alternatingRowBackgroundClass: '.alt',
	
	dataSource: function (tableView) { return [] },
	contentForRowByColumn: function(tableView, row, column, column_index) { return $('<td>...</td>') },
	
	tableColumns: function (tableView) { return [] },
	contentForHeaderColumn: function(tableView, column, index){ return $('<th>'+column+'</th>') },
	
	clickedRow: function(tableView, row) {  },
	doubleClickedRow: function(tableView, row) {  },
	hintForDraggedRow: function(tableView, row) { return 'Object'; }
};
