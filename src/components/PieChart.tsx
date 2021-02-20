import { ReactElement, useLayoutEffect, useRef } from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NormalizedAcquisition } from '../types/acquisition';

export interface AmPieChartProps {
  data: NormalizedAcquisition[];
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

export default function PieChart({ data }: AmPieChartProps): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<am4charts.PieChart>();
  const classes = useStyles();

  useLayoutEffect(() => {
    if (!divRef.current) {
      return;
    }

    chartRef.current = am4core.create(divRef.current, am4charts.PieChart);
    chartRef.current.data = data;

    const pieSeries = chartRef.current.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'sites';
    pieSeries.dataFields.category = 'date';
    pieSeries.colors.list = [am4core.color('#71b17f')];
    pieSeries.strokeWidth = 3;
    pieSeries.fillOpacity = 0.2;

    pieSeries.properties.innerRadius = 60;
    pieSeries.labels.template.disabled = true;

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, [data]);

  return <div ref={divRef} className={classes.root} />;
}
