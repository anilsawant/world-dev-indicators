var fs = require("fs");

// Create the base directory to hold all the jsons
var jSONDirExists = createJSONDirectory();

// Variables for graph 1 i.e. Arable land on India from 1960 to 2015
var graph1Data = {
  countryName : "India",
  indicators : ["AG.LND.ARBL.ZS","AG.LND.ARBL.HA.PC","AG.LND.ARBL.HA"],
  indicatorNames : ["Arable land (% of land area)","Arable land (hectares per person)","Arable land (hectares)"],
  period : { from: 1960, to : 2015 },
  periodIndex : { from: 4, to : 59 },
  data : []
};
// Initialize the year objects in graph1data.data
var startYearPoint = graph1Data.period.from - graph1Data.periodIndex.from;
for (var k = graph1Data.periodIndex.from ; k <= graph1Data.periodIndex.to; k++) {
  var yearObj = {
    year : startYearPoint + k,
    indicatorData : []
  };
  graph1Data.data.push( yearObj );
}


// Variables for graph 2 i.e. Arable land of African countries
var graph2Data = {
  continent : "Africa",
  indicators : ["AG.LND.ARBL.ZS"],
  indicatorNames : ["Arable land (% of land area)"],
  year : 2010,
  yearIndex : 54,
  data : []
}
var continentAndCountryData = fs.readFileSync('../data/Countries-Continents.csv' );
continentAndCountryData = continentAndCountryData.toString();
var continentAndCountries = {}; // Stores the details in 1 to Many mapping. One continent(property) has Many countries(an Array)
var countryAndContinent = {};// Stores the details in 1 to 1 mapping. One country has One continent

var lines = continentAndCountryData.split( /\r\n|\n/ );
var delim = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
var noOfLines = lines.length;
for( var i = 1; i < noOfLines; i++ ) {
  var line = lines[i];
  if( line != null && line != '' && line.length != 0 ) {
    var rowTokens = line.split( delim );
    countryAndContinent[ rowTokens[1] ] = rowTokens[0]; // To store the continent of a country

    if( Object.prototype.hasOwnProperty.call( continentAndCountries, rowTokens[0] ) ) {
      continentAndCountries[rowTokens[0]].push( rowTokens[1] ); // If the continent already exists then push the new country to that continents array
    } else {
      continentAndCountries[rowTokens[0]] = [rowTokens[1]]; // create a new array to hold all the countries in that continent
    }
  }
} // End for
writeObjectToDisk('ContinentsAndCountries', JSON.stringify( continentAndCountries ) ); // Write to disk

// Variables for graph 2 i.e. Arable land of African countries
var graph3Data = {
  continents : Object.keys( continentAndCountries ),
  indicators : ["AG.LND.ARBL.HA"],
  indicatorNames : ["Arable land (hectares)"],
  period : { from : 1960, to : 2015 },
  periodIndex : { from : 4, to : 59 },
  data : []
}
// Initialize the continent objects in graph3data.data
for (var i = 0; i < graph3Data.continents.length; i++) {
  var continentObj = {
    continentName : graph3Data.continents[i],
    continentData : []
  };
  for (var k = graph3Data.period.from ; k <= graph3Data.period.to; k++) {
    var yearObj = {
      year : k,
      indicatorDataAggregate : 0
    };
    continentObj.continentData.push( yearObj );
  }
  graph3Data.data.push( continentObj );
}

// function call to create the JSON String representation of the data
createJSONFromFile( '../data/WDI_Data.csv' );  // accepts the raw content's file path

// function to create a JSON String
function createJSONFromFile( file ) {
  var fileName = file.substr( file.lastIndexOf("/") + 1, file.length );
  console.log("Started reading file " + file );
  var rawData = fs.readFileSync( file );
  console.log("Completed reading file " + file );

  rawData = rawData.toString();

  // Various parameters for splitting the csv
  var newLineCharacter = /\r\n|\n/;
  var delim = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
  var lines = rawData.split( newLineCharacter );
  var noOfLines = lines.length;

  console.log("Creating required JSONs...");
  for( var i = 0; i < noOfLines; i++ ) {
    var line = lines[i];
    if( line != null && line != '' && line.length != 0 ) {
      var rowTokens = line.split( delim );
      createGraph1JSON( rowTokens );
      createGraph2JSON( rowTokens );
      createGraph3JSON( rowTokens );
    }
  } // End for

  console.log("Logging processedData");
  writeObjectToDisk( "graph_1", JSON.stringify(graph1Data) );// Write to disk
  writeObjectToDisk( "graph_2", JSON.stringify(graph2Data) );// Write to disk
  writeObjectToDisk( "graph_3", JSON.stringify(graph3Data) );// Write to disk
} // End createJSONFromFile

