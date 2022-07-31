var PrimaryTypeArray = [];
var DateArray = [];
var months = { "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June",
                "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December" };
var LocationDescriptionArray = [];
var crimeLocation = [];
var crimesType = [];
var chosenField = "THEFT";
function init() {
   d3.csv("https://raw.githubusercontent.com/shveta12345/shveta12345.github.io/main/data.csv").then(function(data) {
        data.forEach(function(d) {
            PrimaryTypeArray.push(d.PrimaryType);
            var arr = d.Date.split("/");
            var arr1 = d.Date.split(" ");
            var arr2 = arr1[1].split(":");
            DateArray.push(months[arr[0]]);
            LocationDescriptionArray.push(d.LocationDescription);
            crimeLocation.push([d.PrimaryType, d.LocationDescription]);
            crimesType.push(d.PrimaryType)
        });
    }); 
    d3.select(".dropdown").insert("h4").text("Select crime:");
    d3.select(".dropdown").insert("select").classed("crime",true);
    d3.select(".dropdown").classed("hidden",true);
    d3.select(".dropdown").insert("span").html('<input type="button" value="Sort this graph" onclick="sort()"/>');
    d3.select("#scene0").insert("h2").text("Introduction");
    d3.select("#scene0").insert("span").text("This narrative visualization shows crimes occured in Chicago since 2020. ");
    d3.select("#scene0").insert("span").text("Data source is from City of Chicago portal and the data is 01/01/2020 to 12/31/2020");
    d3.select("#scene0").insert("span").html('<a target="_blank" href="https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2/">Link to Chicago Reported Crimes dataset</a>');
    d3.select("#scene0").insert("br");
    d3.select("#scene0").insert("br");
    d3.select("#beginText").insert("span").text("Click 'Chicago Crime Scenes' button will allow you to move through different scenes");
    d3.select("#beginText").insert("br");
    d3.select("#beginText").insert("br");
    d3.select("#beginText").insert("span").text(">>> Shveta Shah <<<");
}  

function scene0() {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select(".dropdown").classed("hidden",true);
    d3.select("#scene0").insert("h2").text("Introduction");
    d3.select("#scene0").insert("br");
    d3.select("#scene0").insert("br");
    d3.select("#scene0").insert("span").html('<a target="_blank" href="https://data.cityofchicago.org/Public-Safety/Crimes-2020/qzdf-xmn8/data">Link to City of Chicago portal</a>');
    d3.select("#scene0").insert("br");
    d3.select("#scene0").insert("br");
    d3.select("#beginText").insert("span").text("Clicking on next button will show charts containing different scenes");
}

function scene1() {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select(".dropdown").classed("hidden",true);
    d3.select("#scene1").insert("h2").text("Top 10 Types of Crimes");
    d3.select("#scene1").insert("span").text("The bar chart shows top 10 different types of crimes occurred in Chicago in the year 2020.");
    d3.select("#scene1").insert("br");
    d3.select("#scene1").insert("br");
    d3.select("#scene1").insert("span").text("Battery and Theft were the most crimes happened and in contract, burglary, weapons violation and robbery crimes occured the least compared to top 7 crimes");

    const countUnique = PrimaryTypeArray => {
        const counts = {};
        for (var i = 0; i < PrimaryTypeArray.length; i++) {
           counts[PrimaryTypeArray[i]] = 1 + (counts[PrimaryTypeArray[i]] || 0);
        };
        return counts;
     };

    var abc = countUnique(PrimaryTypeArray);
    var items = Object.keys(abc).map(function(key) {
        return [key, abc[key]];
    });
    
    items.sort(function(first, second) {
    return second[1] - first[1];
    });
    
    var arr = items.slice(0, 10);

    var x = d3.scaleBand()
            .range([0, 800])
            .padding(0.8);
    var y = d3.scaleLinear()
            .range([500, 0]);

    x.domain(arr.map(function(d) { return d[0]; }));

    y.domain([0, d3.max(arr, function(d) { return d[1]; })]);

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", (5+x.bandwidth()))
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return 500 - y(d[1]); });

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,500)")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .call(d3.axisLeft(y));

    d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40)
    .attr("x",-215)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("NUMBER OF CRIMES");  

    d3.select("svg")
    .append("text")
    .attr("transform", "translate(400,500)")
    .attr("y", 100)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("TYPES OF CRIMES");  
    
