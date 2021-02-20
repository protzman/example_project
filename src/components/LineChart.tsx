import { ReactElement, useLayoutEffect, useRef } from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DailyAcquisition, NormalizedAcquisition } from '../types';

export interface AmTimelineChartProps {
  data: DailyAcquisition[] | NormalizedAcquisition[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      color: theme.palette.text.primary,
    },
  })
);

export default function LineChart({
  data,
}: AmTimelineChartProps): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<am4charts.XYChart>();
  const classes = useStyles();

  useLayoutEffect(() => {
    if (!divRef.current) {
      return;
    }

    chartRef.current = am4core.create(divRef.current, am4charts.XYChart);
    chartRef.current.data = data;

    const dateAxis = new am4charts.DateAxis();
    const valueAxis = new am4charts.ValueAxis();

    chartRef.current.xAxes.push(dateAxis);
    chartRef.current.yAxes.push(valueAxis);

    dateAxis.renderer.labels.template.fill = am4core.color('#fff');
    valueAxis.renderer.labels.template.fill = am4core.color('#fff');

    const lineSeries = chartRef.current.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = 'sites';
    lineSeries.dataFields.dateX = 'date';
    lineSeries.name = '';
    lineSeries.tensionX = 0.9;
    lineSeries.tensionY = 0.6;
    lineSeries.strokeWidth = 3;
    lineSeries.stroke = am4core.color('#71b17f');
    lineSeries.fill = am4core.color('#71b17f');
    lineSeries.fillOpacity = 0.2;
    lineSeries.tooltipText = '{dateX}: [b]{valueY}[/]';
    chartRef.current.cursor = new am4charts.XYCursor();
    chartRef.current.cursor.snapToSeries = lineSeries;
    chartRef.current.cursor.xAxis = dateAxis;

    chartRef.current.zoomOutButton.background.fill = am4core.color('#71b17f');

    chartRef.current.events.on('hit', (e) => {
      console.log(lineSeries.tooltipDataItem.dataContext);
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, [data]);

  return <div ref={divRef} className={classes.root} />;
}
