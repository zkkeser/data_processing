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

	//Transform X and Y
	var transformX = createTransform([0,365],[80,1000]);
	var transformY = createTransform([maximumY,minimumY],[50,350]);

	//Transforms X for the months
	var transformMonthX = createTransform([0,12],[80,1000])
	//Transforms Y for the temperature
	var transformTempY = createTransform([9,0],[50,350])

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

	//This loop draws our ticks and months on the x-axis
	var months = ['January','Februari', 'March', 'April' , 'May','June','July','August','September','October','November','December']
	for (i=0; i < months.length; i++ ){
		drawing.beginPath();
		drawing.fillText(months[i],transformMonthX(i)+5, transformY(minimumY)+15)
		drawing.moveTo(transformMonthX(i),transformY(minimumY));
		drawing.lineTo(transformMonthX(i),transformY(-5))
		drawing.stroke();
		drawing.closePath();
	}

	//This loop draws our ticks and temps on the y-axis
	var temp = [minimumY,0,5,10,15,20,25,30,maximumY]
	for (i=0; i < temp.length; i++ ){
		drawing.beginPath();
		drawing.fillText(temp[i],transformX(0) - 28, transformY(temp[i]))
		drawing.moveTo(transformX(0),transformY(temp[i]))
		drawing.lineTo(transformX(0)-5,transformY(temp[i]))
		drawing.stroke();
		drawing.closePath();
	}
	feed(arrayY)

	// Source for the text-rotation code
	// http://stackoverflow.com/questions/3167928/drawing-rotated-text-on-a-html5-canvas
	drawing.save();
	drawing.translate(-300, 475);
	drawing.rotate(-Math.PI/2);
	drawing.textAlign = "center";
	drawing.fillText("Temperature in Celsius", 300, 320);
	drawing.restore();
	
	drawing.beginPath()
	drawing.fillText("")
	drawing.closePath()
