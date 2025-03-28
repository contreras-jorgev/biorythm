let bioSeries = [];
const SINE_STROKE_WIDTH = 5;

const createBiorhythm = (birthday) => {
    // Calculate the Biorhythm series (data points) for the Chart
    let today = new Date();
    const height = 10
    
    bioSeries[0] = []; // Data series for Intellectual
    bioSeries[1] = []; // Data series for Physical
    bioSeries[2] = []; // Data series for Emotional
    
    for (let i = -7; i <= 7; i++) {
        let target = new Date(today.getTime());
        target.setDate(target.getDate() + i);
        let bioValues = getBiorhythm(birthday, target, height / 2);
    
        bioSeries[0].push({ targetDate: target, bioValue: bioValues.intellectual });
        bioSeries[1].push({ targetDate: target, bioValue: bioValues.physical });
        bioSeries[2].push({ targetDate: target, bioValue: bioValues.emotional });
    }
    
    const CHART_ID = 'bio-chart';
    const chartEl = document.getElementById(CHART_ID);
    
    if ( chartEl ) {
        // Create chart instance
        const chart = am4core.create(CHART_ID, am4charts.XYChart);
        am4core.options.autoDispose = true;
        
        // Create axes
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        dateAxis.dataFields.category = 'targetDate';
        dateAxis.dateFormat = 'MMM';
    
        valueAxis.dataFields.valueY = 'date';
        valueAxis.title.text = 'Bio values';
    
        // Disable labels on the value axis
        valueAxis.renderer.labels.template.disabled = true;
        
        // Add extra space at the top and bottom of the value axis
        valueAxis.extraMin = 0.1; // 10% extra space at the bottom
        valueAxis.extraMax = 0.1; // 10% extra space at the top
        
        const addSeries = (color, dataField, bioValueType) => {
            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = 'targetDate';
            series.dataFields.valueY = 'bioValue';

            series.data = dataField;
            // series.tensionX = 1;
            series.stroke = am4core.color(color);
            series.strokeWidth = SINE_STROKE_WIDTH;
    
            // Add bullet
            const bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.radius = 5;
            bullet.circle.fill = am4core.color(color);
    
            // Configure bullet to only appear on today's date
            bullet.adapter.add("hidden", function(hidden, target) {
                return target.dataItem.dataContext.targetDate.getTime() !== today.getTime();
            });
    
            // Add tooltip to bullet
            bullet.tooltipText = `Today's ${bioValueType} value: {bioValue}`;
            // bullet.tooltip.pointerOrientation = "vertical";
        };
        
        addSeries('rgb(255,255,0)', bioSeries[0], 'Intellectual'); // Yellow
        addSeries('rgb(255,0,0)', bioSeries[1], 'Physical'); // Red
        addSeries('rgb(0,0,255)', bioSeries[2], 'Emotional'); // Blue

        // If there is an Age output field, compute Age and set it.
        let ageEl = myform.elements.age;
        if (ageEl.parentElement) {
            ageEl.value = Math.floor((today - birthday) / (1000 * 60 * 60 * 24 * 365.25)); 
            ageEl.parentElement.style.display = 'block';
        }
    }
}

const getBiorhythm = (birthday, target, unit = 5) => {
    const diff = target.getTime() - birthday.getTime();
    const days = diff/(1000*60*60*24);
    const physical = Math.sin(2 * Math.PI * days / 23)*unit;
    const emotional = Math.sin(2 * Math.PI * days / 28)*unit;
    const intellectual = Math.sin(2 * Math.PI * days / 33)*unit;
    return {
        physical,
        emotional,
        intellectual
    }
};
