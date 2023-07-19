import { useState } from "react";
import axios from'axios'

import { useRouter } from "next/router";
export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    sellPrice:existingSellPrice,
    buyPrice:existingBuyPrice}){
    const[title, setTitle]= useState(existingTitle||'');
    const[description, setDescription]= useState(existingDescription||'');
    const[buyPrice, setBuyPrice]= useState(existingSellPrice||'');
    const[sellPrice, setSellPrice]= useState(existingBuyPrice||'');
    const[goToProduct, setGoToProducts]=useState(false)
   
    const router = useRouter();
    async function saveProduct(ev){
        const data={title, description, buyPrice, sellPrice}
        ev.preventDefault();
        if(_id){
            //update
            axios.put('/api/products', {...data,_id})
        }
        else{
            //create
            axios.post('/api/products', data )
        }
        setGoToProducts(true)

    }
        if(goToProduct){
            router.push('/products');
        
       

        }

    return(
        
            <form onSubmit={saveProduct}>
          
            <label>Product name</label>
            <input type="text"placeholder='product name' value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <label>description</label>
            <textarea placeholder="description" value={description} onChange={ev=>setDescription(ev.target.value)} ></textarea>
            <label>Buying Price in Ksh</label>
            <input type="number"placeholder='Buying Price' value={buyPrice} onChange={ev=>setBuyPrice(ev.target.value)}/>
            <label>Selling Price in Ksh</label>
            <input type="number"placeholder='Buying Price' value={sellPrice} onChange={ev=>setSellPrice(ev.target.value)}/>
            <button className='btn-primary' type='submit'>Save</button>
            </form>
    
    )
}