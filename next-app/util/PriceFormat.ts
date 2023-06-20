// add number to make sure only accept number
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('GBP', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount / 100)
}

export default formatPrice