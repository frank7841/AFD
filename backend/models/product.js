
import mongoose, {model, Schema, models}from 'mongoose'
 const ProductSChema = new Schema({
title:{type:String, required:true},
description:{type:String, required:true},
buyPrice:{type:Number, required:true},
sellPrice:{type:Number, required:true},
images:[{type:String}],
category:{type:mongoose.Types.ObjectId, ref:'Category'}
});
export const Product = models.Product|| model('Product', ProductSChema);