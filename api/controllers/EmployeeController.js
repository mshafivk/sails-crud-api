/**
 * EmployeesController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    new:function(req,res,next){
        res.view();
    },
     create:function(req,res,next){
        // console.log(req.params.all());
           var _newEmployee = {

            name: req.param("employee").name,
            age: req.param("employee").age,
            email: req.param("employee").email,
            basic: req.param("employee").basic,
            mobile: req.param("employee").mobile
        };
        Employee.create(_newEmployee,function userCreated(err,_employee){

            if(err)
            {
                console.log(err);
               /* req.session.flash={err:err
                 };*/
                return res.json({status:"ERROR",statusDescription:err});
            }
            return res.json({status:"OK",employee:_employee});

        });
    },
    update:function(req,res,next){
        var _updateEmployee = {
            name: req.param("employee").name,
            age: req.param("employee").age,
            email: req.param("employee").email,
            basic: req.param("employee").basic,
            mobile: req.param("employee").mobile
        };
        Employee.update(req.param('id'),_updateEmployee,function employeeUpdated(err,_employee){
            if(err)
            {
            return res.json({status:"ERROR",statusDescription:err});
            }
            return res.json({status:"OK",employee:_employee});
        });
    },
    findAll:function(req,res,next){
        Employee.find(function(err,employees){
            if(err)
                return res.json({status:"ERROR",statusDescription:err});
            res.json({status:"OK",employees:employees});
        });
    },
    find:function(req,res){
        Employee.findOne(req.param('id'),function userFound(err,employee){
        if(err)return res.json({status:"ERROR","statusDescription":err});
        if(!employee)
            return res.json({status:"ERROR","statusDescription":"404:Employee Not Found"});
        res.json({status:"OK",employee:employee});
        });
    },
    index:function(req,res,next){

    Employee.find(function(err,employees){
            if(err)return next(err);
            res.view({employees:employees});
    });
    },
    delete:function(req,res,next){
        Employee.findOne(req.param('id'),function userFound(err,employee){
        if(err)
              return res.json({status:"ERROR","statusDescription":err});
        if(!employee)
             return res.json({status:"ERROR","statusDescription":"404:Employee Not Found"});
            Employee.destroy(req.param('id'),function userDestroyed(err){
            if(err)
                  return res.json({status:"ERROR","statusDescription":"404:Employee Not Found"});
            });
         res.json({status:"OK","statusDescription":"Employee Deleted Successfully"});
    });
    }

};

