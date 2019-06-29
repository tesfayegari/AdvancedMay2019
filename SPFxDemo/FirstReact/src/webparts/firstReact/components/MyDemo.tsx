import * as React from 'react';

export interface MyDemoProps{
  name: string;
  anotherName: string;
}

export default class MyDemo extends React.Component<MyDemoProps,{}>{
  private testData = 'Tesfaye Gari';
  public render(){
    return <h2> Hello {this.props.name} {this.testData}</h2>;
  }
}