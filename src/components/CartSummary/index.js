import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [confirmOrderDisabled, setConfirmOrderDisabled] = useState(true)
  const [msg, setMsg] = useState('')

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        const handlePaymentOptionChange = () => {
          setConfirmOrderDisabled(false)
        }

        const handleConfirmOrder = () => {
          const successMsg = 'Your order has been placed successfully'
          setMsg(successMsg)
        }

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
                /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div className="popup">
                        <p className="order-total-label">
                          Total Cost: Rs {total}
                        </p>
                        <p className="total-items">
                          Number of Items: {cartList.length}
                        </p>
                        <p>Select Payment Option:</p>
                        <label>
                          <input
                            type="radio"
                            value="Net Banking"
                            checked={false}
                            onChange={() => handlePaymentOptionChange()}
                          />
                          Net Banking
                        </label>
                        <br />
                        <label>
                          <input
                            type="radio"
                            value="Cash on Delivery"
                            onChange={() => handlePaymentOptionChange()}
                          />
                          Cash on Delivery
                        </label>
                      </div>
                      <button
                        type="button"
                        className="checkout-button"
                        onClick={handleConfirmOrder}
                        disabled={confirmOrderDisabled}
                      >
                        Confirm Order
                      </button>
                      <p className="order-total-label">{msg}</p>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Close
                      </button>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
