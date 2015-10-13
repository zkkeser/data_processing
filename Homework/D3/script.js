//This will be the code that creates the chart! I will put in lots of comments so I'm sure I know what everything
//does and it's clearer to read.

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

//Define x and y and do the easy version of our linear transformation!
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Create the x and y axis
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

//https://github.com/mbostock/d3/wiki/SVG-Shapes
var templine = d3.svg.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.temp) })

//Create our SVG canvas to draw in with full width and height (so plus margins)
var svg = d3.select("body").append("svg").attr("width",width+margin.left+margin.right).attr("height", height+margin.top+margin.bottom)
    .append("g").attr("transform","translate(" + margin.left + "," + margin.top+ ")");


//Yay! this finally loads the data! :)
//http://stackoverflow.com/questions/14986435/d3-csv-data-loading
d3.csv("data.csv", function(data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.temp = +d.temp/10;
    })


    //This is the domain of our x and y. for X it is as large as X is and for Y it's between 0 and it's highest number
    x.domain(d3.extent(data,function(d){return d.date;}));
    y.domain([-2.3,d3.max(data,function(d){return d.temp;})]);

    //Add path for the line with "line" as class
    svg.append("path").attr("class","line").attr("d",templine(data));

    // Add the X Axis and move it to the bottom of the graph
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

    // Add the Y Axis
    svg.append("g").attr("class", "y axis").call(yAxis);


    });

