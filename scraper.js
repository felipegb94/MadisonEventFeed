var request = require('request');
var cheerio = require('cheerio');
var csv = require('csv');
var jf = require('jsonfile')

var link = "http://www.today.wisc.edu/events/view/85958";
var counter = 0;
eventTemplate = {'name': '',
'date': '',
'time': '',
'webpage': '',
'description': '',
'orgName': '',
'orgType': '',
'orgWebsite': '',
'contactName': '',
'contactPhone': '',
'contactEmail': '',
'locationAddress': '',
'locationBuilding': '',
'locationRoom': 0 
};


module.exports = {
  today: function (url) {
  	console.log("Scraping: " + url);
    e = eventTemplate;
   		
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);

        // Get event title
        e['name'] = $('#content .span10 h1').text();
        
        $('#content .detail').each(function(detail){
          key = $(this).find('.span2').text();
          value = $(this).find('.span10').text();
          switch(key){
            case 'Date':
              e['date'] = value;
              break;
            case 'Time':
              e['time'] = value;            
              break;
            case 'Location':
              e['locationAddress'] = value;              
              break;
            case 'Description':
              e['description'] = value;
              break;
            case 'Website':
              e['webpage'] = value;
              break;
            case 'Contact':
              var parser = csv.parse({delimiter: ', '});
              output = [];
              parser.on('readable', function(){
                output = parser.read();
              });
              parser.write(value);
              parser.end();
              e['contactPhone'] = output[0];
              e['contactEmail'] = output[1];  

              break;                                     
            default:
                            //console.log('This Key: ' + key + ' is not needed');          
          }

        });

        var file = 'results/event' + counter + '.json';
        counter++;
        jf.writeFile(file, e, function(err) {
        console.log(err)
        });
        return e;

        // TODO: scraping goes here!
    });
  },


  cs: function (link) {

  }
};

module.exports.today(link);

