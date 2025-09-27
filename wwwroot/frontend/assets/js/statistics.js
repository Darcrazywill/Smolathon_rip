google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
    ['Year', 'Кол-во нарушений', 'Кол-во постановлений'],
    ['2024', 89352686, 82710918],
    ['2025', 93299221, 86209867]
]);

var options = {
    chart: {
    title: '',
    subtitle: ' ',
    }
};

var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

chart.draw(data, google.charts.Bar.convertOptions(options));
}