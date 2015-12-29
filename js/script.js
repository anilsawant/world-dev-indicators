var margin = {top: 20, right: 20, bottom: 140, left: 80},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


/*.............................................................................
                  Graph 1 : Arable land (% of land area)
                  Graph 2 : Arable land (hectares per person)
                  Graph 3 : Arable land (hectares)
..............................................................................*/
var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width+800], .1);

var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");


var svg1 = d3.select("#graphWrap1").append("div")
              .style("max-width", (width + margin.left + margin.right + 2) + "px")
              .style("margin-left", "auto")
              .style("margin-right", "auto")
              .style("border","1px solid #aaa")
              .style("box-shadow","inset 0 0 2px #aaa")
              .style("border-top-left-radius","3px")
              .style("border-top-right-radius","3px")
              .style("overflow-x", "scroll")
    .append("svg")
      .attr("width", width + margin.left + margin.right + 800)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var arableLandIndia1Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorData[0] + "%</span>";
  });
svg1.call(arableLandIndia1Tip);

var svg2 = d3.select("#graphWrap2").append("div")
              .style("max-width", (width + margin.left + margin.right + 2) + "px")
              .style("margin-left", "auto")
              .style("margin-right", "auto")
              .style("border","1px solid #aaa")
              .style("box-shadow","inset 0 0 2px #aaa")
              .style("border-top-left-radius","3px")
              .style("border-top-right-radius","3px")
              .style("overflow-x", "scroll")
    .append("svg")
      .attr("width", width + margin.left + margin.right + 800)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var arableLandIndia2Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorData[1] + " Hec/Per</span>";
  });
svg2.call(arableLandIndia2Tip);


var svg3 = d3.select("#graphWrap3").append("div")
              .style("max-width", (width + margin.left + margin.right + 2) + "px")
              .style("margin-left", "auto")
              .style("margin-right", "auto")
              .style("border","1px solid #aaa")
              .style("box-shadow","inset 0 0 2px #aaa")
              .style("border-top-left-radius","3px")
              .style("border-top-right-radius","3px")
              .style("overflow-x", "scroll")
    .append("svg")
      .attr("width", width + margin.left + margin.right + 800)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var arableLandIndia3Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorData[2]/1000000 + " M Hec</span>";
  });
svg3.call(arableLandIndia3Tip);

// To read the graph 1 JSON
d3.json("data/jsons/graph_1.json",function( data ) {

  var plottingData = data;
  var indicatorOneMax = 0,
      indicatorTwoMax = 0,
      indicatorThreeMax = 0;
  var len = plottingData.data.length;
  for (var i = 0; i < len; i++) {
    if( indicatorOneMax < plottingData.data[i].indicatorData[0] ) // indicatorData[0] for "AG.LND.ARBL.ZS" i.e.Graph 1
      indicatorOneMax = plottingData.data[i].indicatorData[0];

    if( indicatorTwoMax < plottingData.data[i].indicatorData[1] ) // indicatorData[1] for "AG.LND.ARBL.HA.PC" i.e.Graph 2
      indicatorTwoMax = plottingData.data[i].indicatorData[1];

    if( indicatorThreeMax < plottingData.data[i].indicatorData[2] ) // indicatorData[2] for "AG.LND.ARBL.HA" i.e.Graph 3
      indicatorThreeMax = plottingData.data[i].indicatorData[2];
  }

  x1.domain( plottingData.data.map( function(d) { return d.year; }) );

  var y1 = d3.scale.linear()
      .range([height, 0])
      .domain( [0, indicatorOneMax] );
  var yAxis1 = d3.svg.axis()
      .scale(y1)
      .orient("left")
      .ticks(16)
      .tickFormat(function(d) { return d + "%"; });

  var y2 = d3.scale.linear()
      .range([height, 0])
      .domain( [0, indicatorTwoMax] );
  var yAxis2 = d3.svg.axis()
      .scale(y2)
      .orient("left")
      .ticks(16);

  var y3 = d3.scale.linear()
      .range([height, 0])
      .domain( [0, indicatorThreeMax/1000000] );
  var yAxis3 = d3.svg.axis()
      .scale(y3)
      .orient("left")
      .ticks(16);

/* Graph 1: Arable land (% of land area) */
  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis1)
    .append("text")
      .attr("x", 420)
      .attr("y", 100)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( "Years" );

  d3.selectAll(".x .tick text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", -60)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( plottingData.indicatorNames[0] );

  svg1.selectAll(".bar")
        .data( plottingData.data )
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1( d.year ); })
      .attr("width", 25)
      .attr("y", function(d) { return y1( (d.indicatorData[0] != null) ? d.indicatorData[0] : 0 ); })
      .attr("height", function(d) { return height - y1( (d.indicatorData[0] != null) ? d.indicatorData[0] : 0 ); })
      .on('mouseover', arableLandIndia1Tip.show)
      .on('mouseout', arableLandIndia1Tip.hide);


