	google.load('visualization', '1', {
		'packages': ['geochart']
	});
	google.setOnLoadCallback(init);

	var options;
	var data, worldData, usData, ukData, auData, caData;
  var chart;
  var dataFocus = 'world';
  var dataIdent = ['world', 'US', 'GB', 'AU', 'CA'];
  var zoom = 'countries';
  var decIndex = 0;

  function init(){

        // Define init options
        options = {
        	backgroundColor: {
        		fill: 'rgb(250,250,250)',
        		stroke: '#FFFFFF',
        		strokeWidth: 0
        	},
        	colorAxis: {
            colors: ['#5592AE','#0F1E26']
          },  
          //legend:['#7AC5CD','#000033'],
          datalessRegionColor: 'RGB(230,230,240)',
          enableRegionInteractivity: 'true',
        //Choose the map view (zoomed in or not)
        region: dataFocus,
        resolution: zoom,
        keepAspectRatio: true,
        width: 800,
        //height: 500,
        tooltip: {
         textStyle: {color: '#444444'},
         trigger: 'hover',
         isHtml: true,
         legend: 'none'
        }
      };

      loadData();
      setWorld();
      addListeners();
      initVisualization();

    }
//---------------------------------------------------------------------------------------------------------
function loadData(){
    //world data
    worldData = new google.visualization.DataTable();
    worldData.addColumn('string', 'Country');
    worldData.addColumn('number', 'Value');
    // A column for custom tooltip content
    worldData.addColumn({type:'string', role:'tooltip'});

    for(i=0;i<decades[decIndex].countries.length;i++){
      var countryName=decades[decIndex].countries[i].name;
      var percentage=decades[decIndex].countries[i].count/40*100;
      //one decimal
      var p = percentage.toFixed();
      var artistCountWorld=decades[decIndex].countries[i].count;
      //v recognizes the geograp. area, v is the title row
      worldData.addRows([[{v:countryName,f:countryName + ", " + p + '%'},percentage,""]]);       
    }

    //US data
    usData = new google.visualization.DataTable();
    usData.addColumn('string', 'Country');
    usData.addColumn('number', 'Value');
        // A column for custom tooltip content
    usData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

          //US data
          for(i=0;i<decades[decIndex].countries[0].provinces.length;i++){
          	var stateName=decades[decIndex].countries[0].provinces[i].name;
          	var artistCount=decades[decIndex].countries[0].provinces[i].count;

            var percentage=(decades[decIndex].countries[0].provinces[i].count)/(decades[decIndex].countries[0].count)*100;
            var p = percentage.toFixed();

            var artistName1=decades[decIndex].countries[0].provinces[i].examples[0].name;
            var artistName2=decades[decIndex].countries[0].provinces[i].examples[1].name;

            if(decades[decIndex].countries[0].provinces[i].examples[1].name==""){
              usData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent2(artistName1)]]);
            }
            else{
              usData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent(artistName1, artistName2)]]);    
            }   
          }

//---------------------------------------------------------------------------------------------------------
          //UK data

          if(decades[decIndex].countries.length > 1){

          	ukData = new google.visualization.DataTable();
          	ukData.addColumn('string', 'Country');
          	ukData.addColumn('number', 'Value');
          	ukData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

          	for(i=0;i<decades[decIndex].countries[1].provinces.length;i++){
          		var stateName=decades[decIndex].countries[1].provinces[i].name;
          		var artistCount=decades[decIndex].countries[1].provinces[i].count;

              var percentage=(decades[decIndex].countries[1].provinces[i].count)/(decades[decIndex].countries[1].count)*100;
              var p = percentage.toFixed();

              if(decades[decIndex].countries[1].provinces[i].examples.length == 1) {
                var artistName1 = decades[decIndex].countries[1].provinces[i].examples[0].name;
                ukData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent2(artistName1)]]);
              } else if (decades[decIndex].countries[1].provinces[i].examples.length == 2) {
                var artistName1=decades[decIndex].countries[1].provinces[i].examples[0].name;
                var artistName2=decades[decIndex].countries[1].provinces[i].examples[1].name;
                ukData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent(artistName1, artistName2)]]);
              }

/*              var artistName1=decades[decIndex].countries[1].provinces[i].examples[0].name;
              var artistName2=decades[decIndex].countries[1].provinces[i].examples[1].name;

              if(decades[decIndex].countries[1].provinces[i].examples[1].name==""){
                ukData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent2(artistName1)]]);
              }
              else{
                ukData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent(artistName1, artistName2)]]);    
              }  */ 
            }
          }


//---------------------------------------------------------------------------------------------------------
          // Au data
          if(decades[decIndex].countries.length > 2){
          	auData = new google.visualization.DataTable();
          	auData.addColumn('string', 'Country');
          	auData.addColumn('number', 'Value');
          	auData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

          	for(i=0;i<decades[decIndex].countries[2].provinces.length;i++){
          		var stateName=decades[decIndex].countries[2].provinces[i].name;
          		var artistCount=decades[decIndex].countries[2].provinces[i].count;

              var percentage=(decades[decIndex].countries[2].provinces[i].count)/(decades[decIndex].countries[2].count)*100;
              var p = percentage.toFixed();

              var artistName1=decades[decIndex].countries[2].provinces[i].examples[0].name;
              var artistName2=decades[decIndex].countries[2].provinces[i].examples[1].name;

              if(decades[decIndex].countries[2].provinces[i].examples[1].name==""){
                auData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent2(artistName1)]]);
              }
              else{
                auData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent(artistName1, artistName2)]]);    
              }   
            }
          }
