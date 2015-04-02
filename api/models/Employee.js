/**
* Employees.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema:true,
  attributes: {
      /*id:{type:'string',
          unique:'true'
      },*/
      name:{type:'string',
      required:true
      },
      email:{type:'string',
      required:true,
      unique:true
      },
      age:'integer',
      basic:'string',
      mobile:'string',
      //CONVERT TO DESIRED JSON FORMAT
    toJSON:function(){
    var obj=this.toObject();
        delete obj._csrf;
        return obj;
    }
  },
};

