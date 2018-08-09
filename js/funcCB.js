function combineDB(arrayBuffer) {
	var max=db.prepare("SELECT max(id) FROM 'item' GROUP BY id");
	var s_count;
	while (max.step()) {
			s_count = max.get();
	}
	var dba = new SQL.Database(new Uint8Array(arrayBuffer));
	var tables = dba.prepare("SELECT * FROM sqlite_master WHERE type='table' ORDER BY name");
	/////////
	while (tables.step()) {
		var rowObj = tables.getAsObject();
		var name = rowObj.name;
		var query1="select * from '"+name+"'";
		var sel;
		try {
			sel = dba.prepare(query1);
		    } 
		catch (ex) {
			showError(ex);
		    }

		while (sel.step()) {
			var s = sel.get();
		
			var query2 = "INSERT INTO "+name+" values("+(s_count++)+",";
		
			for (var i = 1; i < s.length; i++) {
					  query2+="'"+s[i]+"',";
			}
			query2=query2.replace(/.$/,")")
			try {
				var k=db.run(query2);
			} 
			catch (ex) {
				showError(ex);
			}
		}
    }
}
