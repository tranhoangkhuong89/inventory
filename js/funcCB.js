function combineDB(arrayBuffer) {
	var max=db.prepare("SELECT max(id) FROM 'item' GROUP BY id");
	var s_count;
	var count;
	while (max.step()) {
			s_count = max.get();
	}
	var dba = new SQL.Database(new Uint8Array(arrayBuffer));
	var tables = dba.prepare("SELECT * FROM sqlite_master WHERE type='table' ORDER BY name");
	/////////
	while (tables.step()) {
		var rowObj = tables.getAsObject();
		var name = rowObj.name;
		if(name!='sqlite_sequence'){
			var query1="select * from '"+name+"'";
		var sel;
		try {
			sel = dba.prepare(query1);
		    } 
		catch (ex) {
			showError(ex);
		    }

		while (sel.step()) {
			if(name=="Order"){
			   var s = sel.get();
		
			var query2 = "INSERT INTO "+name+" values(";
		
			for (var i = 0; i < s.length; i++) {
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
			   else{
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
		
    }
	count=db.prepare("select * from 'Item'");
	var r_count;
	var m=0;
	while (count.step()) {
			r_count = count.get();
		m++;
	}

count2=db.prepare("select * from 'Order'");
	var r_count2;
	var m2=0;
	while (count2.step()) {
			r_count2 = count.get();
		m2++;
	}
}
