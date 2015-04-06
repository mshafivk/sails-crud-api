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
              //  console.log(err);
               /* req.session.flash={err:err
                 };*/
                return next(err);
             //   return res.json({status:"ERROR",statusDescription:err});
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
                return next({status:"ERROR",statusDescription:err});
            res.json({employees:employees});
        });
    },
    find:function(req,res,next){
        Employee.findOne(req.param('id'),function userFound(err,employee){
        if(err)return next({status:"ERROR","statusDescription":err});
        if(!employee)
            // return res.status(404).send({status:404, message: 'Employee Not Found', type:'internal'});
            return next({status:"ERROR",statusDescription:'Employee Not Found'});
        return res.json({employee:employee});
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
              return next({status:"ERROR","statusDescription":err});
        if(!employee)
             return next({status:"ERROR","statusDescription":"404:Employee Not Found"});
            Employee.destroy(req.param('id'),function userDestroyed(err){
            if(err)
                  return next({status:"ERROR","statusDescription":"404:Employee Not Found"});
            });
         return next({status:"OK","statusDescription":"Employee Deleted Successfully"});
    });
    }

};

