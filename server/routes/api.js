var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback)
        db.close();
    }
    mongo.connect(insertUser);
}

function getdbAll(collection, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find().toArray(function(err, result){
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

function getdbBySearchKey(collection, searchKey, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find({"title": {$regex: ".*" + searchKey + ".*"}}).toArray(function(err, result){
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log(result);
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


function getdbById(collection, id, callback) {
    var getResults = function(err, db) {
        db.collection('Article').findOne(ObjectId(id), function(err, result){
            if (err) {
                console.log(err);
            } else {
                callback(result)
            }
            //Close connection
            db.close();
        });
    }
    return mongo.connect(getResults);
}

router.get('/articles/search/:searchKey', function(req, res) {
    getdbBySearchKey('Article', req.params.searchKey, function(articles) {
        res.json(articles)
    })
});

router.get('/articles/search', function(req, res) {
    getdbAll('Article', function(articles) {
        res.json(articles)
    })
});

router.get('/articles/article/:id', function(req, res) {
    getdbById('Article', req.params.id, function(article) {
        res.json(article);
    })
});


router.post("/articles/new", function(req, res) {
    var article = req.body;
    article['timestamp'] = Date.now();
    article['visable'] = true;
    article['tags'] = [];
    article['comments'] = [];
    return get_article_content(article, function(filledArticle) {
        // console.log(article)
        if (filledArticle['content']['url'] == '') {
            res.status(400);
        } else {
            delete filledArticle['content']['additionalData']
            delete filledArticle['content']['entities']
            insertdb('Article', filledArticle, function(err, record) {
                console.log(err)
                if (!err) {
                    console.log("Article inserted");
                    res.json({"_id": record.ops[0]._id, "title": record.ops[0].title});
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
