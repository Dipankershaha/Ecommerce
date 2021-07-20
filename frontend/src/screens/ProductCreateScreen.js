import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form,Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails,listProducts, updateProduct,createProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductCreateScreen = ({match, history}) => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    
    
    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate
    
    useEffect(() =>{
        
      if(successCreate){
        console.log("hello")
        // history.push(`/`)
        history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts(''))
    }
    
},[dispatch, history, userInfo,successCreate,createdProduct])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        console.log(e.target.files)
        setImage(file)
        // let formData = new FormData()
        // formData.append('image', file)
        // formData.append('name', file.name)
        // console.log(formData);
        
        setUploading(true)

        // try {
        //     const config = {
        //         headers :{
        //             'Content-type': 'multipart/form-data'
        //         }
        //     }
        //     // const {data} = await axios.post('/api/products/upload/', formData, config)
        //     setImage(formData)
        //     setUploading(false)
        // } catch (error) {
        //     setUploading(false)
        // }
    }
    const createProductHandler = async(e) =>{
      e.preventDefault()
    //   dispatch(createProduct({
    //     // _id:productId,
    //     name,
    //     price,
    //     image,
    //     brand,
    //     category,
    //     countInStock,
    //     description
    // }));
    const formData = new FormData();
    formData.append('name',name)
    formData.append('price',price)
    formData.append('image',image)
    formData.append('brand',brand)
    formData.append('category',category)
    formData.append('countInStock',countInStock)
    formData.append('description',description)
    dispatch(createProduct(formData))
    
    // try {
    //       const config = {
    //           headers :{
    //               'Content-type': 'multipart/form-data',
    //               Authorization : `Bearer ${userInfo.token}`
    //           }
    //       }
    //       setUploading(true)
    //       const {data} = await axios.post('/api/products/create/', formData, config)
    //       if(data){
    //         setUploading(false)
    //       }
          
    //   } catch (error) {
    //       setUploading(false)
    //   }
      // if(data){
        history.push(`/`)
      // }
        // history.push(`/admin/product/create`)
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {/* {loadingUpdate && <Loader/>} */}
            {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                {/* {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : ( */}
                   { <Form onSubmit={createProductHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Enter Price</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >

                        </Form.Control>
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >

                         </Form.File>
                         {/* {uploading && <Loader/>} */}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countinstock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>
                        Create
                    </Button>
                </Form>
                }
                
            </FormContainer>
        </div>
    );
};

export default ProductCreateScreen;