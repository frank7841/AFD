import { useState } from "react";
import Layout from "../../components/Layout";
import axios from'axios'

import { useRouter } from "next/router";
import ProductForm from "../../components/productForm";

export default function NewProduct(){
    return(
        <Layout>
              <h1>New product</h1>
            <ProductForm/>
        </Layout>
    )
}