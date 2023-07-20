import { useEffect, useState } from "react";
import axios from'axios'
import {ReactSortable} from 'react-sortablejs'
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    sellPrice:existingSellPrice,
    buyPrice:existingBuyPrice,
    images: existingImages,
    category:assignedCategory}){
    const[title, setTitle]= useState(existingTitle||'');
    const[category,setCategory] = useState(assignedCategory||'')
    const[description, setDescription]= useState(existingDescription||'');
    const[buyPrice, setBuyPrice]= useState(existingSellPrice||'');
    const[sellPrice, setSellPrice]= useState(existingBuyPrice||'');
    const [images,setImages]=useState(existingImages|| [])
    const[goToProduct, setGoToProducts]=useState(false)
    const[isUploading, setIsUploading]=useState(false)
    const[categories, setCategories]= useState([])
    const router = useRouter();
    useEffect(()=>{
        axios.get('/api/categories').then(result=>{

           setCategories(result.data)
        })

    },[])
    async function saveProduct(ev){
        const data={title, description, buyPrice, sellPrice, images, category}
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
       async function uploadImages(ev){
            const files= ev.target?.files;
            if(files?.length >0){
                setIsUploading(true)
                const data = new FormData();
                for( const file of files){
                    data.append('file', file);
                }
                
                const res= await axios.post('/api/upload', data);
                setImages(oldImages=>{
                    return [...oldImages, ...res.data.links];
                });
                setIsUploading(false)
            }

        }
        function updateImagesOrder(images){
            setImages(images)
            //console.log(arguments)
        }

    return(
        
            <form onSubmit={saveProduct}>
          
            <label>Product name</label>
            <input type="text"placeholder='product name' value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <label>Category</label>
            <select value={category} onChange={ev=> setCategory(ev.target.value)}>
                <option value=''>Uncategorised</option>
                {categories.length>0&& categories.map(c=>(
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>
             <label>Photos</label>
           
             <div className='mb-2 flex flex-wrap gap-1'>
                <ReactSortable 
                list ={images} 
                setList={updateImagesOrder}
                className='flex flex-wrap gap-1'>
                {!!images?.length && images.map(link=>(
                    <div key={link} className='h-24 inline'>
                        <img className='rounded-lg' src={link} alt={link}/>
                    </div>
                ))}
                </ReactSortable>
                {isUploading &&(
                    <div className="h-24  flex items-center">
                        <Spinner/> 
                    </div>
                )}
             <label  className="w-24 h-24  cursor-pointer text-center flex  flex-col items-center justify-center text-sm text-gray-500 gap-1 rounded-lg bg-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>

                Upload
            <input type='file' className="hidden" onChange={uploadImages}/>
             </label>

              
            </div>             
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