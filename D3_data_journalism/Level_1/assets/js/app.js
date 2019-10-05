// @TODO: YOUR CODE HERE!


let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 15,
  right: 40,
  bottom: 70,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(censusData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    let xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(censusData, d => d.poverty)])
      .range([0, width]);

    let yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(censusData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================

    carolinaBlue = d3.rgb("#99badd")

    let circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", carolinaBlue);
    //.attr("fill", "lightblue")
      //.attr("opacity", ".85");
   
   
    let textGroup = chartGroup.selectAll()
      .data(censusData)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      // .attr("dx", function(d){return -10})
      .attr("dy", function(d){return +5})
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .attr("font-size", "15px")
      .attr("font-weight", "bold")
      .attr("fill", "white");


    // Step 6: Initialize tool tip
    // ==============================
     let toolTip = d3.tip()
       .attr("class", "d3-tip")
       .offset([80, -60])
       .html(function(d) {
         return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
       });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    chartGroup.call(toolTip);
    textGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    
    
    
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    textGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
         toolTip.hide(data);
       });
   

    

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("axisText", true)
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });



  

  
