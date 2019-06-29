import * as React from 'react';
import styles from './FirstReact.module.scss';
import { IFirstReactProps } from './IFirstReactProps';
import MyDemo  from "./MyDemo";
import { escape } from '@microsoft/sp-lodash-subset';

export default class FirstReact extends React.Component<IFirstReactProps, {}> {
  public render(): React.ReactElement<IFirstReactProps> {
    return (
      <div className={ styles.firstReact }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              <MyDemo name='Test Araya' anotherName='Test'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
