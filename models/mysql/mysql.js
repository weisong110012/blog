var util=require('util');
var mysql=require('mysql');
const HOST='localhost';
const USER='root';
const PASS='123456';
const prefix='';
const DATABASE='blog';
const PORT=3306
const db=mysql.createPool({
    host:HOST,
    user:USER,
    password:PASS,
    database:DATABASE,
    port:PORT
});
let query=function (sql) {
    return  new Promise((resolve,reject)=>{
        db.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }
            else{
                connection.query(sql,(err,data)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(data)
                    }
                    connection.release();
                })
            }
        })


    })
}

var findOne=async function (table,where){ //查找一条；
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }

        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string'){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT * FROM "+prefix+table+' '+_WHERE+' LIMIT 1';
    var data= await query(sql);
    return data;
}
var find=async function (table,where){ //查找一条；
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }

        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string'){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT * FROM "+prefix+table+' '+_WHERE+' ';
    var data= await query(sql);
    return data;
}
var select= async function(table){ //查找所有；
    var sql="SELECT * FROM "+prefix+table;
    var data= await query(sql);
    return data;
}
var insert =async function(table,obj){
    var fields='';
    var values='';
    for( var k in obj){
        fields+=k+',';
        values=values+"'"+obj[k]+"',"
    }
    fields=fields.slice(0,-1);
    values=values.slice(0,-1);
    var sql="INSERT INTO "+prefix+table+'('+fields+') VALUES('+values+')';
    var data= await query(sql);
    return data;
}
/**
 sets is object；
 where is object;
 */
var update=async function(table,sets,where){
    var _SETS='';
    var _WHERE='';
    var keys='';
    var values='';
    for(var k in sets){
        _SETS+=k+"='"+sets[k]+"',";
    }
    _SETS=_SETS.slice(0,-1);
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
    }
    _WHERE=_WHERE.slice(0,-4);
    var sql="UPDATE "+prefix+table+' SET '+_SETS+' WHERE '+_WHERE;

    var data= await query(sql);
    return data;
}
var del=async function(table,where){
    var _WHERE='';
    for(var k in where){
        _WHERE+=k+"='"+where[k]+"' AND ";
    }
    _WHERE=_WHERE.slice(0,-4);
    var sql="DELETE  FROM "+prefix+table+' WHERE '+_WHERE;
    var data= await query(sql);
    return data;
}

var innerSelect=async function (tables) {
    var _TABLES='';
    var _WHERE='';
    for(k in tables){
        _TABLES+=k+' , '
        _WHERE+=k+'.'+tables[k]+' = '
    }
    _WHERE=_WHERE.slice(0,-2);
    _TABLES=_TABLES.slice(0,-2);
    var sql="SELECT * FROM "+_TABLES+' WHERE '+_WHERE;
    var data= await query(sql);
    return data;
}

var fullSql=async function (sql) {
    var data= await query(sql);
    return data;
}

module.exports={
    db:db,
    insert:insert,
    select:select,
    findOne:findOne,
    find:find,
    del:del,
    update:update,
    innerSelect:innerSelect,
    fullSql:fullSql
};