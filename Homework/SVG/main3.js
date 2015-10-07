/* use this to test out your function */
window.onload = function() {
 	 opacityColor(countries,population)
}


//This is my dataset
var countries = ['AL','AT','BE','BG','BA','BY','CH','CZ','DE','DK','EE','FI','GB','GR','HR','HU','IE','IS','IT','LT','LU','LV','MD','MK','ME','NL','NO','PL','PT','RO','RS','SK','SI','SE','UA','FR','ES']
var population = [2893005,8602112,11250659,7202198,3791622,9485300,8279700,10537818,81197500,5678348,1313271,5489007,64800000,10846979,4225316,9849000,4635400,330610,60725000,2900787,562958,1978300,3555200,2069172,16922900,5189435,38484000,10374822,19942642,7114393,5421349,2068211,9816666,42813557,67087000,46439864]

var maxPopulation = Math.max.apply(Math,population);
var minPopulation = Math.min.apply(Math,population);
console.log(maxPopulation)
console.log(minPopulation)

//Based on the population, this function will color the countries a certain shade of green
function opacityColor(countries,population){
	for (i=0; i<countries.length; i++){
		percentage = population[i]/maxPopulation
		document.getElementById(countries[i]).style.fill = "green"
		document.getElementById(countries[i]).style.opacity = percentage + 0.2

	}}