(function(){
  "use strict";

  var async = require("async");

  /*
    waterfall like 击鼓传花，give the result to the next task
  */


  async.waterfall([
    function(cb){
      console.log("i have a dream");
      setTimeout(function(){
        cb(null,"i will give the dream to you");
      }, 500);
    },
    /*
    function(words,cb){
      console.log("i was wrong ");
      cb("brain sucked");
    },
    */
    function(words,cb){
      console.log("previous guy said: ",words);
      setTimeout(function(){
        console.log("let's continue");
        cb(null,"i love this game");
      }, 500);
    }

  ],
  function(err,words){
    console.log("error: ", err);
    console.log("last one said: ", words);
  });

})();