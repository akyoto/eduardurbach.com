function drawBasic() {
	if(!google)
		return;

	var data = google.visualization.arrayToDataTable([
		['Web server', 'Requests per second'],
		['Aero', 24500],
		['node.js (pure)', 17300],
		['Koa', 14700],
		['Express', 12200],
		['Restify', 10700],
	]);

	var options = {
		chartArea: {width: '70%', height: '80%'},
		titleTextStyle: {
			position: 'none'
		},
		backgroundColor: {
			fill: 'transparent'
		},
		hAxis: {
			minValue: 0,
			textStyle: {
				color: 'white',
				fontName: 'Lato',
				fontSize: 15
			}
		},
		vAxis: {
			textStyle: {
				color: 'white',
				fontName: 'Lato',
				fontSize: 15
			}
		},
		legend: {position: 'none'},
		colors: ['rgb(161, 212, 230)']
	};

	var chart = new google.visualization.BarChart(document.getElementById('benchmark'));
	chart.draw(data, options);
}

google.load('visualization', '1', {packages: ['corechart', 'bar']});

document.addEventListener("DOMContentLoaded", function(event) {
	drawBasic();
});