/* Graph 2: Arable land (hectares per person) */
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis1)
    .append("text")
      .attr("x", 420)
      .attr("y", 100)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( "Years" );

  d3.selectAll(".x .tick text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", -60)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( plottingData.indicatorNames[1] );

  svg2.selectAll(".bar")
        .data( plottingData.data )
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1( d.year ); })
      .attr("width", 25)
      .attr("y", function(d) { return y2( (d.indicatorData[1] != null) ? d.indicatorData[1] : 0 ); })
      .attr("height", function(d) { return height - y2( (d.indicatorData[1] != null) ? d.indicatorData[1] : 0 ); })
      .on('mouseover', arableLandIndia2Tip.show)
      .on('mouseout', arableLandIndia2Tip.hide);

  /* Graph 3: Arable land (hectares) */
    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis1)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "Years" );

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis3)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( plottingData.indicatorNames[2] + " X 1000000" );

    svg3.selectAll(".bar")
          .data( plottingData.data )
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x1( d.year ); })
        .attr("width", 25)
        .attr("y", function(d) { return y3( (d.indicatorData[2] != null) ? d.indicatorData[2]/1000000 : 0 ); })
        .attr("height", function(d) { return height - y3( (d.indicatorData[2] != null) ? d.indicatorData[2]/1000000 : 0 ); })
        .on('mouseover', arableLandIndia3Tip.show)
        .on('mouseout', arableLandIndia3Tip.hide);
});


/*.............................................................................
                  Graph 2 : Arable land (% of land area) of African Countries
..............................................................................*/
var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width+800], .1);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");


var svg4 = d3.select("#graphWrap4").append("div")
              .style("max-width", (width + margin.left + margin.right + 2) + "px")
              .style("margin-left", "auto")
              .style("margin-right", "auto")
              .style("border","1px solid #aaa")
              .style("box-shadow","inset 0 0 2px #aaa")
              .style("border-top-left-radius","3px")
              .style("border-top-right-radius","3px")
              .style("overflow-x", "scroll")
    .append("svg")
      .attr("width", width + margin.left + margin.right + 800)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var arableLandAfricaTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorData + "%</span>";
  });
svg4.call(arableLandAfricaTip);

// To read the graph 2 JSON
d3.json("data/jsons/graph_2.json",function( plottingData ) {

  var indicatorDataMax = 0;
  var len = plottingData.data.length;
  for (var i = 0; i < len; i++) {
    if( indicatorDataMax < plottingData.data[i].indicatorData ) // indicatorData[0] for "AG.LND.ARBL.ZS" i.e.Graph 1
      indicatorDataMax = plottingData.data[i].indicatorData;
  }

  x2.domain( plottingData.data.map( function(d) { return d.countryName; }) );

  var y = d3.scale.linear()
      .range([height, 0])
      .domain( [0, indicatorDataMax] );
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(8)
      .tickFormat(function(d) { return d + "%"; });

/* Graph 1: Arable land (% of land area) */
  svg4.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis2)
    .append("text")
      .attr("x", 420)
      .attr("y", 100)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( "Countries of " + plottingData.continent );

  d3.selectAll(".x .tick text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg4.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", -60)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( plottingData.indicatorNames[0] );

  svg4.selectAll(".bar")
        .data( plottingData.data )
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x2( d.countryName ); })
      .attr("width", 32)
      .attr("y", function(d) { return y( (d.indicatorData != null) ? d.indicatorData : 0 ); })
      .attr("height", function(d) { return height - y( (d.indicatorData != null) ? d.indicatorData : 0 ); })
      .on('mouseover', arableLandAfricaTip.show)
      .on('mouseout', arableLandAfricaTip.hide);

});


/*.............................................................................
          Graph 3 : Arable land (hectares) of continents from 1960 t0 2015
..............................................................................*/
var x3 = d3.scale.ordinal()
    .rangeRoundBands([0, width+800], .1);

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");


