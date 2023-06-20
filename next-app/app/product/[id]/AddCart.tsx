"use client"

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { useState } from "react"

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, quantity, image })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 500) }
  

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-primary w-full bg-teal-600 text-white py-2 px-4 rounded-md">
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart </span>}
      </button>
    </>
  )
}
