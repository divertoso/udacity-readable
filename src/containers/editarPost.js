import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionLimparEditarPost } from '../actions/actionEditarPost'
import { inserirPosts } from '../actions/actionPosts'


import {Link,withRouter} from 'react-router-dom';


class editarPost extends Component {


  constructor(props) {
    super(props);

      this.state = {
      postASerEditado:{},
      idPost:this.props.ReducerEditarPost.editarPost,
      titleEditado:'',
      bodyEditado:''
    }



  }
/**
 * recuperar o post a ser editado
 */
componentWillMount(){

  axios
  .get(`http://localhost:3001/posts/${this.state.idPost}`, {
    headers: { Authorization: 'whatever-you-want' },
  })
  .then(response => {
   //gravar no state o objeto recebido da api.
   let temp = response.data
   this.setState({postASerEditado:temp});   
   this.setState({titleEditado:temp.title}); 
   this.setState({bodyEditado:temp.body}); 
 
  })
  .catch(error => {
    console.log('ERRO', error);
  });
}




/**
 * Gravar o post editado na api
 */
alterouTitulo (e) {
  this.setState({ titleEditado: e.target.value });
}
alterouMsg (e) {
  this.setState({ bodyEditado: e.target.value });
}
gravarPostAlterado(e){
  e.preventDefault();

  //gravaar o post novo na api
  axios
  .put(`http://localhost:3001/posts/${this.state.idPost}`, {
    headers: { Authorization: 'whatever-you-want'},
    title:this.state.titleEditado,
    body:this.state.bodyEditado
  })
  .then(response => {
    //limpar o state, chamando o actionLimparPost
    this.props.actionLimparEditarPost();
  })
  .catch(error => {
    console.log('ERRO', error);
  });


        //redirect para home
        this.props.history.push('/');

}//gravar post editado


  render() {

    //console.log('post2---->',this.state.postASerEditado.body)
    //console.log('state-title---->',this.state.titleEditado)
    //console.log('state-body---->',this.state.bodyEditado)
    return (
      <div>
        <h4>Edição de post</h4>
        <form onSubmit={this.gravarPostAlterado.bind(this)}>
            titulo:<input type="text" value={this.state.titleEditado} 
            onChange={this.alterouTitulo.bind(this)}/>
            <br />
            msg: <input type="text" value={this.state.bodyEditado} 
            onChange={this.alterouMsg.bind(this)}/>
            <br />
            <button type="submit">Gravar Post</button>
        </form>
        <Link to="/">Voltar</Link>
      </div>
    );//return
  }//render
}//class

function mapStateToProps(state) {
  return { ...state }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    actionLimparEditarPost,
    inserirPosts
  },
  dispatch
);

export default withRouter(
  connect(mapStateToProps,mapDispatchToProps)(editarPost))


/**
 * :
author:"thingtwo"
body:"Everyone says so after all."
category:"react"
commentCount:2
deleted:false
id:"8xf0y6ziyjabvozdd253nd"
timestamp:1467166872634
title:"Udacity is the best place to learn React"
voteScore:6
*/

/**
 * PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String
 */