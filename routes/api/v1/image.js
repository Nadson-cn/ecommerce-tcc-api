const ImageKit = require("imagekit");
const fs = require('fs');

var imagekit = new ImageKit({
    publicKey : "public_HI0s8UrpLR2cgpIfztxRsJ1dE9U=",
    privateKey : "private_KTr9A2hKsG******************",
    urlEndpoint : "https://ik.imagekit.io/casemaker"
});

fs.readFile('image.jpg', function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    imagekit.upload({
      file : data, //required
      fileName : "my_file_name.jpg", //required
      tags: ["tag1", "tag2"]
    }, function(error, result) {
      if(error) console.log(error);
      else console.log(result);
    });
  });