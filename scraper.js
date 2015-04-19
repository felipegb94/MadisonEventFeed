var request = require('request');
var cheerio = require('cheerio');
var csv = require('csv');

var link = "http://www.today.wisc.edu/events/view/85958";

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
   		
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);

        // Get event title
        eventTemplate['name'] = $('#content .span10 h1').text();
        
        $('#content .detail').each(function(detail){
          key = $(this).find('.span2').text();
          value = $(this).find('.span10').text();
          switch(key){
            case 'Date':
              eventTemplate['date'] = value;
              break;
            case 'Time':
              eventTemplate['time'] = value;            
              break;
            case 'Location':
              eventTemplate['locationAddress'] = value;              
              break;
            case 'Description':
              eventTemplate['description'] = value;
              break;
            case 'Website':
              eventTemplate['webpage'] = value;
              break;
            case 'Contact':
              eventTemplate['contactPhone'] = value;             
              break;                                     
            default:
              console.log('This Key: ' + key + ' is not needed');          
          }
        });
        console.log(eventTemplate);

        // TODO: scraping goes here!
    });
  },


  cs: function (link) {

  }
};

module.exports.today(link);

