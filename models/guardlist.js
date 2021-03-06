var db = require('./db');
var mongodb = new db();

function Guardlist(username, selfname,trace_rule_id,time,projectID,_id) { //post means refinements list
	this.user = username;
	this.selfname = selfname;
	this.trace_rule_id=trace_rule_id;
	if (time) {
		this.time = time;
	} else {
		this.time = new Date();
	}
	this.projectID=projectID;
	this._id=_id;
};
module.exports = Guardlist;

Guardlist.prototype.save = function save(callback) {
	// 存入 Mongodb 的文檔
	var guardlist = {
		user: this.user,
		selfname:this.selfname,
		trace_rule_id:this.trace_rule_id,
		time: this.time,
		projectID: this.projectID,
	};

	mongodb.getCollection('guardlist',function(collection){
			collection.ensureIndex('user');
			
			collection.insert(guardlist, {safe: true}, function(err, guardlist) {
				//mongodb.close();
				callback(err, guardlist);
			});
		});
};

Guardlist.addNewGuardList = function addNewGuardList(username,selfname,trace_rule_id,projectID,callback) {
	// 存入 Mongodb 的文檔
// 存入 Mongodb 的文檔
	console.log("addNewGuarList########");
	var newGuardList = {
				user: username,
				selfname:selfname,
				trace_rule_id:trace_rule_id,
				projectID:projectID
			};
	mongodb.getCollection('guardlist',function(collection){
			
			collection.ensureIndex('user');
			collection.insert(newGuardList, {safe: true},function(err){
					if(err) console.warn(err.message);
					else console.log("insert new guardlist success");
				});

					var query = {};
			if (username) {
				
				query={"user":username,"projectID":projectID};
			}
			collection.ensureIndex('user');

			collection.find(query).sort({_id: 1}).toArray(function(err, docs) {
				//mongodb.close();

				if (err) {
					callback(err, null);
				}

				var guardlists = [];
				
				docs.forEach(function(doc, index) {
					var guardlist = new Guardlist(doc.user, doc.selfname,doc.trace_rule_id,doc.time,doc.projectID,doc._id);
					guardlists.push(guardlist);
				});

				callback(null, guardlists);
			});

		  });
};

Guardlist.get = function get(user, projectID,callback) {
	console.log(user+"#");
	mongodb.getCollection('guardlist',function(collection){

			//查找user属性为username的文档，如果username为null则匹配全部

			var query = {};
			if (user) {
				
				query={"user":user,"projectID":projectID};
			}

			collection.find(query).sort({_id: 1}).toArray(function(err, docs) {
				//mongodb.close();

				if (err) {
					callback(err, null);
				}

				var guardlists = [];
				
				docs.forEach(function(doc, index) {
					var guardlist = new Guardlist(doc.user, doc.selfname,doc.trace_rule_id,doc.time,doc.projectID,doc._id);
					guardlists.push(guardlist);
				});

				callback(null, guardlists);
			});
		});
};


Guardlist.del = function del(username, guard,callback) {
	console.log(username+" "+guard);
	mongodb.getCollection('guardlist',function(collection){
			
			//查找user属性为username的文档，如果username为null则匹配全部
			
			//console.log(ids);

			var query_del = {"user":username,"guard":guard};
			console.log(query_del);
			collection.remove(query_del);

			var query = {};
			if (username) {
				query.user = username;
			}

			collection.find(query).sort({_id: 1}).toArray(function(err, docs) {
				//mongodb.close();

				if (err) {
					callback(err, null);
				}

				var guardlists = [];
				
				docs.forEach(function(doc, index) {
					var guardlist = new Tracelist(doc.user, doc.user,doc.selfname,doc.trace_rule_id,doc.time,doc._id);
					guardlists.push(guardlist);
				});

				callback(null, guardlists);
			});
		});
};


Guardlist.updateSelfname = function updateSelfname(user,id,selfname, callback) {
	console.log("updateSelfname:"+user+" id:"+id+" selfname:"+selfname);
	mongodb.getCollection('guardlist',function(collection){

			//查找user属性为username的文档，如果username为null则匹配全部
			

			var query1={};
			var query2={};
			var ObjectID = require("mongodb").ObjectID;
			query1={"user":user,"trace_rule_id":ObjectID(id)};
			query2={$set:{"selfname":selfname}};

			collection.update(query1,query2,{safe:true},function(err){
				var query = {};
				if (user) {
				
					query={"user":user};
				}
				collection.find(query).sort({_id: 1}).toArray(function(err, docs) {
				//mongodb.close();

				if (err) {
					callback(err, null);
				}

				var guardlists = [];
				
				docs.forEach(function(doc, index) {
					var guardlist = new Guardlist(doc.user, doc.selfname,doc.trace_rule_id,doc.time,doc._id);
					guardlists.push(guardlist);
				});

				callback(null, guardlists);
				});
			});

			

			
		});
};

Guardlist.removeTraceRule = function removeTraceRule(user,deleteID, callback) {
	
	mongodb.getCollection('guardlist',function(collection){

			//查找user属性为username的文档，如果username为null则匹配全部
			

			var query1={};
			var query2={};
			var ObjectID = require("mongodb").ObjectID;
			query1={"user":user,"trace_rule_id":ObjectID(deleteID)};
			

			collection.remove(query1,function(err){
								if(err) {console.warn(err.message);
												//mongodb.close();
											}
								else {
										console.log("delete element success");
										var query = {};
										if (user) {
				
											query={"user":user};
										}
										collection.find(query).sort({_id: 1}).toArray(function(err, docs) {
											//mongodb.close();

											if (err) {
												callback(err, null);
											}

											var guardlists = [];
				
											docs.forEach(function(doc, index) {
												var guardlist = new Guardlist(doc.user, doc.selfname,doc.trace_rule_id,doc.time,doc._id);
												guardlists.push(guardlist);
											});

											callback(null, guardlists);
										});
									}
								});
			
		});
};