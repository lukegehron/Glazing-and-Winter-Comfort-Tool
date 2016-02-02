function makeGraph() {

	console.log("making graph");

	/* ------ SET UP VARIABLES AND DATA FUNCTIONS ------ */

	var margin = {top: 40, right: 60, bottom: 40, left: 60},
    	width = 600 - margin.left - margin.right,
    	height = 600 - margin.top - margin.bottom;
    	//padding = allObjectsDataset.length * 1.35;



	// Set up scale functions
	// x-axis: distance from facade
	var x = d3.scale.linear()
			.range([0, width]) // value -> display
			.domain([0, 13]);
	// y-axis: U-Value
	var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, 1]);


	// Define axes
	var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left");



	/* ------ MAKE THE GRAPH ------ */

	//Create SVG
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");

	// add axes
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + margin.left + "," + (height - margin.top) + ")")
    	.call(xAxis);

	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(" + margin.left + "," + (-margin.top) + ")")
	    .call(yAxis);


	/*var xAxisG = svg.append("g")
		.attr("class","axis")
		.attr("transform", "translate(" + margin.left + ",34)")
		.call(xAxis);*/





    /* ------ PLOT THE DATA ------ */
    // PLOT EACH POINT
	var objects = svg.selectAll(".dot") //select all class "dot" in <svg> (empty)
		.data(dataset) // join the selection to a data array
		.enter() // create a selection for the data objects that didn't match elements (all)
		.append("circle") // add a new circle for each data object
		.attr("class","dot") // set the class to match selection criteria
		.attr("r", 3)
		.attr("cx", function(d) { return x(d.dist); })
		.attr("cy", function(d) { return y(d.uval); })
		.attr("transform", function() {
				return "translate(" + margin.left + "," + margin.top + ")";})
		.style("fill", function(d) { 
			if (d.govfact == "mrt") {
				return "red";
			} else if (d.govfact == "dwn") {
				return "green";
			} else {
				return "blue";
			}
		})
} //end makeGraph()