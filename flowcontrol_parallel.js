(function(){
  "use strict";


  var async = require("async");

  var tasks = require("./common_tasks");
  var start_time;

/*
  parallel's error handle is similar as series, when error happens,
  stops. the result of the task which encounters error is undefine;
*/

  start_time = new Date();
  async.parallel([tasks.task1,tasks.task2,tasks.task3], function(err,results){
    console.log("error is ",err);
    console.log("results ", results);
    console.log("it takes ", new Date()-start_time ,"ms");
  });

/*
  task1 start
  task2 start
  task3 start
  task2 finished
  task3 finished
  task1 finished
  error is  null
  results  [ 'task1 is really long func',
    'task2 is sweetie',
    'i love sunshine ' ]
  it takes  1046 ms
*/

  start_time = new Date();
  async.parallel({task1:tasks.task1,task2:tasks.task2,task3:tasks.task3}, function(err,results){
    console.log("error is ",err);
    console.log("results ", results);
    console.log("it takes ", new Date() - start_time ,"ms");
  });

/*
  task1 start
  task2 start
  task3 start
  task2 finished
  task3 finished
  task1 finished
  error is  null
  results  { task2: 'task2 is sweetie',
    task3: 'i love sunshine ',
    task1: 'task1 is really long func' }
  it takes  1049 ms

*/

  start_time = new Date();
  async.parallel({task1:tasks.task1,task2:tasks.error_task,task3:tasks.task3}, function(err,results){
    console.log("error is ",err);
    console.log("results ", results);
    console.log("it takes ", new Date() - start_time ,"ms");
  });

/*
  task1 start
  error task start
  task3 start
  task3 finished
  error task finished error data
  error is  shit happens
  results  { task3: 'i love sunshine ', task2: undefined }
  it takes  577 ms
  task1 finished
*/


  start_time = new Date();
  async.parallelLimit([tasks.task1,tasks.task2,tasks.task1,tasks.task2,tasks.task1,tasks.task2,],
    2, function(err,results){
    console.log("error is ",err);
    console.log("results ", results);
    console.log("it takes ", new Date() - start_time ,"ms");
  });

/*

  task1 start
  task2 start
  task2 finished
  task1 start
  task1 finished
  task2 start
  task1 finished
  task1 start
  task2 finished
  task2 start
  task2 finished
  task1 finished
  error is  undefined
  results  [ 'task1 is really long func',
    'task2 is sweetie',
    'task1 is really long func',
    'task2 is sweetie',
    'task1 is really long func',
    'task2 is sweetie' ]
  it takes  2268 ms

*/

})();