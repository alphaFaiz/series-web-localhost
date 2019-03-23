import React from 'react';
import Post from './Post';
import {Spinner} from 'reactstrap';

const Posts = (props) => {

    const search=()=>{
        
        let result = [];
        props.posts.map((post) => {
            if (post.title.toUpperCase().includes(props.keyword) || post.title.toLowerCase().includes(props.keyword) ){
                        result.push(post)
            }
        })
        if(result.length===0){
            return (
                <div className='mt-5 mb-5'>
                    <h2>Sorry. We don't have this game</h2>
                    <img className='img-fluid mt-2' src='https://i.ytimg.com/vi/TSXXi2kvl_0/maxresdefault.jpg' alt=''/>
                </div>
            );
        } else 
            return(
                result.map((item) => {
                    return(
                        <Post post = {item}/>);
                    })
                );
    }
    if(props.posts){
        return (
            search()
        );
    } 
    else {
        return(
            <div className='justify-content-center mt-5'>
                <h4 className='mt-5'>Loading...</h4>
                <Spinner className='mt-5 mb-5' style={{  width: '3rem', height: '3rem' }} />
            </div>)
    }
};

export default Posts;