//HIGER
    //DRAW BOX
    d3.select("svg")
    .append("rect")
    .attr("x",330)
    .attr("y",0)
    .attr("width",210)
    .attr("height",40)
    .attr("fill","lightgray")
    .transition().duration(1000);

    //DRAW  TEXT 
    d3.select("svg")
    .append("text")
    .attr("x",340)
    .attr("y",15)
    .style("font-size","11px")
    .attr("dy",".35em")
    .text("Highest frequency of Crimes:")
    .attr("fill","black");
		
	d3.select("svg")
    .append("text")
    .attr("x",340)
    .attr("y",25)
    .attr("dy",".35em")
    .style("font-size","11px")
    .text("THEFT, BATTERY, CRIMINAL DAMAGE")
    .attr("fill","black");

    //DRAW  LINE 
    d3.select("svg")
    .append("line")
    .attr("x1",175)
    .attr("y1",10)
    .attr("x2",330)
    .attr("y2",10)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

    d3.select("svg")
    .append("line")
    .attr("x1",250)
    .attr("y1",20)
    .attr("x2",330)
    .attr("y2",20)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

//LOWER
    //DRAW BOX
    d3.select("svg")
    .append("rect")
    .attr("x",650)
    .attr("y",225)
    .attr("width",210)
    .attr("height",40)
    .attr("fill","lightgray")
    .transition().duration(1000);

    //DRAW  TEXT 
    d3.select("svg")
    .append("text")
    .attr("x",660)
    .attr("y",240)
    .style("font-size","11px")
    .attr("dy",".35em")
    .text("Lowest frequency of Crimes:")
    .attr("fill","black");
		
	d3.select("svg")
    .append("text")
    .attr("x",660)
    .attr("y",250)
    .attr("dy",".35em")
    .style("font-size","11px")
    .text("Burglary, Weapons Violation & Robbery")
    .attr("fill","black");

    //DRAW  LINE 
    d3.select("svg")
    .append("line")
    .attr("x1",750)
    .attr("y1",270)
    .attr("x2",700)
    .attr("y2",390)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

    d3.select("svg")
    .append("line")
    .attr("x1",750)
    .attr("y1",270)
    .attr("x2",760)
    .attr("y2",390)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

    d3.select("svg")
    .append("line")
    .attr("x1",750)
    .attr("y1",270)
    .attr("x2",830)
    .attr("y2",390)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");
}

async function scene2() {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select(".dropdown").classed("hidden",true);
    d3.select("#scene2").insert("h2").text("Top 10 Crimes Location");
    d3.select("#scene2").insert("span").text("The bar chart shows total crimes occurred at locations in Chicago in the year 2020.");
    d3.select("#scene2").insert("br");
    d3.select("#scene2").insert("br");
    d3.select("#scene2").insert("span").text("There is a significant different total crimes occured in Street (where it is highest) compare to restaurant & gas station(where total crimes are lowest from top 8 locations.)");

    const countUnique = LocationDescriptionArray => {
        const counts = {};
        for (var i = 0; i < LocationDescriptionArray.length; i++) {
           counts[LocationDescriptionArray[i]] = 1 + (counts[LocationDescriptionArray[i]] || 0);
        };
        return counts;
     };

    var abc = countUnique(LocationDescriptionArray);
    var items = Object.keys(abc).map(function(key) {
        return [key, abc[key]];
    });
    
    items.sort(function(first, second) {
    return second[1] - first[1];
    });
    
    var arr = items.slice(0, 10);

    var x = d3.scaleBand()
            .range([0, 800])
            .padding(0.8);
    var y = d3.scaleLinear()
            .range([500, 0]);

    x.domain(arr.map(function(d) { 
        return d[0]; 
    }));

    y.domain([0, d3.max(arr, function(d) { return d[1]; })]);

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", (5+x.bandwidth()))
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return 500 - y(d[1]); });

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,500)")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .call(d3.axisLeft(y));

//HIGER
    //DRAW BOX
    d3.select("svg")
    .append("rect")
    .attr("x",300)
    .attr("y",0)
    .attr("width",160)
    .attr("height",40)
    .attr("fill","lightgray")
    .transition().duration(1000);

    //DRAW  TEXT 
    d3.select("svg")
    .append("text")
    .attr("x",310)
    .attr("y",15)
    .style("font-size","11px")
    .attr("dy",".35em")
    .text("Highest frequency of Crimes:")
    .attr("fill","black");
		
	d3.select("svg")
    .append("text")
    .attr("x",310)
    .attr("y",25)
    .attr("dy",".35em")
    .style("font-size","11px")
    .text("Street")
    .attr("fill","black");

    //DRAW  LINE 
    d3.select("svg")
    .append("line")
    .attr("x1",175)
    .attr("y1",10)
    .attr("x2",300)
    .attr("y2",10)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

