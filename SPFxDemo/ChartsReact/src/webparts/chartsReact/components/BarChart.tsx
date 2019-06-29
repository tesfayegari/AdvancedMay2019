import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartProps } from './IChartsReactProps';
export default class BarChart extends React.Component<ChartProps,{}> {

  public render() { 
    return (
        <div>
          <Bar data={this.props.data} />
        </div>);
  }
}
