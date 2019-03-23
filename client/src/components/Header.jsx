import React from 'react';
import { Navbar, Container, Input, NavbarBrand, Button, Modal, ModalBody, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import UploadModal from './UploadModal';

export const Header = (props) => {
    // console.log(props.authAdmin.role)
    return(
        <Navbar color='light'>
            <Container className='header-container'>
                <Link to = {`/posts/`}>
                <Input onChange = {(e) => props.changeKeyword(e.target.value)} style={{display: 'inline-block', border:'solid'}} className='search' type='text' name='search-title' placeholder='search game'/>
                </Link>
                <NavbarBrand className='col-sm-4' href="/"><img className='img-fluid' src='https://upload.wikimedia.org/wikipedia/commons/1/13/Persona_PSP_logo.svg' alt=''/></NavbarBrand>
                {props.authAdmin.id ? (
                    <div className = 'col-sm-4'>
                    <div>
                        <h3>{props.authAdmin.name}</h3>
                    </div>
                    <div className='buttons'>
                    {(props.authAdmin.role==='admin'||props.authAdmin.id==='nVyy4srxIBXUsgqG34fRGVZRBBi2'
                    ||props.authAdmin.id==="TXlzGy9tArZwDKhYkpWZaG4sUwl2") && (
                        <Button className='col-6' color='success' onClick =  {props.uploadPost.toggle}>Create post</Button>)}
                        <Button className='col-6' color='danger' onClick = {props.logOut}>Log out</Button>
                    </div>
                    </div>
                ):(
                    <div>
                    <Button onClick={props.login.loginWithFacebook} style={{backgroundColor:'#3b5998'}}>Login with Facebook</Button>
                    {/* <Button style={{marginRight: '10px'}} color='primary' onClick={props.login.toggle}>Login</Button> */}
                    </div>
                )}

                <Modal className='login-modal' isOpen={props.loginModalVisible} toggle={props.login.toggle}>
                    <ModalBody>
                        <Form>
                            <Input 
                                type='text' 
                                placeholder='Username' 
                                value={props.login.name}
                                onChange={(e) => {props.login.loginInfoChange({name: e.target.value})}}
                            />

                            <Input 
                                type='password' 
                                placeholder='Password' 
                                value={props.login.password}
                                onChange={(e) => {props.login.loginInfoChange({password: e.target.value})}}
                            />

                            <Button onClick={props.login.submitForm }>Log In</Button>
                        </Form>
                    </ModalBody> 
                </Modal>
                
                <UploadModal toggle={props.uploadPost.toggle} uploadPostVisible={props.uploadPostVisible} />
                {/* <Modal className='modal-lg' isOpen={props.uploadPostVisible} toggle={props.uploadPost.toggle}>
                    <ModalBody>
                        <UploadPostForm toggle = {props.uploadPost.toggle}/>
                    </ModalBody>
                </Modal> */}

            </Container>
        </Navbar>
    );
}