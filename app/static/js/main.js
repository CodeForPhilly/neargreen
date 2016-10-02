$(function() {
	$("#btnClickMe").on("click", function() {
		alert("You've clicked me!");
	});


	$.ajax({
		url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Healthy_Corner_Stores/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson&token=",
		success: function(data) {
			console.log(data);
			debugger;
		},
		dataType: "json",
		async: false
	});
});