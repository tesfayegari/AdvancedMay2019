import * as React from 'react';
import { INewsSliderProps } from './INewsSliderProps';


export default class NewsSlider extends React.Component<INewsSliderProps, {}> {
  public render(): React.ReactElement<INewsSliderProps> {
    return (
      <div className="alert alert-success alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> This alert box could indicate a successful or positive action.
    </div>
    );
  }
}
