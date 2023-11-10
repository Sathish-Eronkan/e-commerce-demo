import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    // console.log('logout mutation values ',useLogoutMutation());
    const [ logoutApiCall ] = useLogoutMutation();
    // console.log('logoutApiCall ',logoutApiCall);
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={logo} alt='Proshop' />
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar.nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    { cartItems.length && 
                                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                           {cartItems.reduce((total, e) => total + Number(e.qty), 0)} 
                                        </Badge>
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                            <>
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            </>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser /> Sign In
                                </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;