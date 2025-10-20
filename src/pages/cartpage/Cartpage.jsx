import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../cartcontext/Cartcontext";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckout = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setPaymentSuccess(false);
    setIsProcessing(false);
  };

  // ✅ Simulate Payment
  const handlePayment = () => {
    setIsProcessing(true);

    // simulate 2 seconds processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <>
      <Headercomponent />

      <div className="container py-5">
        <h3>Your Cart</h3>
        <hr />

        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        className="rounded"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQty(item.id)}>
                          -
                        </button>
                        <span className="mx-2">{item.qty}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQty(item.id)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.qty).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
              <h5>Total: ${totalPrice.toFixed(2)}</h5>
              <div>
                <button className="btn btn-outline-danger me-2" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-success" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===================== Payment Modal ===================== */}
      {showModal && (
        <div className="modal show fade" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Payment Method</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>

              <div className="modal-body">
                {/* Payment Success Message */}
                {paymentSuccess ? (
                  <div className="py-4">
                    <div className="text-success fs-1 mb-3">✅</div>
                    <h5>Payment Successful!</h5>
                    <p className="text-muted">Thank you for your purchase.</p>
                    <button className="btn btn-primary mt-2" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                ) : (
                  <>
            
                    {/* Payment Form */}
                    {paymentMethod === "card" && (
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Cardholder Name</label>
                          <input type="text" className="form-control" placeholder="John Doe" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Card Number</label>
                          <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Expiration</label>
                            <input type="date" className="form-control" placeholder="MM/YY" />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVC</label>
                            <input type="text" className="form-control" placeholder="123" />
                          </div>
                        </div>
                      </form>
                    )}

                    {paymentMethod === "paypal" && (
                      <div>
                        <p className="mb-2">You will be redirected to PayPal for secure payment.</p>
                        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal" width="120" />
                      </div>
                    )}

                    {paymentMethod === "aba" && (
                      <div>
                        <p>Scan this QR code to pay via ABA Bank:</p>
                        <img src="https://abaqr.aba.com/assets/img/qrcode-sample.png" alt="ABA QR" width="150" />
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div>
                        <p>Pay cash directly to the delivery staff when you receive your order.</p>
                      </div>
                    )}
                    {/* Payment Options */}
                    <div className="mb-3 text-start">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="card" className="form-check-label">
                          <FontAwesomeIcon icon={faCreditCard} />Credit / Debit Card
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="paypal"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="paypal" className="form-check-label">
                          🅿️ PayPal
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="aba"
                          name="payment"
                          value="aba"
                          checked={paymentMethod === "aba"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="aba" className="form-check-label">
                          🏦 ABA QR / Bank Transfer
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="cod" className="form-check-label">
                          🚚 Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {!paymentSuccess && (
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={isProcessing}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handlePayment} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Confirm Payment ($${totalPrice.toFixed(2)})`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footercomponent />
    </>
  );
};

export default CartPage;
