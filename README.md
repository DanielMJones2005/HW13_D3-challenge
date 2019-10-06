# HW13 D3-challenge: D3 Homework - Data Journalism and D3

![alt text](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background
Welcome to the newsroom! I've just accepted a data visualization position for a major metro paper. 
I'm tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and 
interactive elements to help readers understand my findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. 
She's counting on me to sniff out the first story idea by sifting through information from the U.S. Census Bureau and 
the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates: 
https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml.

The current data set includes data on rates of income, obesity, poverty, etc. by state. 
MOE stands for "margin of error."

## Task 
- Level 1: D3 Dabbler
- Level 2: Impress the Boss (Optional Challenge Assignment)

## Files

[D3_data_journalism](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism)
  * [Level_1](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_1)
    * [assets](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_1/assets)
      * [css](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_1/assets/css)
        * d3Style.css
        * style.css
      * [data](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_1/assets/data)
        * data.csv
      * [js](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_1/assets/js)
    * [index.html](https://github.com/DanielMJones2005/HW13_D3-challenge/blob/master/D3_data_journalism/Level_1/index.html)
  * [Level_2](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_2)
    * [assets](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_2/assets)
      * [css](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_2/assets/css)
        * d3Style.css
        * style.css
      * [data](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_2/assets/data)
        * data.csv
       * [js](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/D3_data_journalism/Level_2/assets/js)
    * [index.html](https://github.com/DanielMJones2005/HW13_D3-challenge/blob/master/D3_data_journalism/Level_2/index.html)
  

[img](https://github.com/DanielMJones2005/HW13_D3-challenge/tree/master/img)
  * 2-census.jpg
  * 3-brfss.jpg
  * 4-scatter.jpg
  * 5-correl.jpg
  * 6-excel.jpg
  * 7-animated-scatter.gif
  * 8-tooltip.gif
  * 9-responsive-d3.gif

[.gitignore](https://github.com/DanielMJones2005/HW13_D3-challenge/blob/master/.gitignore)


# Level 1: D3 Dabbler
Created a scatter plot between two of the data variables, Healthcare vs. Poverty
   * Using D3 techniques, created a scatter plot that represented each state with circle element
   * Coded in app.js file, pulled in data from data.csv by using the d3.csv function
   * Included state abbreviations in the circles
   * Created and situated axes and labels to the left and bottom of the chart

Note: Used python -m http.server to run the visualization
This hosted the page at localhost:8000 in web browser



# Level 2: Impress the Boss (Optional Challenge Assignment)

## 1. More Data, More Dynamics
Included more demographics and more risk factors
   * Placed additional labels in scatter plot and gave them click events
      * So that users can decide which data to display
   * Animated the transitions for circles' locations as well as the range of axes
   * Did this for three risk factors for each axis

## 2. Incorporate d3-tip
Added tooltips to your circles and display each tooltip with the data that the user has selected
   * Used the d3-tip.js
   
