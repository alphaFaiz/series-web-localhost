import React from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    return (

            <div className='col-lg-3' style={{fontSize:'10.4px',display:'inline-block', backgroundColor:'black', borderStyle:'solid', borderColor:'white'}}>
            <Link to={`/posts/${props.post._id}`}>
            <img className='img-fluid mt-2' style={{width:'100%',height:'55vh', position:'center', verticalAlign:'center'}}
             src = {props.post.cover} alt ='not found' />
            <h5 style={{textOverflow:'ellipsis', overflow:'hidden', display:'inline-block', width:'100%', whiteSpace:'nowrap'}}>{props.post.title}</h5>
            <p style={{textOverflow:'ellipsis', overflow:'hidden', display:'inline-block', width:'100%', whiteSpace:'nowrap'}}>{props.post.platform}</p>
            </Link>
            </div>
    );
};

export default Post;