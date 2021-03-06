var Client = require('../models/client');

module.exports = function (app) {

    // Create client account
    app.post('/api/client', function (req, res) {
        var entry = new Client(req.body);
        entry.save(function(err){
            if(err){
                res.status(400).json({info: 'Error while creating client account', errors: err.errors});
            }else{
                res.status(201).json({info: 'Successfully created client account'})
            }
        });
    });

    // Get all clients for admin_id param
    app.get('/api/client', function (req, res) {
        if(req.query.admin_id === undefined || req.query.admin_id === '' ){
            res.status(400).json({error: 'No id_code specified'});
        }
        Client.find({admin: req.query.admin_id}).exec(function (err, clients) {
            if(err){ res.status(400).json({error: err});}
            if(clients){
                res.status(200).json({clients: clients})
            }else{
                res.status(404).json({info: 'Not found'});
            }
        })
    });

    // Login or Check credentials
    app.post('/api/client/login', function (req, res) {
        Client.findOne({
            username: req.body.username,
            password: req.body.password
        }, '-password -_id -__v'
        ,function (err, client) {
            if(err){ res.status(400).json({info: "Error during trying to log in", error: err}) }
            if(client){
                console.log(client);
                res.status(200).json({info: "Credentials correct", client: client});
            }else{
                res.status(401).json({info: "Incorrect credentials"});
            }
        });
    });



    // Update id_code
    app.post('/api/client/idcode', function (req, res) {
        Client.findOneAndUpdate({
                username: req.body.username,
                password: req.body.password
            },
            {
                id_code: req.body.id_code,
                admin: req.body.admin_id
            },
            {
                new: true
            }, function (err, client) {
                if(err){ res.status(400).json({info: "Error while trying to update id_code", error: err});}
                if(client){
                    client.linked = true;
                    client.save(function(err) {
                        if (err)
                            res.status(400).json({info: 'Error while setting linked to true', error: err});
                    });
                    res.status(200).json({info: "Update successful", client: client});
                }else{
                    res.status(404).json({info: "Incorrect credentials"});
                }
            });
    });


};