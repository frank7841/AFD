import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";


export default function edeletProduct(){
    const [productInfo, setProductInfo]=useState()
    const router= useRouter()
    const {id}=router.query;
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get('/api/products?id='+id).then(response=>{
           setProductInfo(response.data)
        })

    },[id])
    function goBack(){
        router.push('/products')

    }
     async function deleteProduct(){
        axios.delete('/api/products?id='+id);
        goBack();
        
    }
    return(
        <Layout>
            <h1 className='text-center'>Do you Want to delete Product &nbsp;&quot;{productInfo?.title}&quot;?</h1>
            <div className='flex gap-2 justify-center'>
                <button className='btn-red' onClick={deleteProduct}>Yes</button>
                <button className='btn-default' onClick={goBack}>NO</button>
            </div>
        </Layout>
    )
}