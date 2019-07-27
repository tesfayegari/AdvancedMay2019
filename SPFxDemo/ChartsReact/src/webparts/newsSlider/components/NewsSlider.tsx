import * as React from 'react';
import SweetAlert  from "sweetalert-react";
import { INewsSliderProps } from './INewsSliderProps';
require('./../../../../node_modules/sweetalert/dist/sweetalert.css');

interface IState{
  show: boolean;
}

export default class NewsSlider extends React.Component<INewsSliderProps, IState> {
   constructor(props: INewsSliderProps){
     super(props);
     this.state = {show: false};
   }
  
  public render(): React.ReactElement<INewsSliderProps> {    
    return (
      <div>
      <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        show={true}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false })}
      />
    </div>
    );
  }
}
