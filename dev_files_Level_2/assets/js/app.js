// @TODO: YOUR CODE HERE!

let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 25,
  right: 40,
  bottom: 100,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append an SVG group
let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//=============================================================================================================

// Initial Params
let chosenXAxis = "poverty";  
let chosenYAxis = "healthcare";



//***************************************************************************************

// function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
      d3.max(censusData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}


// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)  // <-- Transition time
    .call(bottomAxis);

  return xAxis;
}


//************************************************************************

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000) // <-- Transition time
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}


//*****************************************************************

//Axis function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var xlabel = "Poverty:";
    var xsuffix = "%";
  } else if (chosenXAxis ==="age") {
    var xlabel = "Age (Median):";
    var xsuffix = "";
  } else {
    var xlabel = "Household Income (Median):";
    var xsuffix = "";
  }

  // if (chosenYAxis === "healthcare") {
  //   var ylabel = "Healtchare:";
  //   var ysuffix = "%";
  // } else if (chosenYAxis ==="smokes") {
  //   var ylabel = "Smokes:";
  //   var ysuffix = "%";
  // } else {
  //   var ylabel = "Obese:";
  //   var ysuffix = "%";
  // }

  var ylabel = "Healthcare:"
  var ysuffix = "%"




  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}${xsuffix}<br>${ylabel} ${d[chosenYAxis]}${ysuffix}`);
    });




  // Step 7: Create tooltip in the chart
  // ==============================
   
  circlesGroup.call(toolTip);
  //textGroup.call(toolTip);
   
 
  //textGroup.call(toolTip) <--- fr level I code

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });


  // textGroup.on("mouseover", function(data) {
  //   toolTip.show(data);
  //  })
  //   // onmouseout event
  //   .on("mouseout", function(data, index) {
  //     toolTip.hide(data);
  //   });
    

  return circlesGroup;
}

 
 
//*************************************************************************

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(censusData, err) {
  if (err) throw err;

  // parse data
  censusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
  });


//********************************************************************************

// xLinearScale function above csv import
var xLinearScale = xScale(censusData, chosenXAxis);

// Create yLinearscale function
var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(censusData, d => d[chosenYAxis])])
  .range([height, 0]);


// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);


// append x axis
var xAxis = chartGroup.append("g")
//  .classed("x-axis", true)  <-- check later
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);


// append y axis
chartGroup.append("g")
.call(leftAxis);


//********************************************************************************

// Step 5: Create Circles
//     // ==============================
carolinaBlue = d3.rgb("#99badd")

// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[chosenXAxis]))
  .attr("cy", d => yLinearScale(d[chosenYAxis]))
  .attr("r", 20)
  .attr("fill", carolinaBlue)
  .attr("opacity", ".5");


let textGroup = chartGroup.selectAll()
  .data(censusData)
  .enter()
  .append("text")
  .attr("text-anchor", "middle")
  // .attr("dx", function(d){return -10})
  .attr("dy", function(d){return +5})
  .text(d => d.abbr)
  .attr("x", d => xLinearScale(d[chosenXAxis]))
  .attr("y", d => yLinearScale(d[chosenYAxis]))
  .attr("font-size", "15px")
  .attr("font-weight", "bold")
  .attr("fill", "white");



// Create group for 3 x- axis labels
var labelsXGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

// Create X axes labels
var povertyLabel = labelsXGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "poverty") // value to grab for event listener
  .classed("active", true)
  .text("In Poverty (%)");

var ageLabel = labelsXGroup.append("text")
  .attr("x", 0)
  .attr("y", 45)
  .attr("value", "age") // value to grab for event listener
  .classed("inactive", true)
  .text("Age (Median)");

var houseIncomeLabel = labelsXGroup.append("text")
  .attr("x", 0)
  .attr("y", 70)
  .attr("value", "income") // value to grab for event listener
  .classed("inactive", true)
  .text("Household Income (Median)");




// Create group for 3 y- axis labels
var labelsYGroup = chartGroup.append("g")
  .attr("transform", "rotate(-90)");

// Create Y axes Labels
var healthcareLabel = labelsYGroup.append("text")
//  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 50)
  .attr("x", 0 - (height / 2))
  //.attr("value", "healthcare") // value to grab for event listener
  .attr("dy", "1em")
  .classed("active", true)
  .text("Lacks Healthcare (%)");

var smokesLabel = labelsYGroup.append("text")
//  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 25)
  .attr("x", 0 - (height / 2))
  //.attr("value", "smokes") // value to grab for event listener
  .attr("dy", "1em")
  .classed("inactive", true)
  .text("Smokes (%)");

var obeseLabel = labelsYGroup.append("text")
//  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  //.attr("value", "obese") // value to grab for event listener
  .attr("dy", "1em")
  .classed("inactive", true)
  .text("Obese (%)");

 

// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);



//*********************************************************************************************
// X axis labels event listener
labelsXGroup.selectAll("text")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    // replaces chosenXAxis with value
      chosenXAxis = value;

    // console.log(chosenXAxis)

    // functions here found above csv import
    // updates x scale for new data
     xLinearScale = xScale(censusData, chosenXAxis);

    // updates x axis with transition
     xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
     circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
    // textGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

    // updates tooltips with new info
     circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
     //textGroup = updateToolTip(chosenXAxis, textGroup);

    // XAxis Lables: changes classes to change bold text 
     if (chosenXAxis === "age") {
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
         .classed("active", true)
         .classed("inactive", false);
        houseIncomeLabel
          .classed("active", false)
          .classed("inactive", true);
        
     } else if (chosenXAxis === "income") {
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);  
        ageLabel
          .classed("active", false)
          .classed("inactive", true);
        houseIncomeLabel
          .classed("active", true)
          .classed("inactive", false);
     } else {
        povertyLabel
         .classed("active", true)
         .classed("inactive", false);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);
        houseIncomeLabel
          .classed("active", false)
          .classed("inactive", true);
     }
    }
  });


//*********************************************************************************************
// Y axis labels event listener


  // YAxis Lables: changes classes to change bold text 



//*********************************************************************************************
 }).catch(function(error) {
   console.log(error);
});











// /// -------------Level I Code --------------------------------------


// // Import Data
// d3.csv("assets/data/data.csv").then(function(censusData) {

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     censusData.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     let xLinearScale = d3.scaleLinear()
//       .domain([8, d3.max(censusData, d => d.poverty)])
//       .range([0, width]);

//     let yLinearScale = d3.scaleLinear()
//       .domain([4, d3.max(censusData, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     let bottomAxis = d3.axisBottom(xLinearScale);
//     let leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================

//     carolinaBlue = d3.rgb("#99badd")

//     let circlesGroup = chartGroup.selectAll("circle")
//     .data(censusData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "15")
//     .attr("fill", carolinaBlue);
//     //.attr("fill", "lightblue")
//       //.attr("opacity", ".85");
   
   
//     let textGroup = chartGroup.selectAll()
//       .data(censusData)
//       .enter()
//       .append("text")
//       .attr("text-anchor", "middle")
//       // .attr("dx", function(d){return -10})
//       .attr("dy", function(d){return +5})
//       .text(d => d.abbr)
//       .attr("x", d => xLinearScale(d.poverty))
//       .attr("y", d => yLinearScale(d.healthcare))
//       .attr("font-size", "15px")
//       .attr("font-weight", "bold")
//       .attr("fill", "white");


//     // Step 6: Initialize tool tip
//     // ==============================
//      let toolTip = d3.tip()
//        .attr("class", "d3-tip")
//        .offset([80, -60])
//        .html(function(d) {
//          return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
//        });

//     // // Step 7: Create tooltip in the chart
//     // // ==============================
//     chartGroup.call(toolTip);
//     textGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
    
    
    
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     textGroup.on("mouseover", function(data) {
//       toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//          toolTip.hide(data);
//        });
   

    

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .classed("axisText", true)
//       .text("Lacks Healthcare (%)");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   }).catch(function(error) {
//     console.log(error);
//   });



  

