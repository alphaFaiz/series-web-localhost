import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header'; 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './containers/About';
import Home from './containers/Home';
import PostsScreen from './containers/PostsScreen';
import firebase from 'firebase';

class App extends Component {
  state = {
    loginModalVisible: false,
    uploadPostVisible: false,
    loginInfo: {
      name: '',
      password: '',
    },
    authAdmin: {},
    detail: {},
    posts: [],
    searchKeyword: ''
  };

  componentDidMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyDKbtA1HcGpz_F_BhQSAjCHUGIIwy3qv9g",
      authDomain: "series-web.firebaseapp.com",
      databaseURL: "https://series-web.firebaseio.com",
      projectId: "series-web",
      storageBucket: "series-web.appspot.com",
      messagingSenderId: "832901678576"
    });
    const adminId = localStorage.getItem('id');
    const adminName = localStorage.getItem('name');
    const adminRole = localStorage.getItem('role');
    this.loadData();
    this.setState({
      authAdmin: {
        name: adminName,
        id: adminId,
        role: adminRole,
      }
    });
  }

  changeKeyword = (input) => {
    this.setState({
        searchKeyword: input,
    });
  }

  loginInfoChange = (newLoginInfo) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        ...newLoginInfo,
      }
    });
  }

  toggleLogin = () => {
    this.setState({
      loginModalVisible: !this.state.loginModalVisible,
    });
  }

  toggleUploadPost = () => {
    this.setState({
      uploadPostVisible: !this.state.uploadPostVisible,
    });
  }
  
  signUpSubmit = async () => {
    try {
      
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  }

  loginSubmit = async() => {
    //validate form
    if(!this.state.loginInfo.name || !this.state.loginInfo.password) {
      window.alert('Please enter your username and password');
    }
    //fetch api to server
    else {
      try {
        const result = await fetch(`http://localhost:3001/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.loginInfo),
        }).then((res) => res.json());
    //success => update UI
        if(!result.success) {
          window.alert(result.message);
        } else {
          window.localStorage.setItem('id',result.Id);
          window.localStorage.setItem('name',result.name);
          window.localStorage.setItem('role',result.role);
          this.toggleLogin();
          this.setState({
            authAdmin: {
              id: result.Id,
              name: result.name,
              role: result.role,
            }
          })
        }
      } catch (error) {
        console.log(error);
        window.alert(error.message);
      }
    }
  }

  loginWithFacebook =  async () => {
    try {
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(facebookProvider);
      const idToken = await result.user.getIdToken();

      const verifyTokenResult = await fetch(`http://localhost:3001/api/auth/facebookOauth`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken,
        }),
      }).then((res) => res.json());
      window.localStorage.setItem('id',verifyTokenResult.verifyIdToken.user_id);
      window.localStorage.setItem('name',verifyTokenResult.verifyIdToken.name);
      window.localStorage.setItem('role','user');
      this.setState({
        authAdmin: {
          id: verifyTokenResult.verifyIdToken.user_id,
          name: verifyTokenResult.verifyIdToken.name,
          role: 'user',
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  logOut = async() => {
    try {
      window.localStorage.removeItem('id');
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('role');
      this.setState({
        authAdmin: {
          id: '',
          name: '',
          role: '',
          loginModalVisible: false
        }
      });
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  }

  loadData = async() =>{
    try {
        const data = await fetch(`http://localhost:3001/api/posts/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((res) => res.json());
          this.setState({posts: data});
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
}

  render() {
    return (
    <BrowserRouter>
      <div className="App">
      <div  className='sticky-top'>
      <Header 
        loginModalVisible = {this.state.loginModalVisible}
        uploadPostVisible = {this.state.uploadPostVisible}
        changeKeyword = {this.changeKeyword}
        uploadPost={{
          toggle: this.toggleUploadPost,
        }}
        login={{
          name: this.state.loginInfo.name,
          password: this.state.loginInfo.password,
          toggle: this.toggleLogin,
          loginInfoChange: this.loginInfoChange,
          submitForm: this.loginSubmit,
          loginWithFacebook: this.loginWithFacebook,
        }}
        authAdmin = {this.state.authAdmin}
        logOut = {this.logOut}
        />
        <NavBar/>
        </div>
        
        <Route exact path='/' render={(props) => {
          return(
              <Home post = {this.state.posts[0]} {...props} />
            );
          }}
        />
        
        <Route path='/posts/' key='post' render={(props)=> {
          return(
              <div className='container'>
              <PostsScreen 
              loginWithFacebook ={this.loginWithFacebook}
              toggle={this.toggleLogin} 
              authAdmin={this.state.authAdmin} 
              keyword={this.state.searchKeyword} 
              posts={this.state.posts} {...props}/></div>
            )
          }} 
        />
        
        <Route exact path='/about/' render={(props) => {
          return(
              <About {...props}/>
            );
          }}
        />
        <Footer/>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
