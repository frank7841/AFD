import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import axios from 'axios'
import { withSwal } from 'react-sweetalert2'

 function Categories({swal}){
    const[editedCategory, setEditedCategory]= useState(null)
    const [name, setName]= useState('');
    const[categories, setCategories]= useState([]);
    const [parentCategory, setParentCategory] =useState('');
    const[properties, setProperties]= useState([])
    useEffect(()=>{
       fetchCategories();

    },[])
    function fetchCategories(){
        axios.get('/api/categories').then(result=>{
            setCategories(result.data);
         });

    }
    async function saveCategory(ev){
        ev.preventDefault();
        const data ={
             name,
             parentCategory,
             properties: properties.map(p=>(
               {name:p.name, values:p.values.split(',')} 
             ))}
        if(editedCategory){
            data._id= editedCategory._id ;

            await axios.put('/api/categories',data);
            fetchCategories();
            setEditedCategory(null)
            setProperties([])
            setName('')
            setParentCategory('')
        }
        else{

        
         await axios.post('/api/categories', data);
         setName('');
         setParentCategory('');
         fetchCategories();
        } 

    }
    function editCategory(category){
            setEditedCategory(category)
            setName(category.name);
            setParentCategory(category?.parent?._id);
            setProperties(category.properties.map(({name, values})=>({
                name,
                values:values.join(',')
            })))
    }

    function deleteCategory(category){
        swal.fire({
            title: 'Are You Sure',
            text:`Do you Want to Delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Yes Delete!',
            confirmButtonColor:'#d55',
            reverseButtons:true,
        }).then(async result=>{

            console.log(result)
            if(result.isConfirmed){
                const {_id}= category;
                console.log(_id)
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        })


    }
    function addProperty(){
        setProperties(prev=>{
            return [...prev, {name:'', values:''}]
        })
    }
    function handlePropertNameChange(index, property, newName){
     //   console.log({index, property,newName})
     setProperties(prev=>{
        const properties = [...prev];
        properties[index].name = newName;
        return properties;
     })

    }
    function handleValueNameChange(index, property, newValues){
        //   console.log({index, property,newName})
        setProperties(prev=>{
           const properties = [...prev];
           properties[index].values = newValues;
           return properties;
        })
   
       }
       function removeProperty(indexToremove){
        setProperties(prev=>{
           return [...prev].filter((p, pIndex)=>{
                return pIndex!= indexToremove;
                
            });
            
        })
       }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory 
            ? `Edit Category  ${editedCategory.name}`
            :'New Category Name' }</label>
            <form  onSubmit={saveCategory}>
                <div className='flex gap-1 '>

                <input 
                 type='text' 
                 placeholder={'Category Name'}
                 value={name}
                 onChange={ev=>setName(ev.target.value)}/>
                 <select 
                 onChange={ev=>setParentCategory(ev.target.value)}
                 value={parentCategory}>
                <option value="">No Parent Category</option>
                    {categories.length >0 && categories.map(
                        category=>(
                <option key={category._id} value={category._id}>
                                {category.name}
                </option>
                        )
                    )}
                 </select>
                </div>
                <div className="mb-2">
                    <label className="block">Property</label>
                    <button onClick={addProperty} className="btn-default text-sm mb-2" type="button">Add New property</button>
                    {
                        properties.length >0 && properties.map((property, index)=>(
                            <div className="flex gap-1 mb-2 ">
                                <input value={property.name}
                                className='mb-0'
                                onChange={ev=>handlePropertNameChange(index, property, ev.target.value)}
                                 type='text' 
                                 placeholder=' example color'/>

                                <input type='text' value={property.values} className='mb-0'
                                onChange={ev=>handleValueNameChange(index, property, ev.target.value)}
                                 
                                  placeholder='values, (comma seperated)'/>
                                  <button type="button" onClick={()=>removeProperty(index)} className="btn-default">Remove</button>
                            </div>
                        ))
                    }
                </div>

                <div className="flex gap-1">
                {editedCategory &&(
                    <button onClick={()=>
                        {
                        setEditedCategory(null);setName('');
                    setParentCategory(''); setProperties([])}} className="btn-default">Cancel</button>
                )}
            
            <button className="btn-primary" type="submit">Save</button>
            </div>
            </form>

            {!editedCategory && (
                                <table className="basic mt-4">
                                <thead>
                                    <tr>
                                        <td>Category Name</td>
                                        <td>Parent Category</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length >0 && categories.map(
                                        category=>(
                                            <tr>
                                                <td>{category.name}</td>
                                                <td>{category?.parent?.name}</td>
                                                <td>
                                                    <button onClick={()=> editCategory(category)}
                                                     className="btn-primary mr-1">Edit</button>
                                                    <button onClick={()=>deleteCategory(category)} className="btn-red">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                


            )}

        </Layout>
    )
}
export default  withSwal(({swal}, ref)=>(
    <Categories swal={swal}/>
));