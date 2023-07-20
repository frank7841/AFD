import { Category } from "../../models/categories";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect()
  
    if(method==='GET'){
        res.json(await Category.find().populate('parent'));
    }
    if(method==='POST'){
        const {name, parentCategory, properties}=req.body;
       const CategoryDocument= await  Category.create({name, properties,  parent:parentCategory||undefined});
       res.json(CategoryDocument)
    }
    if(method==='PUT'){
        const {name, parentCategory,properties, _id}=req.body;
        const CategoryDocument= await  Category.updateOne({_id},{name,properties,  parent:parentCategory||undefined});
        res.json(CategoryDocument)

    }
    if(method==='DELETE'){
        const {_id}= req.query;
        await Category.deleteOne({_id});
        res.json('Ok')
    }
}
