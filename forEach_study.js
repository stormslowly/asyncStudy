(function(){

  "use strict";


  var async = require("async");

  var tasks =[{name:"wsy",lazy:200},
          {name:"wxx",lazy:300},
          {name:"spf",lazy:100}];

  console.log("async.forEach === async.each  => ",async.forEach === async.each);
  // all goes right
  var start =  new Date();
  async.forEach(tasks,
    function(task,cb){
      console.log("1 do the task for ",task.name);
      setTimeout(function(){
        console.log("1 finish the taks for ", task.name);
        cb(null,task.name);
      }, task.lazy);
    },
    function(err,who){
      console.log("1 error is ",err,"from ",who);
      console.log("time comsuing ",new Date() - start );
    });
/*
do the task for  wsy
do the task for  wxx
do the task for  sfp
finish the taks for  sfp
finish the taks for  wsy
finish the taks for  wxx
error is  null from  undefined

*/

  // one error in task, async callback called once for error
  async.forEach(tasks,
  function(task,cb){
    console.log("2 do the task for ",task.name);
    setTimeout(function(){
      console.log("2 finish the taks for ", task.name);
      if(task.name === "spf"){
        cb("2 stupid happens",task.name);
      }
      else{
        cb(null,task.name);
      }
    }, task.lazy);

  },
  function(err,who){
    console.log("2 error is ",err,"from ",who);
  });

/*
do the task for  wsy
do the task for  wxx
do the task for  spf
finish the taks for  spf
error is  stupid happens from  undefined
finish the taks for  wsy
finish the taks for  wxx
*/

// more than 1 errors happen, callback called onece for the first error
// tasks continues  
  async.forEach(tasks,
  function(task,cb){
    console.log("3 do the task for ",task.name);
    setTimeout(function(){
      console.log("3 finish the taks for ", task.name);
      cb("3 stupid happens 4 "+task.name ,task.name);
    }, task.lazy);

  },
  function(err,who){
    console.log("3 error is ",err,"from ",who);
  });
/*
do the task for  wsy
do the task for  wxx
do the task for  spf
finish the taks for  spf
error is  stupid happens 4 spf from  undefined
finish the taks for  wsy
finish the taks for  wxx
*/

})();