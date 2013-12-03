"use strict";

var async = require("async");

var tasks =[{name:"wsy",lazy:200},
        {name:"wxx",lazy:300},
        {name:"spf",lazy:100}];



async.forEach(tasks, 
  function(task,cb){
    console.log("do the task for ",task.name);
    setTimeout(function(){
      console.log("finish the taks for ", task.name);
        cb(null,task.name);
    }, task.lazy);

  },
  function(err,who){
    console.log("error is ",err,"from ",who);
  }
);        