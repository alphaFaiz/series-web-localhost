import React, { Component } from 'react';
import Axios from 'axios';
import Download from '../components/Download';
import {Button, Spinner} from 'reactstrap';
import EditPostModal from '../components/EditPostModal';

class DetailPost extends Component {
    state = {
        post: null,
        editModalVisible: false,
    };

    componentDidMount() {
        Axios
        .get(`http://localhost:3001/api/posts/${this.props.match.params.id}`)
        .then(data => {
            this.setState({
                post: data.data
            });
        })
        .catch(error => console.log(error));
    }

    editToggle = () => {
        this.setState({editModalVisible: !this.state.editModalVisible});
    }
    
    deletePost = async() => {
        try {
            const result = await fetch(`http://localhost:3001/api/posts/${this.props.match.params.id}`, {
                method: 'DELETE',
              }).then((res) => res.json());
              window.alert(result.message);
              window.location.replace('/')
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }            
    }

    render() {
        if(this.state.post){
        const releaseDate = new Date(this.state.post.releaseDate);
        const releaseDateString= releaseDate.getDate()+'/'+(releaseDate.getMonth() + 1)+'/'+releaseDate.getFullYear();
        return (
            <div className='container'>
            {/* check for admin and update*/}
                {(this.props.authAdmin.role ==='admin'||this.props.authAdmin.id==='nVyy4srxIBXUsgqG34fRGVZRBBi2'||this.props.authAdmin.id==='TXlzGy9tArZwDKhYkpWZaG4sUwl2') && (
                <div>
                    <div className='buttons'>
                    <Button color='success' onClick={this.editToggle}>UPDATE THIS POST</Button>
                    <Button color='danger' onClick={this.deletePost}>DELETE THIS POST</Button>                    
                    </div>
                    <EditPostModal editModalVisible={this.state.editModalVisible} toggle={this.editToggle} post={this.state.post}/>
                </div>)}
            {/*  */}
            {this.state.post ? (
                <div>
                <div className='row'>
                <div className='col-sm-6'>
                    <img className='img-fluid mt-2 ' style={{width:'100%'}}  src = {this.state.post.cover} alt ='not found' />
                    <hr/>                    
                    <img className='img-fluid mt-5' style={{height:'15%', width:'25%'}} src={this.state.post.ratingCategory} alt=''/>
                </div>
                <div className='col-sm-6'>
                    <h3>{this.state.post.title}</h3>
                    <hr/>                    
                    <div className='resp-container' dangerouslySetInnerHTML={{__html: this.state.post.trailer}} ></div>
                    <hr/>                    
                    <div dangerouslySetInnerHTML={{__html: this.state.post.description}}></div>
                    <hr/>                    
                    <p><b>Platforms: </b>{this.state.post.platform}</p>
                    <hr/>                    
                    <p><b>Release date:</b> {releaseDateString}</p>
                </div>
                </div>
                <hr/>
                <Download post={this.state.post} authAdmin={this.props.authAdmin} loginWithFacebook={this.props.loginWithFacebook} />
                </div>):(
                <div className='justify-content-center'>
                    <h6>Loading...</h6>
                    <Spinner style={{  width: '3rem', height: '3rem' }} />
                </div>)}
            </div>
        );}
        else {
            return(
            <div className='justify-content-center mt-5'>
                <h4 className='mt-5'>Loading...</h4>
                <Spinner className='mt-5 mb-5' style={{  width: '3rem', height: '3rem' }} />
            </div>
            )
        }
    }
}

export default DetailPost;