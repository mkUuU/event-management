const data = [
    { name: 'Jan', events: 4, participants: 120, revenue: 1200 },
    { name: 'Feb', events: 3, participants: 90, revenue: 900 },
    { name: 'Mar', events: 5, participants: 150, revenue: 1500 },
    { name: 'Apr', events: 6, participants: 180, revenue: 1800 },
    { name: 'May', events: 8, participants: 240, revenue: 2400 },
    { name: 'Jun', events: 7, participants: 210, revenue: 2100 },
];

let chart;

function updateChart(metric) {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.name),
            datasets: [{
                label: metric.charAt(0).toUpperCase() + metric.slice(1),
                data: data.map(item => item[metric]),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('metricSelect').addEventListener('change', function(e) {
    updateChart(e.target.value);
});

// Initial chart render
updateChart('events');

