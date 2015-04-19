var FeedParser = require('feedparser');
var request = require('request');
var scraper = require('./scraper');
 
var req = request('http://today.wisc.edu/events.rss2');
var feedparser = new FeedParser();
req.on('error', function (error) {
  // handle any request errors 
});
req.on('response', function (res) {
  var stream = this;
 
  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
 
  stream.pipe(feedparser);
});
 
 
feedparser.on('error', function(error) {
  // always handle errors 
});
feedparser.on('readable', function() {
  // This is where the action is! 
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance 
    , item;
 
  while (item = stream.read()) {
    scraper.today(item.link);
  }
});

/**
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello WORLD\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/