var DataSource = Class.create({
	
	inflector: ['object', 'objects'],
	
	remote_url: null,
	
	data: [],
	filter: null,
	
	delegate: null,
	
	init: function(options){
		$.extend(this, options);
		this.fetch();
	},
	
	size: function(){ return data.length || 0; },
	
	humanize: function(count){
		return (count > 1 || count == 0) ? this.inflector[1] : this.inflector[0];
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
		var id = parseInt(id);
		
		for (var i=0; i < this.data.length; i++) {
			var e = this.data[i];
			if (e.id == id) { return e };
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
});