// Function to create the JSON for graph 1
function createGraph1JSON( rowTokens ) {
  if( (rowTokens[0].toUpperCase() == graph1Data.countryName.toUpperCase())  ) {
    // Switch between the various indicators. rowTokens[3] has the indicators
    switch ( rowTokens[3].toUpperCase() ) {
      // Case to match the first indicator i.e graph1Data.indicators[0]
      case graph1Data.indicators[0].toUpperCase():
        var index = 0;
        for (var k = graph1Data.periodIndex.from ; k <= graph1Data.periodIndex.to; k++) {
          graph1Data.data[index++].indicatorData[0] = parseFloat( rowTokens[k] );
        }
        break;// End case 1

      // Case to match the second indicator i.e graph1Data.indicators[1]
      case graph1Data.indicators[1].toUpperCase():
        var index = 0;
        for (var k = graph1Data.periodIndex.from ; k <= graph1Data.periodIndex.to; k++) {
          graph1Data.data[index++].indicatorData[1] = parseFloat( rowTokens[k] );
        }
        break;// End case 2

      // Case to match the third indicator i.e graph1Data.indicators[2]
      case graph1Data.indicators[2].toUpperCase():
        var index = 0;
        for (var k = graph1Data.periodIndex.from ; k <= graph1Data.periodIndex.to; k++) {
          graph1Data.data[index++].indicatorData[2] = parseFloat( rowTokens[k] );
        }
        break;// End case 3

    }// End switch
  }
} // End createGraph1JSON

// Function to create the JSON for graph 1
function createGraph2JSON( rowTokens ) {
  if( continentAndCountries[graph2Data.continent].indexOf( rowTokens[0] ) > -1 ) { // To check if a country belongs to graph2Data.continent i.e. Africa
    // Switch between the various indicators. rowTokens[3] represents the indicator names
    switch ( rowTokens[3].toUpperCase() ) {
      // Case to match the first indicator i.e graph1Data.indicators[0]
      case graph2Data.indicators[0].toUpperCase():
        var countryObj = {
          countryName : rowTokens[0],
          indicatorData : parseFloat( rowTokens[ graph2Data.yearIndex ] )
        };
        graph2Data.data.push( countryObj );
        break;// End case 1
    }// End switch
  }
} // End createGraph2JSON

// Function to create the JSON for graph 3
function createGraph3JSON( rowTokens ) {
  // check for required indicators. rowTokens[3] represents the indicator names
  if( rowTokens[3].toUpperCase() == graph3Data.indicators[0].toUpperCase() ) {
    for (var i = 0; i < graph3Data.continents.length; i++) {
      if( countryAndContinent[ rowTokens[0] ] == graph3Data.continents[i] ) {
        var index = 0;
        for (var k = graph3Data.periodIndex.from ; k <= graph3Data.periodIndex.to; k++) {
          var temp = parseFloat(rowTokens[k]);
          if ( temp )
            graph3Data.data[i].continentData[index].indicatorDataAggregate += temp ;
          index++;
        }
      }
    } // End outer for
  }
} // End createGraph3JSON

// Function to create 'data/jsons' directory
function createJSONDirectory() {
  // Check if 'jsons' directory exists
  try {
    fs.mkdirSync('../data/jsons');
    return true;
  } catch(e) {
    if ( e.code != 'EEXIST' ) {
      throw e;
    } else {
      return true;
    }
  }
} // End createJSONDirectory()

// Function to write the contents to disk
function writeObjectToDisk( fileName, content ) {
  var jSONFileName = fileName + '.json';

  if( jSONDirExists ) {
    fs.writeFileSync('../data/jsons/' + jSONFileName, content );
    console.log("Completed writing \"" + fileName + "\" to data/jsons/" + jSONFileName);
  } else {
    console.log("Could not write " + fileName + " to disk. data/jsons directory does not exist.");
  }
} // End writeObjectToDisk()
