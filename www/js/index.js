// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

 // Cordova is ready
function onDeviceReady() {
//For Android & iOS (only): put the database file in the www directory and open the database like:
 var db = window.sqlitePlugin.openDatabase({name: "testdb.db"});
 // alert("connecting"); 
  function dainsert(){
  db.transaction(function(tx) {
   // tx.executeSql('DROP TABLE IF EXISTS test_table');
   tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

     tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
      alert("inserting"); 
      db.transaction(function(tx) {
        tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
          alert("record"+res.rows.item(0).cnt);       
         });
      });

     }, function(e) {
      alert(e.message);
    });
  });

}
}
function daread() {
  db.transaction(function(tx) {
        tx.executeSql("select * from test_table;", [], function(tx, res) {
          var len = res.rows.length;
for (var i = 0; i < len; i++) {
alert(res.rows.item(i).data);
alert(res.rows.item(i).data_num);
}
}, function(e) {
console.log("some error getting");
});

         });
}
