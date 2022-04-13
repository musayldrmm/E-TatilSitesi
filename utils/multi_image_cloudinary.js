const cloudinary = require("cloudinary");
const _ = require('underscore');

const Q = require("q");

function upload(file) {
    cloudinary.config({ 
        cloud_name: 'sunsetistaken', 
        api_key: '854975592478139', 
        api_secret: 'Gsy4affOf53N94POeqHs39IlVf0',
      });

    return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file,(err, res) => {
            if (err) {
                console.log('cloudinary err:', err);
                reject(err);
            } else {
                console.log('cloudinary res:', res);
                return resolve(res.url);
            }
        });
    });
};


module.exports.upload = upload;