//---------------------------------------------------------------------------------------------------------
            // Canada data
            if(decades[decIndex].countries.length > 3){
            	caData = new google.visualization.DataTable();
            	caData.addColumn('string', 'Country');
            	caData.addColumn('number', 'Value');
            	caData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

            	for(i=0;i<decades[decIndex].countries[3].provinces.length;i++){
            		var stateName=decades[decIndex].countries[3].provinces[i].name;
            		var artistCount=decades[decIndex].countries[3].provinces[i].count;

                var percentage=(decades[decIndex].countries[3].provinces[i].count)/(decades[decIndex].countries[3].count)*100;
                var p = percentage.toFixed();

                var artistName1=decades[decIndex].countries[3].provinces[i].examples[0].name;
                var artistName2=decades[decIndex].countries[3].provinces[i].examples[1].name;

                if(decades[decIndex].countries[3].provinces[i].examples[1].name==""){
                  caData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent2(artistName1)]]);
                }
                else{ 
                  caData.addRows([[{v:stateName,f:stateName + ', ' + p + '%'},percentage,createCustomHTMLContent(artistName1, artistName2)]]);    
                }   

              }
            }

//--------------------------------------------------------------------------------------------------------
switch (options.region) {
  case "world":
  data = worldData;
  break;
  case "US":
  data = usData;
  break;
  case "GB":
  if(decades[decIndex].countries.length > 1){
    data = ukData;
  } else {
    data = worldData;
  }
  break;
  case "AU":
  if(decades[decIndex].countries.length > 2){
    data = auData;
  } else {
    data = worldData;
  }
  break;
  case "CA":
  if(decades[decIndex].countries.length > 3){
    data = caData;
  } else {
    data = worldData;
  }
  break;
  default:
            //
          }
        }
//---------------------------------------------------------------------------------------------------------

// Add button listeners
function addListeners() {
  document.getElementById("globe").addEventListener("click", function(){
    setWorld();
    chart.draw(data, options);
  });
  document.getElementById("2040s").addEventListener("click", function(){
    decIndex = 0;
    loadData();
    chart.draw(data, options);
  });
  document.getElementById("50s").addEventListener("click", function(){
    decIndex = 1;
    loadData();
    chart.draw(data, options);
  });
  document.getElementById("60s").addEventListener("click", function(){
    decIndex = 2;
    loadData();
    chart.draw(data, options);
  });
  document.getElementById("70s").addEventListener("click", function(){
    decIndex = 3;
    loadData();
    chart.draw(data, options);
  });
  document.getElementById("80s").addEventListener("click", function(){
    decIndex = 4;
    loadData();
    chart.draw(data, options);
  });
}

//---------------------------------------------------------------------------------------------------------
/*function createCustomHTMLContent(imageURL, description) {
return '<div style="padding:5px 5px 5px 5px;">' +
'<img src="' + imageURL + '" style="width:100px;height:70px"><br/>' + description;
}*/

function createCustomHTMLContent(artist1, artist2) {
  return '<div style="margin-right:-10px; font-size:11px;">' + 'Artist Highlights' + '<br>' + '<ul>' + '<li>' + artist1 + '</li>' + '<li>' + artist2 + '</li>' + '</ul>';
}

function createCustomHTMLContent2(artist1) {
  return '<div style="margin-right:-10px; font-size:11px;">' + 'Artist Highlight' + '<br>' + '<ul>' + '<li>' + artist1 + '</li>' + '</ul>';
}

//---------------------------------------------------------------------------------------------------------

function setWorld() {
	options.region = 'world';
	options.resolution = 'countries';
  data = worldData;
}
//---------------------------------------------------------------------------------------------------------
function setUS() {
	options.region = 'US';
	options.resolution = 'provinces';
        //options.displayMode = 'provinces';
        data = usData;
      }
//---------------------------------------------------------------------------------------------------------
function setUK() {
	options.region = 'GB';
	options.resolution = 'provinces';
	data = ukData;
}
//---------------------------------------------------------------------------------------------------------
function setAU() {
	options.region = 'AU';
	options.resolution = 'provinces';
	data = auData;
}

//---------------------------------------------------------------------------------------------------------
function setCA() {
	options.region = 'CA';
	options.resolution = 'provinces';
	data = caData;
}
//---------------------------------------------------------------------------------------------------------

function initVisualization() {  
	chart = new google.visualization.GeoChart(document.getElementById('visualization'));
	google.visualization.events.addListener(chart, 'select', selectHandler);
	chart.draw(data, options);

      // The select handler. Call the chart's getSelection() method
      function selectHandler() {
      	/*Returns an array of the selected chart entities. Selectable entities are regions with an assigned value. For this chart, only one entity can be selected at any given moment.*/
      	var selection = chart.getSelection();

      	if (selection.length == 1 & options.region == 'world') {
      		var selectedRow = selection[0].row;
          //getValue(rowIndex, columnIndex)
          var selectedRegion = data.getValue(selectedRow, 0);

          if (selectedRow == 0) {
            setUS();
            chart.draw(data, options);
          }
          else if (selectedRow == 1) {
            setUK();
            chart.draw(data, options);
          }
          else if (selectedRow == 2) {
            setAU();
            chart.draw(data, options);
          }
          else {
            setCA();
            chart.draw(data, options);
          }
        }
      }
    }

 /*document.getElementById("clickme").addEventListener("click", function(){
  alert("click");
});*/