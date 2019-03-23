import React, { Component } from 'react';
import {Form, Input, Button} from 'reactstrap';
import Editor from './Editor';

class UploadPostForm extends Component {
    state = {
        title: '',
        description: '',
        cover: '',
        trailer: '',
        platform: '',
        ratingCategory: '',
        contentDesciptors: '',
        releaseDate: '',
    }

    createPost = async() =>{
            const postInfo = this.state;
            try {
                const result = await fetch(`http://localhost:3001/api/posts/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postInfo),
                  }).then((res) => res.json());
                  window.location.reload();
                  window.alert(result.message);
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }            
    }

    saveEditorContent = async(content) =>{
        this.setState({description: content});
        console.log(content)
    }

    render() {
        return (
            <div>
                <Form>
                    <h6>Title:</h6>
                    <Input 
                        type='text' 
                        placeholder='Title' 
                        value={this.state.title}
                        onChange={(e) => {this.setState({title: e.target.value})}}
                    />
                    <h6>Description:</h6>
                    <Editor value={this.state.description} saveEditorContent={this.saveEditorContent}/>
                    {/* <Input 
                        type='text' 
                        placeholder='Description' 
                        value={this.state.description}
                        onChange={(e) => {this.setState({description: e.target.value})}}
                    /> */}
                    <hr/>
                    <h6>Link for cover image:</h6>
                    <Input 
                        type='text' 
                        placeholder='Link for cover' 
                        value={this.state.cover}
                        onChange={(e) => {this.setState({cover: e.target.value})}}
                    />
                    <h6>Link for embed video trailer:</h6>
                    <Input 
                        type='text' 
                        placeholder='Link for embed trailer' 
                        value={this.state.trailer}
                        onChange={(e) => {this.setState({trailer: e.target.value})}}
                    />
                    <h6>Platforms:</h6>
                    <Input 
                        type='text' 
                        placeholder='platform' 
                        value={this.state.platform}
                        onChange={(e) => {this.setState({platform: e.target.value})}}
                    />
                    <h6>Rating category image:</h6>
                    <Input 
                        type='text' 
                        placeholder='link for image of Rating Category' 
                        value={this.state.ratingCategory}
                        onChange={(e) => {this.setState({ratingCategory : e.target.value})}}
                    />
                    <h6>Content descriptors:</h6>
                    <Input 
                        type='text' 
                        placeholder='Content descriptors' 
                        value={this.state.contentDesciptors}
                        onChange={(e) => {this.setState({contentDesciptors : e.target.value})}}
                    />
                    <h6>Release date:</h6>
                    <Input 
                        type='date' 
                        placeholder='release date' 
                        value={this.state.releaseDate}
                        onChange={(e) => {this.setState({releaseDate : e.target.value})}}
                    />
                    <div className='row mt-2'>
                    <div className='col-6'>
                    {/* <a href='/posts/' > */}
                    <Button color='primary' onClick = {this.createPost} onMouseUp = {this.props.toggle}>Create</Button>
                    {/* </a> */}
                    </div>
                    <div className='col-6'>
                    <Button style={{float:'right'}} color='primary' onClick = {this.props.toggle}>Cancel</Button>
                    </div>
                    </div>
                </Form>                
            </div>
        );
    }
}

export default UploadPostForm;