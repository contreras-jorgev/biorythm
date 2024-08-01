let bioSeries = [];
const SINE_STROKE_WIDTH = 5;

const createBiorhythm = (birthday) => {
    // Calculate the Biorhythm series (data points) for the Chart
    let today = new Date();
    const height = 10
    
    bioSeries[0] = []; // Data series for Intellectual
    bioSeries[1] = []; // Data series for Physical
    bioSeries[2] = []; // Data series for Emotional
    
    for (let i = 0 ; i < 60 ; i++) {
        let target = new Date(today.getTime());
        target.setDate(target.getDate() + i - 20);
        let bioValues = getBiorhythm(birthday, target, height / 2);
    
        bioSeries[0].push( { targetDate: target, bioValue: bioValues.intellectual} );
        bioSeries[1].push( { targetDate: target, bioValue: bioValues.physical} );
        bioSeries[2].push( { targetDate: target, bioValue: bioValues.emotional} );
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

        const intellectualSeries = chart.series.push(new am4charts.LineSeries());
        intellectualSeries.dataFields.dateX = 'targetDate';
        intellectualSeries.dataFields.valueY = 'bioValue';
        intellectualSeries.tensionX = 1;
        intellectualSeries.stroke = am4core.color('rgb(255,255,0)'); // Yellow:  rgb(Red, Green, Blue)
        intellectualSeries.strokeWidth = SINE_STROKE_WIDTH;

        const physicalSeries = chart.series.push(new am4charts.LineSeries());
        physicalSeries.dataFields.dateX = 'targetDate';
        physicalSeries.dataFields.valueY = 'bioValue';
        physicalSeries.tensionX = 1;
        physicalSeries.stroke = am4core.color('rgb(255,0,0)'); // Red 
        physicalSeries.strokeWidth = SINE_STROKE_WIDTH;

        const emotionalSeries = chart.series.push(new am4charts.LineSeries());
        emotionalSeries.dataFields.dateX = 'targetDate';
        emotionalSeries.dataFields.valueY = 'bioValue';
        emotionalSeries.tensionX = 1;
        emotionalSeries.stroke = am4core.color('rgb(0,0,255)'); // Blue
        emotionalSeries.strokeWidth = SINE_STROKE_WIDTH;      

        intellectualSeries.data = bioSeries[0];
        physicalSeries.data = bioSeries[1];
        emotionalSeries.data = bioSeries[2];

        let ageEl = myform.elements.age;
        if (ageEl.parentElement) {
            ageEl.parentElement.style.display = 'block';
        }
        // compute the age
        ageEl.value = Math.floor((today - birthday) / (1000 * 60 * 60 * 24 * 365.25)); 
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
