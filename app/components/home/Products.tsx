
import Heading from "../general/Heading"
import ProductCard from "./ProductCard"
import getProducts from "@/app/actions/getProducts"


const Products = async () => {
  const products = await getProducts({category: null})
  return (
    <div>
        <Heading text="Tüm Ürünler"/>
        <div /*className="flex items-center flex-wrap gap-3 md:gap-10 px-3 md:px-10"*/ className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                products.map((product: any) => (
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </div>
    </div>
  )
}

export default Products