var fs = require('fs');
var express = require('express');
var router = express.Router();

var linesFound = 0;
var wordToFind = '';
var words = [];
var last = 0;

function readLines1(fileName, func, whenDoneFunc) {
  fs.readFile(fileName, 'utf-8', (err, file) => {
  const lines = file.split('\n')
  last = 0;

  for (let line of lines) {
	last++;  
    func(line, last)
  }
 whenDoneFunc(wordToFind);
});
}


//line read function
function lineReadFunc(data, last) {
	var lines = data.split(/\s/g);
	for(let i=0; i< lines.length; i++) {
		let wordOne = lines[i].toLowerCase();
		if(wordToFind == wordOne) {
			words.push({line: last, data: data});
			linesFound++;
		}
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', word: '', words: [], searched: false });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  let word = req.body.word;
  wordToFind = word.toLowerCase();
  words = [];
  
  linesFound = 0;
  readLines1('words.txt', lineReadFunc, function(word) {
  console.log('words', words);
  
  res.render('index', { title: 'Express', word: word, words: words, searched: true });
  });
});

module.exports = router;
