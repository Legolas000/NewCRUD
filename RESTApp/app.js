var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    path = require('path'),
    engines = require('consolidate');

app.configure(function () {
    app.use(express.logger());

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    })

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname+'/public'));

    app.engine('html', engines.handlebars);

    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    app.set('PORT', process.env.PORT || 5000);

    app.set('MONGODB_URI', 'mongodb://ec2-18-188-143-33.us-east-2.compute.amazonaws.com:27017');

});

/**
 * MongoDB connection
 */
var db = mongoose.createConnection(app.get('MONGODB_URI'));

db.on('connected', function () {
    console.log('Connected to MongoDB.');

});

db.on('error', function (err) {
    console.error.bind(console, 'Connection to MongoDB error!.');
});

db.on('close', function () {
    console.log('Connection to MongoDB closed.');
});

// Schema
var CourseSchema = new mongoose.Schema({
        id: 'string',
        title: 'string',
        watchHref: 'string',
        authorId: 'string',
        length: 'string',
        category: 'string',
    }),

    Courses = db.model('course', CourseSchema);

// Routes
app.get("/", function (req, res) {
    res.render('index',{
        data: 'An API For courses ;)'
    });
});

app.get("/courses", function (req, res) {
    // Find All
    Courses.find(function (err, persons) {
        if (err) res.json({error: err})

        if(persons)
            res.json(persons);
    })
});

app.post("/courses", function(req, res){
    /**
     * Get data from post
     * @type {Courses}
     */
    var course = new Courses({
        id:  req.body.id,
        title:  req.body.title,
        watchHref:  req.body.watchHref,
        authorId:  req.body.authorId,
        length:  req.body.length,
        category:  req.body.category,
    });

    course.save(function (err, course) {
        if (err) {
            res.send({error:err});
        }else {
            console.log('Save data: ' + course);
            res.json(course);
        }
    })
});

app.get('/courses/:id', function(req, res){
    var param_id = req.params.id;

    Courses.find({id:param_id}, function(err, course){
        if(err) {
            res.json({
                data:"Error finding person."
            });
        }else {
            res.json(course[0]);
        }
    })
});

app.put('/courses/:id', function(req, res){
    var query = {id: req.params.id},
        data_update = {
            id:  req.body.id,
            title:  req.body.title,
            watchHref:  req.body.watchHref,
            authorId:  req.body.authorId,
            length:  req.body.length,
            category:  req.body.category,
        }

    Courses.update(query, data_update, {multi:false}, function(err, numberAffected, rawResponse ){
        if(err) {
            res.json({
                error:err
            })
        }else {
            res.json(data_update);
        }
    });

});

app.delete('/courses/:id', function(req, res){
    var param_id_del = req.params.id;

    Courses.remove({id:param_id_del}, function(err){
        if(err){ res.json({
            error:err
        })
        }else {
            res.json({message: "delete ok"});
        }
    });
});


app.listen(app.get('PORT'));
console.log("Server Port: " + app.get('PORT'));