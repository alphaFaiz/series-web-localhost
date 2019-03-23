import React from 'react';
import ImgCarousel from '../components/ImgCarousel';
import {Link} from 'react-router-dom';
import { Spinner } from 'reactstrap';

const Home = (props) => {
    if(props.post){
        const releaseDate = new Date(props.post.releaseDate);
        const releaseDateString= releaseDate.getDate()+'/'+(releaseDate.getMonth() + 1)+'/'+releaseDate.getFullYear();    
    return (
    <div>
        <ImgCarousel />
        <div style={{backgroundColor:'black'}}>
        <hr/>
        <h2 style={{color:'white'}}>LASTEST GAME</h2>
        <hr/>
        </div>
        <Link to={`/posts/${props.post._id}`}>
                <h3>{props.post.title}</h3>
        </Link>
        <div className = 'container'>
            <div className = 'row'>
            <div className = 'col-sm-6'>
                <img className='img-fluid mt-2' style={{width:'60%',height:'45vh', position:'center', verticalAlign:'center'}}
                 src = {props.post.cover} alt ='not found' />
                <hr/>                    
                <p><b>Platforms: </b>{props.post.platform}</p>
                    <hr/>                    
                <p><b>Release date:</b> {releaseDateString}</p>
            </div>
            <div className = 'col-sm-6'>
                <div className='resp-container mt-3' dangerouslySetInnerHTML={{__html: props.post.trailer}} ></div>

            </div>
            </div>
        </div>
    </div>
    );}
    else 
    return (
    <div>
        <ImgCarousel />
        <div className='justify-content-center mt-5'>
            <h4>Loading...</h4>
            <Spinner style={{  width: '3rem', height: '3rem' }} />
        </div>
    </div>)
};

export default Home;