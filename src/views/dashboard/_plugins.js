import React from 'react'

const getSuitableY = (y, yArray = [], direction) => {
  let result = y;
  yArray.forEach((existedY) => {
    if (existedY - 14 < result && existedY + 14 > result) {
      if (direction === "right") {
        result = existedY + 14;
      } else {
        result = existedY - 14;
      }
    }
  });
  return result;
};

const _plugins = [
  {
    afterDraw: (chart) => {
      const ctx = chart.chart.ctx;
      ctx.save();
      ctx.font = "14px Poppins";
      const leftLabelCoordinates = [];
      const rightLabelCoordinates = [];
      const chartCenterPoint = {
        x:
          (chart.chartArea.right - chart.chartArea.left) / 2 +
          chart.chartArea.left,
        y:
          (chart.chartArea.bottom - chart.chartArea.top) / 2 +
          chart.chartArea.top
      };
      chart.config.data.labels.forEach((label, i) => {
        const meta = chart.getDatasetMeta(0);
        const arc = meta.data[i];
        const dataset = chart.config.data.datasets[0];

        // Prepare data to draw
        // important point 1
        const centerPoint = arc.getCenterPoint();
        const model = arc._model;
        let color = model.borderColor;
        let labelColor = model.borderColor;
        if (dataset.polyline && dataset.polyline.color) {
          color = dataset.polyline.color;
        }

        if (dataset.polyline && dataset.polyline.labelColor) {
          labelColor = dataset.polyline.labelColor;
        }

        const angle = Math.atan2(
          centerPoint.y - chartCenterPoint.y,
          centerPoint.x - chartCenterPoint.x
        );
        // important point 2, this point overlapsed with existed points
        // so we will reduce y by 14 if it's on the right
        // or add by 14 if it's on the left
        const point2X =
          chartCenterPoint.x + Math.cos(angle) * (model.outerRadius + 15);
        let point2Y =
          chartCenterPoint.y + Math.sin(angle) * (model.outerRadius + 15);

        let suitableY;
        if (point2X < chartCenterPoint.x) {
          // on the left
          suitableY = getSuitableY(point2Y, leftLabelCoordinates, "left");
        } else {
          // on the right

          suitableY = getSuitableY(point2Y, rightLabelCoordinates, "right");
        }

        point2Y = suitableY;

        let value = dataset.data[i];
        if (dataset.polyline && dataset.polyline.formatter) {
          value = dataset.polyline.formatter(value, dataset);
        }
        let edgePointX = point2X < chartCenterPoint.x ? 10 : chart.width - 10;

        if (point2X < chartCenterPoint.x) {
          leftLabelCoordinates.push(point2Y);
        } else {
          rightLabelCoordinates.push(point2Y);
        }
        //DRAW CODE
        // first line: connect between arc's center point and outside point
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(point2X, point2Y);
        ctx.stroke();
        // second line: connect between outside point and chart's edge
        ctx.beginPath();
        ctx.moveTo(point2X, point2Y);
        ctx.lineTo(edgePointX, point2Y);
        ctx.stroke();
        //fill custom label
        const labelAlignStyle =
          edgePointX < chartCenterPoint.x ? "left" : "right";
        const labelX = edgePointX;
        const labelY = point2Y;
        ctx.textAlign = labelAlignStyle;
        ctx.textBaseline = "bottom";

        ctx.fillStyle = labelColor;
        ctx.fillText(value, labelX, labelY);
      });
      ctx.restore();
    },
    // beforeInit: function(chart, options) {
    //   chart.legend.afterFit = function() {
    //     this.height += 10; 
    //   };
    // }
  }
];

export default _plugins