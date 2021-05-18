var express = require('express');
var router = express.Router();
const Photo = require('../models/Photos');
var _ = require('lodash');

router.post('/',(req,res)=>{
    let {userId, favouritePhotos} = req.body;
    const photo = new Photo({
        userId: userId,
        favouritePhotos: favouritePhotos
    });
    Photo.findOneAndUpdate({ userId }, req.body, {upsert: true}, (err,doc)=>{
        if (err) return res.send(500, {error: err});
        return res.send(doc);
    });
});

module.exports = router;