//LOWER
    //DRAW BOX
    d3.select("svg")
    .append("rect")
    .attr("x",700)
    .attr("y",300)
    .attr("width",170)
    .attr("height",40)
    .attr("fill","lightgray")
    .transition().duration(1000);

    //DRAW  TEXT 
    d3.select("svg")
    .append("text")
    .attr("x",710)
    .attr("y",315)
    .style("font-size","11px")
    .attr("dy",".35em")
    .text("Lowest frequency of Crimes:")
    .attr("fill","black");
		
	d3.select("svg")
    .append("text")
    .attr("x",710)
    .attr("y",325)
    .attr("dy",".35em")
    .style("font-size","11px")
    .text("RESTAURANT & GAS STATION")
    .attr("fill","black");

    //DRAW  LINE 
    d3.select("svg")
    .append("line")
    .attr("x1",770)
    .attr("y1",350)
    .attr("x2",760)
    .attr("y2",450)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

    d3.select("svg")
    .append("line")
    .attr("x1",770)
    .attr("y1",350)
    .attr("x2",830)
    .attr("y2",450)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");

    d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40)
    .attr("x",-215)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("NUMBER OF CRIMES");  

    d3.select("svg")
    .append("text")
    .attr("transform", "translate(400,500)")
    .attr("y", 100)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("LOCATION");  
}

async function scene3() {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select(".dropdown").classed("hidden",true);
    d3.select("#scene3").insert("h2").text("Total Crimes per Month");
    d3.select("#scene3").insert("span").text("The bar chart shows total crimes occurred in Chicago in the year 2020.");
    d3.select("#scene3").insert("br");
    d3.select("#scene3").insert("br");
    d3.select("#scene3").insert("span").text("Crimes are usuallly high and comparably similar throughout the year expect the month of April where the total crimes are the lowest");

    const countUnique = DateArray => {
        const counts = {};
        for (var i = 0; i < DateArray.length; i++) {
           counts[DateArray[i]] = 1 + (counts[DateArray[i]] || 0);
        };
        return counts;
     };

    var abc = countUnique(DateArray);
    var items = Object.keys(abc).map(function(key) {
        return [key, abc[key]];
    });

    var arr = [items[8],items[1], items[0],items[9],items[4],items[5], items[7], items[6], items[11],items[10], items[3],items[2]];

    var x = d3.scaleBand()
            .range([0, 800])
            .padding(0.8);
    var y = d3.scaleLinear()
            .range([500, 0]);

    x.domain(arr.map(function(d) { 
        return d[0]; 
    }));

    y.domain([0, d3.max(arr, function(d) { return d[1]; })]);

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", (5+x.bandwidth()))
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return 500 - y(d[1]); });

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,500)")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .call(d3.axisLeft(y));

    //LOWER
    //DRAW BOX
    d3.select("svg")
    .append("rect")
    .attr("x",300)
    .attr("y",0)
    .attr("width",115)
    .attr("height",40)
    .attr("fill","lightgray")
    .transition().duration(1000);

    //DRAW  TEXT 
    d3.select("svg")
    .append("text")
    .attr("x",310)
    .attr("y",15)
    .style("font-size","11px")
    .attr("dy",".35em")
    .text("Lowest total crimes")
    .attr("fill","black");
		
	d3.select("svg")
    .append("text")
    .attr("x",310)
    .attr("y",25)
    .attr("dy",".35em")
    .style("font-size","11px")
    .text("happened in April")
    .attr("fill","black");

    d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40)
    .attr("x",-215)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("NUMBER OF CRIMES");  

    d3.select("svg")
    .append("text")
    .attr("transform", "translate(400,450)")
    .attr("y", 100)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("MONTHS");  

    //DRAW  LINE 
    d3.select("svg")
    .append("line")
    .attr("x1",345)
    .attr("y1",170)
    .attr("x2",345)
    .attr("y2",50)
    .attr("stroke-width",0.75)
    .attr("stroke","gray");
}

