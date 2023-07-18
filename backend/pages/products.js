import Link from "next/link"
import Layout from "../components/Layout"

export default function Products(){
    return(
        <Layout>
            <Link className="bg-blue-900 rounded-md py-1 px-2 text-white" href={'/products/new'}>Add New Product</Link>
        </Layout>
    )
}