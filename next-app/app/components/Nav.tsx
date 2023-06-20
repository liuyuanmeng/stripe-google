'use client'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Cart from './Cart'
import { useCartStore } from '@/store'
import { AiFillShopping } from 'react-icons/ai'
import logo from '../assets/logo.png'
import { AnimatePresence, motion } from 'framer-motion'



const Nav = ({ user }: Session) => {
  const cartStore = useCartStore()
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={'/'}>
        <Image
          src={logo}
          alt="logo"
          width={65}
          height={65}
          className="rounded-full"
        />
      </Link>

      <ul className="flex items-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer">
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-teal-700 text-black text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* if the user is not signed in  */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in </button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={35}
              height={35}
              className="rounded-full"
              tabIndex={0}
            />
          </li>
        )}
      </ul>
      <AnimatePresence>{useCartStore().isOpen && <Cart />}</AnimatePresence>
    </nav>
  )
}

export default Nav
