template = {'name': '',
'date': '',
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
template['newKey'] = 'newVal';

//template['name'] = 'hello';
//console.log(template);
var jf = require('jsonfile')

var file = 'test.json'

jf.writeFile(file, template, function(err) {
  console.log(err)
})

var csv = require('csv');


var test = '262-7592, art@union.wisc.edu'


var output = [];
// Create the parser
var parser = csv.parse({delimiter: ','});
// Use the writable stream api
//output = parser.read(test);
//console.log(parser.read(test));

//console.log(output);