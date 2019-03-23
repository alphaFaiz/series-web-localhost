import React from 'react';
import {Navbar, Container} from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar color = 'dark' className='mb-3'>
                <Container>
                    <Link style={{color: 'yellow'}} to={'/'} className = 'col-4'>
                        HOME
                    </Link>
                    <Link style={{color: 'yellow'}} to={'/posts/'} className = 'col-4'>
                        GAMES
                    </Link>
                    <Link style={{color: 'yellow'}} to={`/about/`} className = 'col-4'>
                        ABOUT
                    </Link>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;