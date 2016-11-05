var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback)
        db.close();
    }
    return mongo.connect(insertUser);
}

function getdball(collection, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find().toArray(function(err, result){
            if (err) {
                console.log(err);
            } else if (result.length) {
                callback(result)
            } else {
                // console.log('No document(s) found with defined "find" criteria!');
                callback({})
            }
            //Close connection
            db.close();
        });
    }
    return mongo.connect(getResults);
}

function getdbbyid(collection, id, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find(id).toArray(function(err, result){
            if (err) {
                console.log(err);
            } else if (result.length) {
                callback(result)
            } else {
                // console.log('No document(s) found with defined "find" criteria!');
                callback([])
            }
            //Close connection
            db.close();
        });
    }
    return mongo.connect(getResults);
}


router.get('/articles/list', function(req, res) {
    getdball('Article', function(articles) {
        res.json(articles)
    })
});

router.get('/articles/article/:id', function(req, res) {
    getdbbyid('Article', req.params.id, function(articles) {
        res.json(articles[0])
    })
});

router.post("/articles/new", function(req, res) {
    var article = req.body;
    article['timestamp'] = Date.now();
    article['visable'] = true;
    article['tags'] = [];
    article['comments'] = [];
    get_article_content(article, function(filledArticle) {
        if (filledArticle['url'] == '') {
            res.status(400);
        } else {
            insertdb('Article', filledArticle, function(err, record) {
                if (!err) {
                    res.json({"_id": record.ops[0]._id});
                } else {
                    res.status(400);
                }
            });
        }
    })

});


function get_article_content(article, callback) {
    var https = require('https');
    return https.get({
        host: 'shutupandgivemethecontent.herokuapp.com',
        path: '/api/article?url=' + article['url']

    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            article['content'] = parsed['article']
            callback(article);
        });
    });
};

module.exports = router;

// router.post('/articles/save/:id', function(req, res) {
//
// });
// var movies = require('../data/movies.json')

// // allow easy lookup by id
// var moviesById = {}
// movies.movieList.map(function(movie) {
//   moviesById[movie.movieId] = movie
// })

/* GET example. */
// router.get('/example', function(req, res, next) {
//   var foo = {
//     message: 'hello from express!'
//   }
//   res.send(foo);
// });
//
// router.get('/movies', function(req, res, next) {
//   res.send(movies);
// });
//
// router.get('/movies/:id', function(req, res, next) {
//   var movie = moviesById[req.params.id]
//   if (movie) {
//     res.send(movie)
//   } else {
//     res.status(404).send('movie id %d not found', req.params.id);
//   }
//
// });


