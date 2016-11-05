var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
import * as bodyParser from "express/lib/response";

function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback);
        db.close();
    }
    mongo.connect(insertUser);
}

function getdb(collection, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find().toArray(function(err, result, callback){
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

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/articles/list', function(req, res) {
    getdb('Article', function(articles) {
        res.json(articles)
    })
});

router.get('/articles/article/:id', function(req, res) {

});

router.post('/articles/new', function(req, res) {
    var article = req.body.location
    article['timestamp'] = Date.now()
    article['visable'] = true
    article['tags'] = []
    article['comments'] = []
    get_article_content(article, function(article) {
        insertdb('Article', article, function(err, record) {
            if (err) {
                res.status(400)
            } else {
                res.json({'id': record._id})
            }
        })
    })

});



function get_article_content(article, callback) {
    var https = require('https');
    return https.get({
        host: 'https://shutupandgivemethecontent.herokuapp.com/api/article',
        path: '/email?url=' + article['url']
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


router.post('/articles/save/:id', function(req, res) {

});
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

module.exports = router;
