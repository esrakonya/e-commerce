import Image from "next/image"

const Banner = () => {
  return (
    <div className="h-[197px] bg-zinc-700 flex items-center justify-center">
        <div className="h-[137px] relative w-full">
            <Image src={"https://www.hangifirsat.com/wp-content/uploads/2023/10/trendyol-kadin-giyimde-nisan-firsatlari-yuzde25e-varan-indirimler.jpg"} fill alt="" className="object-cover"/>
        </div>
    </div>
  )
}

export default Banner