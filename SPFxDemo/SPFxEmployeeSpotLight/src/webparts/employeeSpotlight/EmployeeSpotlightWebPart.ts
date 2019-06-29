import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';

require('./EmployeeSpotlightWebPart.module.scss');
import * as strings from 'EmployeeSpotlightWebPartStrings';

export interface IEmployeeSpotlightWebPartProps {
  description: string;
  employeeType: string;
}

export default class EmployeeSpotlightWebPart extends BaseClientSideWebPart<IEmployeeSpotlightWebPartProps> {

  public render(): void {
    console.log('Logging '+ this.description);
    this.domElement.innerHTML = `
    <div class="container">
      <h2>Card Image</h2>
      <div class="row">
        <div class="col">
          <div class="card">
            <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image" style="width:100%">
            <div class="card-body">
              <h4 class="card-title">${this.properties.description} (${this.properties.employeeType})</h4>
              <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
              <a href="#" class="btn btn-primary">See Profile</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" >
            <div class="card-body">
              <h4 class="card-title">${this.properties.description} (${this.properties.employeeType})</h4>
              <p class="card-text">Some example text some example text. Jane Doe is an architect and engineer</p>
              <a href="#" class="btn btn-primary">See Profile</a>
            </div>
            <img class="card-img-bottom" src="https://www.w3schools.com/bootstrap4/img_avatar6.png" alt="Card image" style="width:100%">
          </div>
        </div>
        </div>
      </div>
    </div>
      `;
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('employeeType',{
                  label: 'Employee Type',
                  options: [
                    {key: 'Pemanent', text: 'Permanent'},
                    {key: 'Temp', text: 'Temp'},
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
