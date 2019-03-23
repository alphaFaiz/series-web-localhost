import React from 'react';
import {Button} from 'reactstrap';

const Download = (props) => {
    return (
        <div>
        {props.authAdmin.id ? (
            <div>
            <a href={`http://lmgtfy.com/?iie=1&q=${props.post.title}%20free%20download`} rel="noopener noreferrer" target='_blank'>
                <Button color='success'>CLICK HERE TO DOWNLOAD!!!</Button>
            </a>
            <p><i>(please do not skip our tutorial)</i></p>
        </div>
        ) : (<Button style={{backgroundColor:'#3b5998'}} onClick={props.loginWithFacebook}>Login to dowload</Button>)}
        </div>
    );
};

export default Download;