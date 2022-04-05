const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'sunsetistaken', 
    api_key: '854975592478139', 
    api_secret: 'Gsy4affOf53N94POeqHs39IlVf0',
    secure: true
  });
  module.exports=cloudinary