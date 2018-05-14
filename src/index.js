import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBox from './components/recipebox';
var updateTodo;
var update = localStorage.getItem('data');
var store=[];
var data= [
{
  id:1,
  title: 'Steak',
  ingredients: ['a big 2 inches high beef steak']
},
{
  id:2,
  title: 'French toast',
  ingredients: ['Squared bread', 'cheese', 'Butter']
},
{
  id:3,
  title: 'onion soup',
  ingredients: ['onions', 'butter']
}
];

if(update == null){
 localStorage.setItem('data', JSON.stringify(data));
};

store = JSON.parse(localStorage.getItem('data'));


class App extends Component {

    constructor(props) {
        super(props);
          this.state = {
            title:'',
            ingredients:[],
            modify: false,
            store:[]
        }
    }

   componentWillMount(){
    this.setState({
      store: store
    })
   };
    render(){

      const list = this.state.store.map( (item, i) => {
              return (
                <li className='add'>
                  <RecipeBox item={item} key={i} onDelete={this.onDelete} onEdit={this.onEdit} onSubmit={this.onSubmit} />
                </li>
                );
              });
              
              return(
                <div className='container'>
                  <h1 className='main-title'> RECIPE BOX </h1>
                  <div className='add'>
                    <button className='btn btn-secondary' onClick={this.onAdd} > ADD RECIPE </button>
                  </div>
                  <div className='item'>
                    {list}
                    <div style={this.state.modify ? {} : { display: 'none' }}>
                            <form id='search' onSubmit={this.onSubmit}>
                                <label>TITLE:</label>
                                  <input type='text' value={this.state.title} onChange={this.handleChangeTitle}/> <br />
                                <label>INGREDIENTS:</label>
                                  <input className='ingredients' type='text' value={this.state.ingredients} onChange={this.handleChangeIngredients} /> <br />
                                  <input type='submit' value='Submit' />
                            </form>
                    </div>
                  </div>
                </div>
              );
    }

    onDelete = (item) => {
            //console.log(localStorage.getItem('update'));
            let updateTodo = this.state.store.filter((val, index) => {
                return item !== val;
                });
                this.setState({
                    store: updateTodo
                });
            localStorage.setItem('data', JSON.stringify(updateTodo));
        }   

    onEdit=(item)=> {   
      updateTodo = (item.id)-1; 
              this.setState({
                modify: !this.state.modify,
              });
            }

    onAdd=()=> {
      let count = ((this.state.store).length)
          console.log(count);
          this.setState({
            store: (this.state.store).concat({ id: count, title:'new', ingredients:[]})
          });
          console.log('add' + this.state.store);
        }

    handleChangeTitle=(event)=> {
          this.setState({title: event.target.value});
        }

    handleChangeIngredients=(event)=> {
          this.setState({ingredients: event.target.value});
        }

    onSubmit=(e)=>{
      console.log ('updateTodo' + updateTodo);
         let newId = this.state.store.slice();   
             newId[updateTodo] = {
                  id: updateTodo,
                  title:  this.state.title,
                  ingredients: (this.state.ingredients).split()
                  }
        this.setState({
              store: newId       
           });
           localStorage.setItem('data', JSON.stringify(newId));
           console.log(newId);
           console.log(localStorage);
           e.preventDefault();
          };
    };








ReactDOM.render(<App />, document.getElementById('root'));
