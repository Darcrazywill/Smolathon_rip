// Второй график

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Месяц', 'Количество нарушений'],
        ['Январь',  581011],
        ['Февраль',  772429],
        ['Март',  762437],
        ['Апрель',  803832],
        ['Май',  632703],
        ['Июнь',  662543]
    ]);

    var options = {
        width: 800,
        height: 500,
        title: 'Статистика нарушений за первое полугодие 2024 года',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}