

module.exports ={
    
  task1:function(cb){
    "use strict";
    console.log("task1 start");
    setTimeout(function(){
      console.log("task1 finished");
      cb(null,"task1 is really long func");
    }, 1000);
  },

  task2 :function(cb){
    "use strict";
    console.log("task2 start");
    setTimeout(function(){
      console.log("task2 finished");
      cb(null,"task2 is sweetie");
    }, 200);
  },

  task3 : function(cb){
    "use strict";
    console.log("task3 start");
    setTimeout(function(){
      console.log("task3 finished");
      cb(null,"i love sunshine ");
    }, 300);
  },

  error_task : function(cb){
    "use strict";
    console.log("error task start");
    setTimeout(function(){
      console.log("error task finished","error data");
      cb("shit happens");
    }, 500);
  }
};