var script = script || {}


//Pull the individual values from the form.
var ceilingHeightValue = $("#ceiling").val();
var wallLen = $("#wallWidth").val();
var windowHeightValue = $("#windowHeight").val();
var windowWidthValue = $("#windowWidth").val();
var glzRatioValue = $("#glazing").val();
var glzOrWidth = false;
var sillHeightValue = $("#sill").val();
var distanceWindows = $('#distWindow').val();
var occDistToWallCenter = $('#occupantDist').val();
var occDistFromFacade = $('#distFromFacade').val();

if ($("#windowWidthCheck").is(":checked")) {
	glzOrWidth = false;
} else {
	glzOrWidth = true;
}

var outdoorTempValue = $("#outdoortemp").val();
var uvalueValue = $("#uvalue").val();
var intLowEChecked = $("#lowECheck").is(":checked"); //provides a true/false
var intLowEEmissivity = $("#lowE").val();
var rvalueValue = $("#rvalue").val();
var ppdValue = $("#ppd").val();

var airtempValue = $("#airtemp").val();
var radiantFloorChecked = $("#radiant").is(":checked"); //provides a true/false
var airspeedValue = $("#airspeed").val();
var humidityValue = $("#humidity").val();
var clothingValue = $("#clothing").val();
var metabolic = $("#metabolic").val();


// Main function to run the analysis.
script.computeData = function() {
	// Compute the window and wall geometry.
	var geoResult = geo.createGlazingForRect(parseFloat(ceilingHeightValue), wallLen, glzRatioValue/100, parseFloat(windowWidthValue), parseFloat(windowHeightValue), parseFloat(sillHeightValue), parseFloat(distanceWindows), glzOrWidth);
	
	// Compute the view factors.
	var viewResult = geo.computeAllViewFac(geoResult.wallCoords, geoResult.glzCoords, occDistToWallCenter)
	
	// Compute the PPD for each point.
	var comfortResult = comf.getFullPPD(viewResult.wallViews, viewResult.glzViews, viewResult.facadeDist, geoResult.windowHeight, uvalueValue, intLowEChecked, intLowEEmissivity, rvalueValue, airtempValue, outdoorTempValue, radiantFloorChecked, clothingValue, metabolic, airspeedValue, humidityValue)
	
	// Return all of the information in one dictionary
	var r = {}
	r.wallCoords = geoResult.wallCoords;
	r.glzCoords = geoResult.glzCoords;
	r.glzRatio = geoResult.glzRatio;
	r.windowWidth = geoResult.windowWidth;
	r.windowHeight = geoResult.windowHeight;
	r.sillHeight = geoResult.sillHeight;
	r.centLineDist = geoResult.centLineDist;
	
	r.condensation = comfortResult.condensation; // Text string value that is either: "certain", "risky", "none".
	r.dataSet = comfortResult.myDataset;
	
	return r
}


//Call the function to render the graph.
render.makeGraph();
