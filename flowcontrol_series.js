(function(){
  "use strict";

/*
  series execute functions one by one.
  if callback get error, stop the execution,
  in the  series callback , the result argument 
  contains the result from previous task, and 
  the last is undefined for task failed.
*/


  var async = require("async");

  var task1 = function(cb){
    console.log("task1 start");
    setTimeout(function(){
      console.log("task1 finished");
      cb(null,"task1 is really long func");
    }, 1000);
  };

  var task2 = function(cb){
    console.log("task2 start");
    setTimeout(function(){
      console.log("task2 finished");
      cb(null,"task2 is sweetie");
    }, 200);
  };

  var task3 = function(cb){
    console.log("task2 start");
    setTimeout(function(){
      console.log("task2 finished");
      cb(null,"i love sunshine ");
    }, 300);
  };

  var error_task = function(cb){
    console.log("error task start");
    setTimeout(function(){
      console.log("error task finished");
      cb("shit happens");
    }, 200);
  };

  
  var start_time = new Date();
  async.series([task1,task2,task3],function(err,data){

    console.log("the data is ", data);
    console.log("error is ", err);
    console.log("tasks takes ",new Date() - start_time," ms");
  });
  
  /*
    task1 start
    task1 finished
    task2 start
    task2 finished
    task2 start
    task2 finished
    the data is  [ 'task1 is really long func',
      'task2 is sweetie',
      'i love sunshine ' ]
    error is  null
    tasks takes  1473  ms
  */
  
/*
  JSON tasks style
*/

  start_time = new Date();
  async.series({'step1':task1,'step2':task2, 'step3':task3},function(err,data){

    console.log("the data is ", data);
    console.log("error is ", err);
    console.log("tasks takes ",new Date() - start_time," ms");
  });









  start_time = new Date();
  async.series([task1,task2,error_task],function(err,data){

    console.log("error is ",err);
    console.log("the data is ", data);
    console.log("tasks takes ",new Date() - start_time," ms");
  });

/*
  task1 start
  task1 finished
  task2 start
  task2 finished
  error task start
  error task finished
  error is  shit happens
  the data is  [ 'task1 is really long func', 'task2 is sweetie', undefined ]
  tasks takes  1472  ms

*/


  start_time = new Date();
  async.series([task1,error_task,task3],function(err,data){

    console.log("error is ",err);
    console.log("the data is ", data);
    console.log("tasks takes ",new Date() - start_time," ms");
  });

/*
  task1 start
  task1 finished
  error task start
  error task finished
  error is  shit happens
  the data is  [ 'task1 is really long func', undefined ]
  tasks takes  1259  ms
*/



})();