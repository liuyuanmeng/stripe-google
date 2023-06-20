'use  client'
import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import basket from '../assets/basket.png'
import { AnimatePresence, motion } from 'framer-motion'

export default function Cart() {
  const cartStore = useCartStore()
  // Total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25">
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0  h-screen p-12 overflow-y-scroll text-gray-700 w-full lg:w-2/5">
        <h1> Here is your Cart </h1>
        <button
          onClick={() => cartStore.toggleCart()}
          className="text-sm font-bold pb-12">
          Back to store 
        </button>
        {cartStore.cart.map((item) => (
          // for react we need to add a key here
          <motion.div layout key={item.id} className="flex py-4 gap-4">
            <Image src={item.image} alt={item.name} width={120} height={120} />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>

                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }>
                  <IoAddCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }>
                  <IoRemoveCircle />
                </button>
              </div>

              <p>Price: {item.unit_amount && formatPrice(item.unit_amount)}</p>
            </div>
          </motion.div>
        ))}
        {/* checkout and total price */}

        {cartStore.cart.length > 0 && (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button className="py-2 mt-4 bg-teal-700 w-full round-md">
              Checkout
            </button>
          </motion.div>
        )}
        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-95">
              <h1>Your cart it's empty</h1>
              <Image
                src={basket}
                alt="empty cart"
                width={200}
                height={200}></Image>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
