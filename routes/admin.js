var Admin = require('../models/admin');

module.exports = function (app) {

    // Create admin account
    app.post('/api/admin', function (req, res) {
       var entry = new Admin(req.body);
       entry.save(function(err){
            if(err){
                res.json({info: 'Error while creating admin account', error: err});
            }else{
                res.json({info: 'Successfully created admin account'})
            }
       });
    });

    // Login or Check credentials
    app.post('/api/admin/login', function (req, res) {
        Admin.findOne({
            username: req.body.username,
            password: req.body.password
        },function (err, admin) {
            if(err){ res.json({info: "Error during trying to log in", error: err}) }
            if(admin){
                console.log(admin);
                res.json({info: "Credentials correct", admin: admin});
            }else{
                res.json({info: "Incorrect credentials"});
            }
        });
    });

    // Update id_code
    app.post('/api/admin/idcode', function (req, res) {
        Admin.findOneAndUpdate({
            username: req.body.username,
            password: req.body.password
        },
        {
            id_code: req.body.id_code
        },
        {
            new: true
        }, function (err, admin) {
        if(err){ res.json({info: "Error while trying to update id_code", error: err});}
        if(admin){
            res.json({info: "Update successful", admin: admin});
        }else{
            res.json({info: "Incorrect credentials"});
        }
        });
    });


};