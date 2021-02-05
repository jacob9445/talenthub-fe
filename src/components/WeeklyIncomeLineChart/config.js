export const getChartConfig = (data, theme) => {
  return {
    exporting: { enabled: false },
    credits: { enabled: false },
    chart: {
      type: 'line',
      height: 300
      // "style": {
      //   "fontFamily": self.get_font_family()
      // },
      // "scrollablePlotArea": {
      //   "scrollPositionX": 1
      // }
    },
    title: { text: '' },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      // "type": "category",
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: '',
      gridLineWidth: 0,
      tickLength: 5,
      tickWidth: 1,
      tickPosition: 'outside',
      // "labels": {
      //   "align": "right",
      //   "x":-10,
      //   "y":5
      // },
      lineWidth: 1
    },
    tooltip: {
      crosshairs: [true],
      pointFormat: '$ {point.y:.2f}'
    },
    plotOptions: {
      line: {
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        marker: {
          enabled: false
        }
      }
    },
    colors: [theme.palette.primary.main],
    series: [
      {
        name: 'Weekly Income',
        // "label": { "enabled": false },
        data: data
      }
    ]
  }
}
