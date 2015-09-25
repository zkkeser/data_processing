/**
 * Created by Kubilay on 22-Sep-15.
 */
	//Get the data from textarea

	var rawData = document.getElementById("rawdata").value


	//Split rawdata on lines
	var rawDataLines = [];
	var rawDataLines = rawData.split(/\r\n|\n/);
	//Deletes the last item from the array because this was an empty one.
	rawDataLines.pop(); //http://www.w3schools.com/jsref/jsref_pop.asp


	arrayX = []
	arrayY = []
	for (i in rawDataLines){
		//Splits the lines into two parts, the date and the temperature
		var splitLine = [];
  		splitLine = rawDataLines[i].split(',')

  		splitLine[0] = splitLine[0].trim(); //http://www.w3schools.com/jsref/jsref_trim_string.asp
  		splitLine[1] = splitLine[1].trim();
  		splitLine[0] = new Date(splitLine[0]);
  		splitLine[1] = parseInt(splitLine[1]); //http://www.w3schools.com/jsref/jsref_parseint.asp
  		//Cchange temp from xxx to xx,x
		splitLine[1] = splitLine[1]/10
		//Append data to arrays
  		arrayX.push(splitLine[0]);
  		arrayY.push(splitLine[1]);

  	}

	//Linear Transformation
	function createTransform(domain,range){
	var alpha =(range[1]-range[0])/(domain[1]-domain[0]);
    var beta= range[0]- alpha*domain[0];

    return function(x){
    return alpha * x + beta;
}
}
	//Get highest and lowest values of the data
	var minimumY = Math.min.apply(Math,arrayY);
	var maximumY = Math.max.apply(Math,arrayY);

	console.log(arrayY.length)
	console.log(arrayX.length)
	//Transform X and Y
	var transformX = createTransform([0,365],[50,950]);
	var transformY = createTransform([maximumY,minimumY],[50,350]);

	//
	var paper = document.getElementById('canvas');
	var drawing = paper.getContext('2d');


	drawing.beginPath();

	//Draw the X axis
	xaxisXleft = transformX(0);
	xaxisYleft = transformY(minimumY);
	xaxisXright = transformX(365);
	xaxisYright = transformY(minimumY);
	drawing.moveTo(xaxisXleft,xaxisYleft);
	drawing.lineTo(xaxisXright,xaxisYright);

	//Draw the Y axis
	yaxisXtop = transformX(0);
	yaxisYtop = transformY(minimumY);
	yaxisXbottom = transformX(0);
	yaxisYbottom = transformY(maximumY);
	drawing.moveTo(yaxisXtop,yaxisYtop);
	drawing.lineTo(yaxisXbottom,yaxisYbottom);
	drawing.stroke();

	drawing.closePath()


	//This function feeds the array to the draw function
	function feed(arrayY){
		for (i=0; i<arrayY.length ; i++)
			draw(i,arrayY[i],i+1,arrayY[i+1])
	}

	//This function draws the line from point to point
	function draw(beginX,beginY,endX,endY){
		drawing.beginPath()
		beginX= transformX(beginX);
		beginY= transformY(beginY);
		endX = transformX(endX);
		endY = transformY(endY);

		drawing.moveTo(beginX,beginY);
		drawing.lineTo(endX,endY);
		drawing.strokeStyle = '#295BFF';
		drawing.stroke();
		drawing.closePath();
	}


	feed(arrayY)

