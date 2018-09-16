const http = require('http');
var formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;

var fs = require('fs');

/// WATSON

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'w2a9G2_rrKarSVpuk-oYFSPPmIEAsdcqgXrJaaXKOn8p'
});

// SERVER AND FORM

const server = http.createServer((req, res) => {

  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '/users/amouratoglou/coding/visualr/' + files.filetoupload.name;
     
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        // pude imprimir aca la URL usando la variable newpath
        // pero no logro sacar esta variable afuera para pasarla a la
        // linea de codigo 53
        res.write('newpath');
        res.end();
      });


 });

  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
  });



  // var images_file = fs.createReadStream(myFilePathTest);
 var images_file = fs.createReadStream('./alacran_venenoso.jpg');

// var classifier_ids = ["alacran_venenoso"];

var params = {
  images_file: images_file,
};

visualRecognition.classify(params, function(err, response) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2))
});


// ENDS

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



