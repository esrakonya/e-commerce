import React from 'react'
import FooterList from './FooterList'
import Link from 'next/link'
import Container from '../Container'
import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='bg-zinc-800 text-stone-400 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between p-10 pt-16 pb-8'>
          <FooterList>
            <h3 className='text-stone-200 text-base font-bold mb-2'>Kategoriler</h3>
            <Link href="#">Moda</Link>
            <Link href="#">Ev & Yaşam</Link>
            <Link href="#">Elektronik</Link>
            <Link href="#">Anne & Bebek</Link>
            <Link href="#">Ayakkabı & Çanta</Link>
            <Link href="#">Yapı Market</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-stone-200 text-base font-bold mb-2'>Müşteri Hizmetleri</h3>
            <Link href="#">Service</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FaQs</Link>
          </FooterList>
          <div className='w-full md:w-1/3 mb-6 md:mb-0'>
            <h3 className='text-stone-200 text-base font-bold mb-2'>About Us</h3>
            <p className='mb-2'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus sapiente autem iure assumenda unde at pariatur saepe voluptas amet. Ab nobis nam impedit? Cumque repellat iste recusandae! Repudiandae, pariatur molestiae.
            </p>
            <p>&copy; {new Date().getFullYear()} Mercatura. Tüm hakları saklıdır.</p>
          </div>
          <FooterList>
            <h3 className='text-stone-200 text-base font-bold mb-2'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href="#">
                <MdFacebook size={25} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={25} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={25} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={25} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}

export default Footer