var svg5 = d3.select("#graphWrap5").append("div")
              .style("max-width", (width + margin.left + margin.right + 2) + "px")
              .style("margin-left", "auto")
              .style("margin-right", "auto")
              .style("border","1px solid #aaa")
              .style("box-shadow","inset 0 0 2px #aaa")
              .style("border-top-left-radius","3px")
              .style("border-top-right-radius","3px")
              .style("overflow-x", "scroll")
    .append("svg")
      .attr("width", width + margin.left + margin.right + 800)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var arableLandContinentTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorData + "%</span>";
  });
svg5.call(arableLandContinentTip);

// To read the graph 3 JSON
d3.json("data/jsons/graph_3.json",function( plottingData ) {

  var indicatorDataAggregateMax = 0;
  var len = plottingData.data.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < plottingData.data[i].continentData.length; j++) {
      if( indicatorDataAggregateMax < plottingData.data[i].continentData[j].indicatorDataAggregate )
        indicatorDataAggregateMax = plottingData.data[i].continentData[j].indicatorDataAggregate;
    }
  }

  x3.domain( plottingData.data[0].continentData.map( function(d) { return d.year; }) );

  var y = d3.scale.linear()
      .range([height, 0])
      .domain( [0, indicatorDataAggregateMax/1000000] );
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(16);

/* Graph 3: Arable land (Hectares) */
  svg5.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis3)
    .append("text")
      .attr("x", 420)
      .attr("y", 100)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( "Year" );

  d3.selectAll(".x .tick text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg5.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", -60)
      .attr("dy", ".71em")
      .style("font-size",20)
      .style("text-anchor", "middle")
      .text( plottingData.indicatorNames[0] + " X 1000000" );

  var lineColours = ["#00cc00","#00ccff","#ff9933","#9933ff","#ff0066","black","#ffcc00","#ff0000"];
  var arableLandContinentTip = [];
  // Draw the lines
  for (var i = 0; i < plottingData.continents.length; i++) {
    var arableLandContinentTipObj = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Arable Land :</strong> <span style='color:red'>" + d.indicatorDataAggregate/1000000 + " M Hec</span>";
      });
    arableLandContinentTip.push( arableLandContinentTipObj );
    svg5.call(arableLandContinentTipObj);

    var continentOneLine = d3.svg.line()
    .x(function(d) {
      return x3(d.year);
    })
    .y(function(d) {
      return y( d.indicatorDataAggregate/1000000 );
    });
    //.interpolate("basis");

    svg5.append('svg:path')
    .attr('d', continentOneLine( plottingData.data[i].continentData ))
    .data( plottingData.data[i].continentData )
    .attr('stroke', lineColours[i])
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr("transform","translate(13,0)");

    // marking the points on graph
    var circleClass = "circle" + i;
    svg5.selectAll("." + circleClass)
        .data( plottingData.data[i].continentData )
        .enter()
            .append("circle")
            .attr("class", circleClass)
            .attr("fill",lineColours[i])
            .attr("r",3)
            .attr("transform","translate(13,0)")
            .attr("cx", function(d) { return x3(d.year); })
            .attr("cy", function(d) { return y( d.indicatorDataAggregate/1000000 ); })
            .on('mouseover', arableLandContinentTip[i].show)
            .on('mouseout', arableLandContinentTip[i].hide);

    // Drawing the Legend
    if( i < 2 ) {
    svg5.append("rect")
        .attr("height",15)
        .attr("width",15)
        .attr("fill",lineColours[i] )
        .attr("x", 15)
        .attr("y", 30*i)
      svg5.append("text")
            .attr("x", 32)
            .attr("y", 13 + 30*i)
            .text( plottingData.data[i].continentName );
    }else if( i < 4 ){
      svg5.append("rect")
          .attr("height",15)
          .attr("width",15)
          .attr("fill",lineColours[i] )
          .attr("x", 145)
          .attr("y", 30*(i-2))
      svg5.append("text")
            .attr("x", 162)
            .attr("y", 13 + 30*(i-2))
            .text( plottingData.data[i].continentName );
    } else {
      svg5.append("rect")
          .attr("height",15)
          .attr("width",15)
          .attr("fill",lineColours[i] )
          .attr("x", 295)
          .attr("y", 30*(i-4))
      svg5.append("text")
            .attr("x", 312)
            .attr("y", 13 + 30*(i-4))
            .text( plottingData.data[i].continentName );
    }
  }
});
