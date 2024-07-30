let bioSeries = [];

const createBiorythm = (birthdate) => {
    // Calculate the Biorythm series (data points) for the Chart
    let today = new Date();
    const height = 10
    
    bioSeries[0] = []; // Data series for Intellectual
    bioSeries[1] = []; // Data series for Physical
    bioSeries[2] = []; // Data series for Emotional
    
    for (let i = 0 ; i < 60 ; i++) {
        let target = new Date(today.getTime());
        target.setDate(target.getDate() + i - 20);
        let bioValues = getBiorythm(birthdate, target, height / 2);
    
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
                // chart.paddingRight = 20;

        // Create axes
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        dateAxis.dataFields.category = 'targetDate';
        dateAxis.dateFormat = 'MMM';   // TODO: find out date format Jul 3
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;

        valueAxis.dataFields.valueY = 'date';
        valueAxis.title.text = 'Bio values';

        const intellectualSeries = chart.series.push(new am4charts.LineSeries());
        intellectualSeries.dataFields.dateX = 'targetDate';
        intellectualSeries.dataFields.valueY = 'bioValue';
        intellectualSeries.tensionX = 1;
        intellectualSeries.stroke = am4core.color('rgb(255,255,0)'); // Yellow:  rgb(Red, Green, Blue)

        const physicalSeries = chart.series.push(new am4charts.LineSeries());
        physicalSeries.dataFields.dateX = 'targetDate';
        physicalSeries.dataFields.valueY = 'bioValue';
        physicalSeries.tensionX = 1;
        physicalSeries.stroke = am4core.color('rgb(255,0,0)'); // Red 

        const emotionalSeries = chart.series.push(new am4charts.LineSeries());
        emotionalSeries.dataFields.dateX = 'targetDate';
        emotionalSeries.dataFields.valueY = 'bioValue';
        emotionalSeries.tensionX = 1;
        emotionalSeries.stroke = am4core.color('rgb(0,0,255)'); // Blue
        

        intellectualSeries.data = bioSeries[0];
        physicalSeries.data = bioSeries[1];
        emotionalSeries.data = bioSeries[2];
    }
}

const getBiorythm = (birthdate, target, unit = 5) => {
    const diff = target.getTime() - birthdate.getTime();
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
