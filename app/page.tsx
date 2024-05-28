import getProducts, { IProductParams } from "./actions/getProducts";
import WarningText from "./components/WarningText";
import Footer from "./components/footer/Footer";
import Banner from "./components/home/Banner";
import Categories from "./components/home/Categories";
import ProductCard from "./components/home/ProductCard";
import Products from "./components/home/Products";

interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  console.log(products)

  if(products?.length === 0){
    return <WarningText text="Hiçbir ürün bulunamadı" />
  }

  function shuffleArray(array: any){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
      
    }
    return array
  }

  const shuffledProducts = shuffleArray(products)
  return (
    <div className="px-8 pb-12">
      <Categories/>
      <Banner/>
      <div className="pt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {shuffledProducts.map((product: any) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    </div>
  )
}
