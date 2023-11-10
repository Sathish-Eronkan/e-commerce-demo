import { Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import axios from 'axios';
import Product from '../components/Product';
import Loader from "../components/Loader";
import Message from "../components/message";
import { useGetProductsQuery } from "../slices/productApiSlice";
const HomeScreen = () => {
   /*
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get('/api/products');
            console.log('data ',data);
            setProducts(data);
        }
        fetchData();
    },[])
    */
    const {data: products, isLoading, error} = useGetProductsQuery();
    return (
        <>
            {isLoading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            )  : (
                <>  
                    <h1>Latest Production</h1>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))} 
                    </Row>
                </>
            )}
        </>
    )
}

export default HomeScreen;