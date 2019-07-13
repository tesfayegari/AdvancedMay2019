import * as React from 'react';
// import styles from './ChartsReact.module.scss';
import { IChartsReactProps, ChartsReactState, IListItem } from './IChartsReactProps';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class ChartsReact extends React.Component<IChartsReactProps, ChartsReactState> {
  constructor(props: IChartsReactProps) {
    super(props);
    this.state={data: {}, listName: this.props.listName};
    console.log('Constructor');
  }
  
  public componentDidMount() {
    var titles:string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    var values:number[] = [12, 19, 13, 5, 2, 3];
    var borders =[
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ];
    var bgColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'];
    const sampleData = {
      labels: titles,
      datasets: [{
        label: 'Monthly Budget',
        data: values,
        backgroundColor: bgColors,
        borderColor: borders,
        borderWidth: 1
      }]
    };

    const sampleData2={
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets:[
        {
          label:'Population',
          data:[617594,181045,153060,106519,105162,95072],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    };
    this.setState({listName: this.props.listName});
    //We gonna implement reading from list
    this.updateData();
    console.log('Component did mount');
    this.setState({data: sampleData2});
  }

  public componentWillReceiveProps(nextProps){
    console.log('Checking this', nextProps, this.props);
    if(this.props.listName !== nextProps.listName){
      this.updateData(nextProps.listName );
    }
  }

  //Update data
  private updateData(listName: string=this.props.listName){
    this.readItems(listName).then(items => {
      console.log("SharePoint Items",items);
      let spTitles = [];
      let spAmounts = [];
      let spBgColors =[];
      let spBorderColors = [];
      items.value.forEach(item => {
        spTitles.push(item.Title);
        spAmounts.push(item.Amount);
        var r = Math.ceil(Math.random()*255), g=Math.ceil(Math.random()*255),b=Math.ceil(Math.random()*255);
        spBgColors.push(`rgba(${r}, ${g}, ${b} ,0.5)`);
        spBorderColors.push(`rgba(${r}, ${g}, ${b})`);
      });
      var spData ={
        labels: spTitles,
        datasets: [{
          label: 'Monthly Budget',
          data: spAmounts,
          backgroundColor: spBgColors,
          borderColor: spBorderColors,
          borderWidth: 1
        }]
      };
      console.log(spData);
      this.setState({data: spData});

    });
  }
  // Read operation
  private readItems(listGuid: string) {    
    return this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists(guid'${listGuid}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
        return response.json();
      });      
  }
  // end of read operation
  
  public render(): React.ReactElement<IChartsReactProps> {   
    const d = this.state.data; 
    console.log('Render loading...',d);
    return (
      <div>
        <h2>{this.props.description}</h2>
        <PieChart data={d}/>
        <BarChart data={d}/>
      </div>
    );
  }
}
