console.log("inside of restaurants.js");

const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

class Restaurants {
    getAll(req, res){
        Restaurant.find({}).sort({"avgreview" : -1}).exec( function(err, restaurants){
            if(err){
                res.json({"status": "not ok", "errors": err});
            }else{
                res.json({"status": "ok", "restaurants": restaurants});
            }
        });
    }

    getId(req, res){
        Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
          if(err){
              res.json({"status": "not ok", "errors": err});
          }
          else{
              res.json({"status": "ok", "restaurant": restaurant});
          }
        });
    }

    create(req, res){
        Restaurant.find({name: req.body.name}, function(err, restaurants){
            if (err) {
                res.json({"status": "not ok", "errors": err});
            } else if(restaurants.length > 0){
                res.json(
                    {"status": "not ok", 
                        "errors": {
                            "errors": {
                                "name": { 
                                    "message": "Pick something else"
                                }
                            }
                        }
                    });
            } else {
                let restaurant = new Restaurant(req.body);
                restaurant.save(function(err){
                    if(err){
                        res.json({"status": "not ok", "errors": err});
                    }else{
                        res.json({"status": "ok", "id": restaurant._id});
                    }
                });
            }
        })
    }

    update(req, res){
      Restaurant.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true}, function(err){
        if(err){
            res.json({"status": "not ok", "errors": err});
        }else{
            res.json({"status": "ok"});
        }
      });
    }

    delete(req, res){
      Restaurant.remove({_id: req.params.id}, function(err){
        if(err){
            res.json({"status": "not ok", "errors": err});
        }else{
            res.json({"status": "ok"});
        }
      });
    }
}

module.exports = new Restaurants();
