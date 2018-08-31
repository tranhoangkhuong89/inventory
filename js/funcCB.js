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
		if(name!='sqlite_sequence'&&name!='TableO'){
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

			var query2 = "INSERT INTO '"+name+"' (idkey,[table],price,starttime,endtime,checkout) values(";

			for (var i = 0; i < s.length; i++) {
				if(i==3 || i==4)
					{
						if(s[i]!=null){
							var s1=s[i].split(' ')[0];
							var s2=s[i].split(' ')[1];
							var s11=s1.split('/')[0];
							var s12=s1.split('/')[2];

							s1=s12+"-"+s1.split('/')[1]+"-"+s11;
							var ss=s1+" "+s2;
							query2+="'"+ss+"',";
						}
						else {
							query2+="'"+s[i]+"',";
						}
					}
				else
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

			var query2 = "INSERT INTO "+name+" (name,price,sl,idorder) values(";//+(s_count++)+","

			for (var i = 1; i < s.length; i++) {
					  query2+="'"+s[i]+"',";
			}
			query2=query2.replace(/.$/,")")
			try {
				var k=db.run(query2);//"insert into item values(100,'bo bbq',60000,1,'abcxyz')"
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
