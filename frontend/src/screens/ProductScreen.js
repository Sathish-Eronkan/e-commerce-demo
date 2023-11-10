import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from 'axios';
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/message";
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { addToCart } from "../slices/cartSlice";
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useState } from "react";
const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {id: productId} = useParams();
    const [qty, setQty] = useState(1);
   /*
    const [product, setProduct] = useState({});
    useEffect(( ) => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/products/${productId}`);
            setProduct(data);
        }
        fetchData();
    },[])
    */
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty}));
        navigate('/cart');
        
    }
    return (
        <>
        {isLoading ? ( 
            <Loader />
        ) : error ? (
            <Message variant='danger'>
                    {error?.data?.message || error.error}
            </Message>
        ) : (
            <>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: &#8377;{product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Desciption: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>&#8377;{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(e => (
                                                            <option key={e + 1} value={e + 1}>
                                                                {e + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className="'bth-block" type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )}
    </>
    )
}

export default ProductScreen;