function scene4(ddi) {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select("#scene3").insert("h2").text("Discover yourself");
    d3.select("#scene3").insert("span").text("You can select any crime from the dropdown and see the top 10 locations the selected crime occurs the most. You can sort the graph by clicking on 'Sort this graph' button");
    
    d3.select(".dropdown").classed("hidden",false);

    var uniqueCrimesType= crimesType.filter((item, i, ar) => ar.indexOf(item) === i);

    d3.select(".crime").selectAll("option")
			.data(uniqueCrimesType)
			.enter().append("option")
			.text(d => d);

    
    var hh = [];
    for(var i = 0; i < crimeLocation.length; i++){
        for(var j = 0; j < crimeLocation[i].length; j++){
            if(crimeLocation[i][0] == ddi){
                hh.push(crimeLocation[i][1]);
            }
        }
    }

    const countUnique = hh => {
        const counts = {};
        for (var i = 0; i < hh.length; i++) {
           counts[hh[i]] = 1 + (counts[hh[i]] || 0);
        };
        return counts;
     };

    var abc = countUnique(hh);
    var items = Object.keys(abc).map(function(key) {
        return [key, abc[key]];
    });
    
    var arr = items.slice(0, 10);

    var x = d3.scaleBand()
            .range([0, 800])
            .padding(0.8);
    var y = d3.scaleLinear()
            .range([500, 0]);

    x.domain(arr.map(function(d) { 
        return d[0]; 
    }));

    y.domain([0, d3.max(arr, function(d) { return d[1]; })]);

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .transition().duration(1000)	
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", (5+x.bandwidth()))
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return 500 - y(d[1]); });

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,500)")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .call(d3.axisLeft(y));

    d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40)
    .attr("x",-215)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("NUMBER OF CRIMES");  

    d3.select("svg")
    .append("text")
    .attr("transform", "translate(400,511)")
    .attr("y", 100)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("TYPES OF CRIMES");  
    
    var select = d3.select(".crime")
    .on("change", function() {
        chosenField = this.value;
        scene4(this.value);
    });

}

function scene4Sort(ddi) {
    d3.select(".svg").selectAll("*").remove();
    d3.select("#scene0").selectAll("*").remove();
    d3.select("#scene1").selectAll("*").remove();
    d3.select("#scene2").selectAll("*").remove();
    d3.select("#scene3").selectAll("*").remove();
    d3.select("#scene4").selectAll("*").remove();
    d3.select("#scene3").insert("h2").text("Discover yourself");
    d3.select("#scene3").insert("span").text("You can select any crime from the dropdown and see the top 10 locations the selected crime occurs the most. You can sort the graph by clicking on 'Sort this graph' button");

    d3.select(".dropdown").classed("hidden",false);

    var uniqueCrimesType= crimesType.filter((item, i, ar) => ar.indexOf(item) === i);

    d3.select(".crime").selectAll("option")
			.data(uniqueCrimesType)
			.enter().append("option")
			.text(d => d);

    var hh = [];
    for(var i = 0; i < crimeLocation.length; i++){
        for(var j = 0; j < crimeLocation[i].length; j++){
            if(crimeLocation[i][0] == ddi){
                hh.push(crimeLocation[i][1]);
            }
        }
    }

    const countUnique = hh => {
        const counts = {};
        for (var i = 0; i < hh.length; i++) {
           counts[hh[i]] = 1 + (counts[hh[i]] || 0);
        };
        return counts;
     };

    var abc = countUnique(hh);
    var items = Object.keys(abc).map(function(key) {
        return [key, abc[key]];
    });
    
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    var arr = items.slice(0, 10);

    var x = d3.scaleBand()
            .range([0, 800])
            .padding(0.8);
    var y = d3.scaleLinear()
            .range([500, 0]);

    x.domain(arr.map(function(d) { 
        return d[0]; 
    }));

    y.domain([0, d3.max(arr, function(d) { return d[1]; })]);

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .transition().duration(1000)	
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", (5+x.bandwidth()))
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return 500 - y(d[1]); });

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,500)")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    d3.select("svg")
    .append("g")
    .attr("transform","translate(100 ,0)")
    .call(d3.axisLeft(y));

    d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40)
    .attr("x",-215)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("NUMBER OF CRIMES");  

    d3.select("svg")
    .append("text")
    .attr("transform", "translate(400,511)")
    .attr("y", 100)
    .attr("x", 100)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("TYPES OF CRIMES");  
    
    var select = d3.select(".crime")
    .on("change", function() {
        chosenField = this.value;
        scene4(this.value);
    });

}

function sort(){
    scene4Sort(chosenField)
}

function LetsBegin(){
    setTimeout(function(){ 
        d3.select(".btns").classed("hidden",false);
        d3.select(".begin").classed("hidden",true);
        d3.select("#beginText").classed("hidden",true);
    }, 1000);
}