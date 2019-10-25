import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import './chart.css'

am4core.useTheme(am4themes_animated);

export default function Chart( {prices} ) {
  var chart;

  useEffect(() => {
    if (prices.stock_prices) {
      chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.preloader.disabled = true;
      chart.padding(0, 15, 0, 15);

      let data = [];
      for (let i = 0; i < prices.stock_prices.length; i++) {
        // for some reason date must be incremented by 1
        let date = new Date(prices.stock_prices[i].date)
        date = date.setDate(date.getDate() + 1)

        data.push({
          "Adj Close": (prices.stock_prices[i].adj_close).toString(),
          "Close": prices.stock_prices[i].close,
          "Date": date,
          "High": (prices.stock_prices[i].high).toString(),
          "Low": (prices.stock_prices[i].low).toString(),
          "Open": prices.stock_prices[i].open, 
          "Volume": prices.stock_prices[i].volume,
        });
      }

      chart.data = data;

      chart.leftAxesContainer.layout = "vertical";

      // uncomment this line if you want to change order of axes
      //chart.bottomAxesContainer.reverseOrder = true;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.ticks.template.length = 8;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
      dateAxis.renderer.minLabelPosition = 0.01;
      dateAxis.renderer.maxLabelPosition = 0.99;
      dateAxis.keepSelection = true;
      dateAxis.minHeight = 30;

      dateAxis.groupData = true;
      dateAxis.minZoomCount = 5;

      // these two lines makes the axis to be initially zoomed-in
      // dateAxis.start = 0.7;
      // dateAxis.keepSelection = true;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.zIndex = 1;
      valueAxis.renderer.baseGrid.disabled = true;
      // height of axis
      valueAxis.height = am4core.percent(65);

      valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
      valueAxis.renderer.gridContainer.background.fillOpacity = 0.05; valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.verticalCenter = "bottom";
      valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

      //valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.fontSize = "0.8em"

      var series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.dateX = "Date";
      series.dataFields.openValueY = "Open";
      series.dataFields.valueY = "Close";
      series.dataFields.lowValueY = "Low";
      series.dataFields.highValueY = "High";
      series.clustered = false;
      series.tooltipText = "open: {openValueY.value}\nlow: {lowValueY.value}\nhigh: {highValueY.value}\nclose: {valueY.value}";
      series.name = "MSFT";
      series.defaultState.transitionDuration = 0;

      var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;
      // height of axis
      valueAxis2.height = am4core.percent(35);
      valueAxis2.zIndex = 3
      // this makes gap between panels
      valueAxis2.marginTop = 30;
      valueAxis2.renderer.baseGrid.disabled = true;
      valueAxis2.renderer.inside = true;
      valueAxis2.renderer.labels.template.verticalCenter = "bottom";
      valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
      //valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis2.renderer.fontSize = "0.8em"

      valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
      valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

      var series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.dateX = "Date";
      series2.clustered = false;
      series2.dataFields.valueY = "Volume";
      series2.yAxis = valueAxis2;
      series2.tooltipText = "{valueY.value}";
      series2.name = "Series 2";
      // volume should be summed
      series2.groupFields.valueY = "sum";
      series2.defaultState.transitionDuration = 0;

      chart.cursor = new am4charts.XYCursor();

      var scrollbarX = new am4charts.XYChartScrollbar();

      var sbSeries = chart.series.push(new am4charts.LineSeries());
      sbSeries.dataFields.valueY = "Close";
      sbSeries.dataFields.dateX = "Date";
      scrollbarX.series.push(sbSeries);
      sbSeries.disabled = true;
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
      scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;
    }
  }, [prices])

  return (
    <div className='chartContainer'>
      <div className='chartdiv'></div>
    </div>
  );
}
