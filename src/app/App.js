import React , {Component} from 'react';
import {render} from 'react-dom';

class App extends Component{

	constructor(){

		super();
		this.state ={
			title:'',
			description:'',
			tasks: [],
			_id: ''

		};
		this.handleChange = this.handleChange.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	/*Esto arma la respuesta para mandar a la api, y asi se guarda lo que meti en los
	inputs*/
	addTask(e){
		if(this.state._id){

			fetch(`/api/tasks/${this.state._id}`,{

				method: 'PUT',
				body: JSON.stringify(this.state),
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}

			})
			.then(res => res.json)
			.then(data => {
				console.log(data);
				M.toast({html:'Tarea Actualizada'});
				this.setState({title:'', description:'', _id: ''});
				this.fetchTasks();

			})

		}else{

			fetch('/api/tasks',{
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.then(data => {console.log(data);M.toast({html: 'Tarea Guardada'});
		this.setState({title: '', description: ''});
		this.fetchTasks();
		})
		.catch(err => console.log(err));

		}


		e.preventDefault();

	}

	editTask(id){

		fetch(`/api/tasks/${id}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.setState({title: data.title,
				description: data.description,
				_id: data._id});
		})

	}


	//Con esto le decimos que siempre que arranque la app ejecute este metodo
	componentDidMount(){

		this.fetchTasks()

	};

	fetchTasks(){

		fetch('/api/tasks')
		.then(res => res.json())
		.then(data => {console.log(data);
		this.setState({tasks: data})})
}

	deleteTask(id){

		if(confirm('Estas seguro de querer borrar la tarea?')){

			fetch(`/api/tasks/${id}`,{
			method: 'DELETE',
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json)
		.then(data => {

			console.log(data);
			M.toast({html:'Tarea Eliminada'});
			this.fetchTasks();

		})

		}


	}

	/*Esto agarra toodo lo que meta en el input y lo mete en el estado del componente */
	handleChange(e){

		const {name,value} = e.target;
		this.setState({
			[name]:value

		});

	}


	render(){

		return(
			<div>
				{/*NAVEGACION*/}
				<nav className="light-blue-darken-4">

					<div className="container">
						<a className="brand-logo" href="/">Stack MERN</a>
					</div>

				</nav>

				<div className="container">
					<div className="row">
						<div className="col s5">
						
							<div className="card">
								<div className="card-content">
									<form onSubmit={this.addTask}>
										<div className="row">
											<div className="input-field col s12">
												<input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
											</div>
										</div>
										<div className="row">

											<div className="input-field col s12">
												<textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
											</div>

											<button type="submit" className="btn btn-light-blue darken-4">OK</button>
										</div>
									</form>
								</div>
							</div>

						</div>
						<div className="col s7">

							<table>

								<thead>
									<tr>
										<th>Title</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>

									{this.state.tasks.map(task => {

										return(
											<tr key={task.id}>

												<td>{task.title}</td>
												<td>{task.description}</td>
												<td>
													<button className="btn btn-ligjt-blue darken-4" style={{margin: '4px'}} onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
													<button className="btn btn-ligjt-blue darken-4" onClick={() => this.editTask(task._id)}><i className="material-icons">edit</i></button>
												</td>

											</tr>
											)

									})}

								</tbody>

							</table>

						</div>
					</div>
				</div>

			</div>
			)
	}
}

	export default App;

