import * as React from 'react';
import FormType, { IListItem } from "./FormType";
import { FaEdit } from 'react-icons/FA';

interface IItemFormState {
  Title: string;
  Photo: string;
  JobTitle: string;
  Description: string;
  Until: string;
  readOnly: boolean;
  formType?: FormType;
}
interface IItemFormProps {
  formType: FormType;
  Item?: IListItem;
  handleSubmit: (data: IListItem)=>void;
}

export default class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      Photo: '',
      Description: '',
      JobTitle: '',
      Until: '',
      readOnly: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount(){
    this.setState({
      readOnly: this.props.formType === FormType.Dispplay,
      formType: this.props.formType
    });
    
  }

  private handleChange(e){
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value} as IItemFormState);
  }

  private handleEdit(e) {
    e.preventDefault();
    this.setState({readOnly: false, formType: FormType.Edit});
  }
  private handleSubmit() {
    console.log(JSON.stringify(this.state));
    this.props.handleSubmit(this.state as IListItem);
  }

  public render() {
    const formType = this.state.formType;
    let formTitle = '';
    switch(formType){
      case FormType.Dispplay: formTitle = 'Display Form'; break;
      case FormType.Edit : formTitle = 'Edit Form'; break;
      case FormType.New : formTitle = 'New Form'; break;
    }
    return (
      <>
        <div className="container">
          <h2>{formTitle}</h2>
          {formType === FormType.Dispplay &&<button type="button" className="btn btn-primary" onClick={this.handleEdit}><FaEdit /></button>}
          <form>
            <div className="form-group">
              <label htmlFor="Title">Full Name:</label>
              <input type="text" className="form-control"  placeholder="Full Name" 
                name="Title" value={this.state.Title} onChange={this.handleChange} readOnly={this.state.readOnly}/>
            </div>
            <div className="form-group">
              <label htmlFor="Photo">Photo Url:</label>
              <input type="text" className="form-control" placeholder="Photo URL" 
                name="Photo" value={this.state.Photo} onChange={this.handleChange} readOnly={this.state.readOnly}/>
            </div>
            <div className="form-group">
              <label htmlFor="JobTitle">Job Title:</label>
              <input type="text" className="form-control" placeholder="Job Title" 
                name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange} readOnly={this.state.readOnly}/>
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description:</label>
              <textarea  className="form-control" placeholder="Description" 
                name="Description" value={this.state.Description} onChange={this.handleChange} readOnly={this.state.readOnly}/>
            </div>
            <div className="form-group">
              <label htmlFor="Until">Until:</label>
              <input type="date"  className="form-control" placeholder="Until" 
                name="Until" value={this.state.Until} onChange={this.handleChange} readOnly={this.state.readOnly}/>
            </div>            
            </form>
            {formType === FormType.New && <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>}
            {formType === FormType.Edit && <button type="button" className="btn btn-primary">Update</button>}
            <button type="button" className="btn btn-secondary">Cancel</button>
            
          
        </div>
      </>
    );
  }
}
