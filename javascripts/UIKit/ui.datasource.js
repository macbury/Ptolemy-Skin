function DataSource(options) {
	$.extend(this, {
		inflector: ['object', 'objects'],
		
		remote_url: null,
		
		data: [],
		filter: null,
		
		humanize: function(count){
			if (count > 1 || count == 0) {
				return this.inflector[1]
			} else {
				return this.inflector[0];
			}
		},
		
		to_dom_id: function(element){
			if (element.id == undefined) {
				element.id = new Date() - 1;
			}
			
			return this.inflector[0] + "_" + element.id;
		},
		
		fetch: function(){
			var self = this;
			$.getJSON(self.remote_url, function (data) { 
				self.data = data;
				self.onRefresh();
			});
		},
		
		find: function(query){
			this.filter = query;
			this.onRefresh();
		},
		
		findById: function(id){
			var out = $.grep(this.data, function (element, index) { return element.id == parseInt(id); });
			if (out.length == 1) {
				return out[0];
			} else {
				return out;
			}
		},
		
		toArray: function(){
			var self = this;
			
			if (self.filter == null) {
				return self.data;
			}else{
				return $.grep(self.data, function (element, index) {
					var valid = false;
					$.each(element, function (key, value) {
						valid = (value == self.filter);
					})
					return valid;
				});
			}
			
		},
		
		onRefresh: function(){}
		
	}, options);
	
	this.fetch();
	return this;
}