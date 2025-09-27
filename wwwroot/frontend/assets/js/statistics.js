// Первый график

google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Четверть', 'Количество выездов', 'Количество эвакуаций', 'Количество эвакуаторов', { role: 'annotation' } ],
    ['1', 36, 34, 9, ''],
    ['2', 32, 29, 11, ''],
    ['3', 28, 25, 8, ''],
    ['4', 33, 32, 10, '']
    ]);

    var options = {
    title: 'Статистика эвакуаций за август 2025',
    width: 1000,
    height: 400,
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '75%' },
    isStacked: true,
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}