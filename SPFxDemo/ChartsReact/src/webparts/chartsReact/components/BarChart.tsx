import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartProps } from './IChartsReactProps';
export default class BarChart extends React.Component<ChartProps,{}> {

  public render() { 
    const chartOptions = {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "Chart Title goes here"
      },
      scales:{yAxes:[{ticks:{beginAtZero:true}}]}
    };
    return (
        <div>
          <Bar data={this.props.data}
          options={chartOptions} />
        </div>);
  }
}
