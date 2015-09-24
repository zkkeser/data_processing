/**
 * Created by Kubilay on 22-Sep-15.
 */
	//Get the data from textarea

	var rawData = document.getElementById("rawdata").value


	//Split rawdata on lines
	var rawDataLines = [];
	var rawDataLines = rawData.split(/\r\n|\n/);
	console.log(rawDataLines.length)
	//Deletes the last item from the array because this was an empty one.
	rawDataLines.pop(); //http://www.w3schools.com/jsref/jsref_pop.asp


	arrayX = []
	arrayY = []
	for (i in rawDataLines){
		//Splits the lines into two parts, the date and the temperature
		var splittedLine = [];
  		splittedLine = rawDataLines[i].split(',')

  		splittedLine[0] = splittedLine[0].trim(); //http://www.w3schools.com/jsref/jsref_trim_string.asp
  		splittedLine[1] = splittedLine[1].trim();
  		splittedLine[0] = new Date(splittedLine[0]);
  		splittedLine[1] = parseInt(splittedLine[1]); //http://www.w3schools.com/jsref/jsref_parseint.asp

  		arrayX.push(splittedLine[0]);
  		arrayY.push(splittedLine[1]);

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
	var minimumY = Math.min.apply( Math, arrayY );
	var maximumY = Math.max.apply( Math, arrayY );


	//Transform X and Y
	var transformX = createTransform([0,366],[0,1280]);
	var transformY = createTransform([maximumY,minimumY],[0,720]);

	//
	var paper = document.getElementById('canvas');
	var drawing = paper.getContext('2d');

	//Draw the X axis
	xaxisXleft = transformX(0);
	xaxisYleft = transformY(0);
	xaxisXright = transformX(365);
	xaxisYright = transformY(0);
	drawing.moveTo(xaxisXleft,xaxisYleft);
	drawing.lineTo(xaxisXright,xaxisYright);
	drawing.stroke();

	//Draw the Y axis
	yaxisXtop = 0;
	yaxisYtop = 0;
	yaxisXbottom = 0;
	yaxisYbottom = 720;
	drawing.moveTo(0,0);
	drawing.lineTo(0,720);
	drawing.stroke();


	//This function feeds the array to the draw function
	function feed(arrayY){
		for (i=0; i<arrayY.length ; i++)
			draw(i,arrayY[i],i+1,arrayY[i+1])
	}

	//This function draws the line from point to point
	function draw(beginX,beginY,endX,endY){
		beginX= transformX(beginX);
		beginY= transformY(beginY);
		endX = transformX(endX);
		endY = transformY(endY);

		drawing.moveTo(beginX,beginY);
		drawing.lineTo(endX,endY);
		drawing.strokeStyle = '#295BFF';
		drawing.stroke();
	}




	feed(arrayY)