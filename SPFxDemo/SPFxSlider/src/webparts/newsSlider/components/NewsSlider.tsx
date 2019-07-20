import * as React from "react";
//require('./custom.css')
import { INewsSliderProps } from "./INewsSliderProps";

const Slider = props => {
  return (
    <div id="demo" className="carousel slide" data-ride="carousel">
      <SliderIndicators items={props.items} />
      <SliderInner>{props.children}</SliderInner>
      <SliderPrevNext />
    </div>
  );
};
const SliderInner = props => {
  return <div className="carousel-inner">{props.children}</div>;
};
const SliderItem = props => {
  return (
    <div className={`carousel-item   ${props.active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};
const SliderCaption = props => {
  return <div className="carousel-caption">{props.children}</div>;
};
const SliderIndicators = props => {
  const items = props.items.map(index =>
    <li key={index.toString()}
      data-target="#demo"
      data-slide-to={index}
      className={index == 0 ? "active" : ""}
    ></li>
  );
  return (
    <>
      <ul className="carousel-indicators">{items}</ul>
    </>
  );
};
const SliderPrevNext = props => {
  return (
    <>
      <a className="carousel-control-prev" href="#demo" data-slide="prev">
        <span className="carousel-control-prev-icon" />
      </a>
      <a className="carousel-control-next" href="#demo" data-slide="next">
        <span className="carousel-control-next-icon" />
      </a>
    </>
  );
};


export default class NewsSlider extends React.Component<INewsSliderProps, {}> {
  public render(): React.ReactElement<INewsSliderProps> {
    const items = this.props.items.map((item,index) =>
      <SliderItem key={item.ID} active={index === 0 ? true: false}>
        <img
              className="d-block w-100"
              src={item.imageUrl}
              alt={item.Title}
            />
            <SliderCaption>
              <h3>{item.Title}</h3>
              <p>{item.Description}</p>
              <a type="button" href={item.ulr} className="btn btn-primary">
                {item.LinkLabel}{(item.LinkLabel)?'...': ''}
              </a>
            </SliderCaption>
      </SliderItem>
    );
    console.log("ITems are", items);
    return (
      <>        
        <Slider items={this.props.items}>
            {items}
        </Slider>
        </>
    );
  }
}
