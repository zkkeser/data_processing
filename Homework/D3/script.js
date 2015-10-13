//This will be the code that creates the chart! I will put in lots of comments so I'm sure I know what everything
//does and it's clearer to read.

//Yay! this finally loads the data! :)
d3.csv("data.csv", function(data) {
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.temp = +d.temp;
  })});


//First we need to set some dimensions that will be used for the canvas and also for the graph
var margin = {top: 50, right: 50, bottom:50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Parse the dates
//https://github.com/mbostock/d3/wiki/Time-Formatting
// %Y year with century as a decimal number
// %m month as a decimal number
// %d zero-padded day of the month as a decimal number
var parseDate = d3.time.format("%Y-%m-%d").parse;


var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
    .orient("left");

//https://github.com/mbostock/d3/wiki/SVG-Shapes
var line = d3.svg.line()
    .x(function(d) { return d.date})
    .y(function(d) { return d.temp})


