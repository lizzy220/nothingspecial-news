var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback)
        db.close();
    }
    mongo.connect(insertUser);
}

function getdb(collection, record, callback){
    var getUser = function(err, db){
        db.collection(collection).findOne(record, function(err, result){
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
            db.close();
        });
    }
    return mongo.connect(getUser);
}

function updatedb(collection, criteria, update, callback){
  var user = function(err, db){
    db.collection(collection).update(criteria, update, callback);
    db.close();
  }
  mongo.connect(user);
}


function getdbAll(collection, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find({}, { title: 1}).toArray(function(err, result){
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

//only return array of {_id:, title:}
function getdbBySearchKey(collection, searchKey, callback) {
    var getResults = function(err, db) {
        db.collection('Article').find({"title": {$regex: ".*" + searchKey + ".*"}}, { title: 1}).toArray(function(err, result){
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
        db.collection(collection).findOne(ObjectId(id), function(err, result){
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

router.post('/articles/usercollection', function(req, res){
    console.log(req.body.username)
  getdb('users', {'username': req.body.username}, function(user) {
      res.json({'posts': user.posts, 'saved': user.saved});
  });
})

router.post('/articles/save', function(req, res){
  var data = req.body.article;
  var username = req.body.username;
    updatedb('users', {'username': username}, {$push: {'saved': data}}, function(err, user) {
      if (!err) {
        res.json(user);
      } else {
        res.status(400);
      }
  })
})

router.post('/articles/delete', function(req, res){
    var data = req.body.article;
    var username = req.body.username;
    updatedb('users', {'username': username}, {$pull: {'posts': data, 'saved': data}}, function(err, user) {
      if (!err) {
        res.json({'success': 'true'});
      } else {
        res.status(400);
      }
    });
})


router.post("/articles/new", function(req, res) {
    var username = req.body.username;
    var article = req.body.article;
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
                if (!err) {
                    console.log("Article inserted");
                    var data = {"_id": record.ops[0]._id, "title": record.ops[0].title};
                    updatedb('users', {'username': username}, {$push: {"posts": {"_id": record.ops[0]._id.toString(), "title": record.ops[0].title}}}, function(err, user) {
                        if (!err) {
                          res.json(data);
                        } else {
                          res.status(400);
                        }
                    });
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

function validateInput(data){
  let errors = {};
  if(Validator.isEmpty(data.username)){
    errors.username = 'This field is required';
  }
  if(Validator.isEmpty(data.password)){
    errors.password  = 'This field is required';
  }
  return{
    errors,
    isValid: isEmpty(errors)
  }
}

router.post("/users", function(req, res){
  console.log(req.body);
  const { errors, isValid } = validateInput(req.body);
  var query = { username: req.body.username };
  if(isValid){
    getdb('users', query, function(userInfo){
      if(userInfo){
        errors.username = 'Username already exist!';
        res.status(400).json(errors);
      }else{
        res.json({success: true});
        encrypt_password = bcrypt.hashSync(req.body.password, 10);
        var data = {
          username: req.body.username,
          password: encrypt_password,
          saved: [],
          posts: []
        }
        insertdb('users', data, function(err, record) {
          // console.log(err)
          if (!err) {
              console.log("User inserted");
          } else {
              res.status(400);
          }
        });
      }
    });
  }else{
    res.status(400).json(errors);
  }
})

router.post("/auth", function(req, res){
  var data = { username: req.body.username };
  console.log(data);
  getdb('users', data, function(userInfo){
    if(userInfo){
      if(bcrypt.compareSync(req.body.password, userInfo.password)){
        const token = jwt.sign({
          username: userInfo.username
        }, 'nothingspecial');
        res.json({ token });
      }else{
        res.status(401).json({errors: { form: 'Invalid Username or Password' } });
      }
    }else{
      res.status(401).json({errors: { form: 'Invalid Username or Password' } });
    }
  });
})
module.exports = router;
