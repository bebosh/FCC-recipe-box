import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class RecipeBox extends Component {
    constructor(props) {
        super(props);
          this.state = {
            show: false

          }
        }

        onExpand=()=> {
          this.setState({
           show: !this.state.show
           });
        }

        handleDelete=()=> {
            this.props.onDelete(this.props.item);
        }

        handleEdit=()=> { 
          this.props.onEdit(this.props.item);
        }

            render(){
                return(
                  <div>
                      <button className='item-name' onClick={this.onExpand} > {this.props.item.title} </button>
                        <div style={this.state.show ? {} : { display: 'none' }}>
                            <div className='edit_delete_save'>
                              <div className='ingredients'>
                                <p className='main-title'> Ingredients: <br /> {(this.props.item.ingredients.join(", "))}</p>
                              </div>
                            </div>
                          <button className="operator" onClick={this.handleEdit} > Edit  </button>
                          <button className='operator' onClick={this.handleDelete} > Delete </button>
                        </div>
                  </div>
                );
            }
}

export default RecipeBox
