google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
    ['Месяц', 'Нарушения', 'Постановления'],
    ['Январь', 1000, 400],
    ['Февраль', 1170, 460],
    ['Март', 660, 1120],
    ['Апрель', 1030, 540],
    ['Май', 900, 852],
    ['Июнь', 778, 340],
    ['Июль', 1429, 859],
    ['Август', 673, 649]
]);

var options = {
    width: 1000,
    height: 500,
    title: 'Статистика штрафов за 2025',
    hAxis: {title: 'Месяц',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
};

var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
chart.draw(data, options);
}