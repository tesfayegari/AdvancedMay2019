import * as React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
//import {  } from 'react-chartjs-2';
import { ChartProps } from './IChartsReactProps';


export default class PieChart extends React.Component<ChartProps,{}> {

  public componentDidMount(){

  }
  public render() {   
    return (
      <div>
        <Doughnut data={this.props.data} />
        <Pie data={this.props.data} />
      </div>
    );
  }
}
