import * as React from 'react';
// import styles from './ChartsReact.module.scss';
import { IChartsReactProps } from './IChartsReactProps';
import PieChart from "./PieChart";
import BarChart from "./BarChart";

interface ChartsReactState{
  data: any;
}

export default class ChartsReact extends React.Component<IChartsReactProps, ChartsReactState> {
  constructor(props: IChartsReactProps) {
    super(props);
    this.state={data: {}};
  }
  
  public componentDidMount() {
    const sampleData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 13, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
    //We gonna implement reading from list

    this.setState({data: sampleData});
  }
  
  public render(): React.ReactElement<IChartsReactProps> {   
    const d = this.state.data; 
    return (
      <div>
        <h2>{this.props.siteName} {this.props.description}</h2>
        <PieChart data={d}/>
        <BarChart data={d}/>
      </div>
    );
  }
}
