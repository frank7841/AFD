import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import ProducForm from "../../../components/productForm";
import ProductForm from "../../../components/productForm";

export default function editProductPage(){
    const router = useRouter();
    const {id} =router.query;
    const [productInfo, setProductInfo]= useState(null)
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get('/api/products?id='+id).then(
            response=>{
                setProductInfo(response.data)
            }
        )
    },[id]);
    return(
        <Layout>
              <h1>Edit product</h1>
              {productInfo &&(
                <ProductForm {...productInfo}/>

              )}
            
        </Layout> 
    
    );
}