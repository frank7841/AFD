
//import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/product";

export default async function handle(req, res){
    const {method}=req;
    await mongooseConnect();
    if(method==='GET'){
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query?.id}))
        }
        res.json(await Product.find())
    }
    if(method==='POST'){
        const{title, description, sellPrice,buyPrice}= req.body;
        const productDocument = await Product.create({
            title, description, buyPrice, sellPrice
        });
        res.json(productDocument);
    }
    if(method==='PUT'){
        const{title, description, sellPrice,buyPrice, _id}= req.body;
        await Product.updateOne({_id}, {title,description, sellPrice, buyPrice});
        res.json(true)

    }
    if(method==='DELETE'){
        if(req.query?.id){
            res.json(await Product.deleteOne({_id:req.query?.id}))
            res.json(true)
        }

    }

}