import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartProps } from './IChartsReactProps';


export default class PieChart extends React.Component<ChartProps,{}> {

  public render() {   
    return (
      <div>
        <Doughnut data={this.props.data} />
      </div>
    );
  }
}
