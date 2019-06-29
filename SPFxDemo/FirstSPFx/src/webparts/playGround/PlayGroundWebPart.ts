import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import styles from './PlayGroundWebPart.module.scss';

export interface IPlayGroundWebPartProps {
  description: string;
  firstName: string;
  lastName: string;
  likeSPFx: boolean;
  photo: string;
}

export default class PlayGroundWebPart extends BaseClientSideWebPart<IPlayGroundWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.playGround}">
        <h2 style="text-align:center">${this.properties.firstName}'s User Profile Card</h2>
        <div class="${styles.card}">
          <img src="${this.properties.photo}" alt="John" style="width:100%">
          <h1>${this.properties.firstName} ${this.properties.lastName}</h1>
          <p class="${styles.title}">CEO & Founder, Example</p>
          <p>Harvard University</p>
          <div style="margin: 24px 0;">
            <a href="#"><i class="fa fa-dribbble"></i></a> 
            <a href="#"><i class="fa fa-twitter"></i></a>  
            <a href="#"><i class="fa fa-linkedin"></i></a>  
            <a href="#"><i class="fa fa-facebook"></i></a> 
          </div>
          <p><button>Contact</button></p>
        </div>      
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'MTM Properties'
          },
          groups: [
            {
              groupName: 'Personal Info',
              groupFields: [
                PropertyPaneTextField('firstName', {
                  label: 'First Name'
                }),
                PropertyPaneTextField('lastName', {
                  label: 'Last Name'
                }),
                PropertyPaneTextField('photo', {
                  label: 'Photo Url'
                }),
                PropertyPaneTextField('description', {
                  label: 'Your Description',
                  multiline: true
                }),
                PropertyPaneToggle('likeSPFx',{
                  label:'Do you Like SPFX?',
                  offText: 'No',
                  onText: 'Yes'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
