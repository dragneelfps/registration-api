var Admin = require('../models/admin');
var uuid = require('uuid/v4');

module.exports = function (app) {

    // Create admin account
    app.post('/api/admin', function (req, res) {
       var entry = new Admin(req.body);
       entry.id_code = uuid();
       entry.save(function(err){
            if(err){
                res.status(400).json({info: 'Error while creating admin account', error: err});
            }else{
                res.status(201).json({info: 'Successfully created admin account'})
            }
       });
    });

    // Login or Check credentials
    app.post('/api/admin/login', function (req, res) {
        Admin.findOne({
            username: req.body.username,
            password: req.body.password
        },function (err, admin) {
            if(err){ res.status(400).json({info: "Error during trying to log in", error: err}) }
            if(admin){
                res.status(200).json({info: "Credentials correct", admin: admin});
            }else{
                res.status(401).json({info: "Incorrect credentials"});
            }
        });
    });

    // Get admin id
    app.get('/api/admin/id', function (req, res) {
        if(req.query.id_code === undefined || req.query.id_code === '' ){
            res.status(400).json({error: 'No id_code specified'});
        }
        else{
            console.log(req.query.id_code);
            Admin.findOne({id_code: req.query.id_code}, function (err, admin) {
                if(err){
                    res.status(400).json({error: err});
                }
                if(admin){
                    res.status(200).json({admin_id: admin._id});
                }else{
                    res.status(404).json({info: 'not found'});
                }
            });
        }

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
        if(err){ res.status(400).json({info: "Error while trying to update id_code", error: err});}
        if(admin){
            res.status(200).json({info: "Update successful", admin: admin});
        }else{
            res.status(404).json({info: "Incorrect credentials"});
        }
        });
    });




};