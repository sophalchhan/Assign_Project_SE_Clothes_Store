// src/pages/cartpage/Cartpage.jsx
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCreditCard, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../cartcontext/Cartcontext";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { QRCodeSVG } from "qrcode.react";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("aba");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success', 'failed'

  // --- Merchant Configuration ---
  const MERCHANT = {
    name: process.env.REACT_APP_MERCHANT_NAME || "Fashion Store",
    merchantId: process.env.REACT_APP_MERCHANT_ID || "SS50500",
    account: process.env.REACT_APP_ACCOUNT_NUMBER || "500272324",
    city: process.env.REACT_APP_MERCHANT_CITY || "Phnom Penh",
    currency: process.env.REACT_APP_CURRENCY || "USD",
  };

  const qrSvgRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (showModal) {
      document.getElementById('payment-modal')?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Input validation
  const validateCart = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return false;
    }
    
    if (totalPrice <= 0) {
      alert("Invalid total amount. Please check your cart items.");
      return false;
    }

    // Validate each item in cart
    const invalidItems = cart.filter(item => 
      !item.id || !item.name || item.price <= 0 || item.qty <= 0
    );
    
    if (invalidItems.length > 0) {
      alert("Some items in your cart are invalid. Please review your cart.");
      return false;
    }
    
    return true;
  };

  const handleCheckout = () => {
    if (!validateCart()) return;
    setShowModal(true);
    setPaymentStatus('idle');
  };

  const handleClose = () => {
    setShowModal(false);
    setPaymentSuccess(false);
    setIsProcessing(false);
    setPaymentStatus('idle');
  };

  // ------------------ Enhanced KHQR generator ------------------
  const currencyNumeric = (cur) => {
    if (!cur) return "840";
    const currency = cur.toUpperCase();
    if (currency === "USD") return "840";
    if (currency === "KHR") return "116";
    return "840";
  };

  const padLen = (s) => String(s.length).padStart(2, "0");

  const tag = (id, value) => `${id}${padLen(value)}${value}`;

  // Enhanced CRC16-CCITT implementation
  const computeCRC16 = (str) => {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = ((crc << 1) ^ 0x1021) & 0xffff;
        } else {
          crc = (crc << 1) & 0xffff;
        }
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  };

  // Enhanced KHQR data generation with error handling
  const generateKHQRData = () => {
    try {
      const amount = Number(totalPrice || 0);
      if (amount <= 0) {
        throw new Error("Invalid amount");
      }
      
      const amountStr = amount.toFixed(2);
      
      // Validate merchant data
      if (!MERCHANT.merchantId || !MERCHANT.account) {
        throw new Error("Merchant configuration incomplete");
      }

      // Validate merchant name and city length (EMVCO limits)
      const merchantName = MERCHANT.name.substring(0, 25);
      const merchantCity = MERCHANT.city.substring(0, 15);

      const mAccountInfo =
        tag("00", "ABA.KHQR") +
        tag("01", MERCHANT.merchantId) +
        tag("02", MERCHANT.account);

      const payload =
        tag("00", "01") + // Payload Format Indicator
        tag("01", "12") + // Point of Initiation Method (12 = dynamic QR)
        tag("52", "5850") + // Merchant Category Code (MCC) - Retail
        tag("30", mAccountInfo) + // Merchant Account Info
        tag("53", currencyNumeric(MERCHANT.currency)) + // Transaction Currency
        tag("54", amountStr) + // Transaction Amount
        tag("58", "KH") + // Country Code
        tag("59", merchantName) + // Merchant Name
        tag("60", merchantCity); // Merchant City

      const toCrc = payload + "6304";
      const crc = computeCRC16(toCrc);
      return toCrc + crc;

    } catch (error) {
      console.error("KHQR generation failed:", error);
      return null;
    }
  };

  // ------------------ Enhanced Payment Handler ------------------
  const handlePayment = async () => {
    if (paymentMethod === "aba") {
      const qrData = generateKHQRData();
      if (!qrData) {
        alert("Failed to generate payment QR code. Please try again.");
        return;
      }
    }

    setPaymentStatus('processing');
    setIsProcessing(true);
    
    try {
      // Simulate API call to payment gateway
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random failure for demo (10% failure rate)
          const isSuccess = Math.random() > 0.1;
          isSuccess ? resolve() : reject(new Error("Payment gateway timeout"));
        }, 2000);
      });
      
      setPaymentStatus('success');
      setPaymentSuccess(true);
      clearCart();
      
      // Auto-close modal after success
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (error) {
      setPaymentStatus('failed');
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // ------------------ Download SVG helper ------------------
  const downloadSVG = () => {
    try {
      const container = document.getElementById("khqr-svg-container");
      if (!container) throw new Error("QR container not found");
      
      const svg = container.querySelector("svg");
      if (!svg) throw new Error("SVG not found");

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `KHQR_${MERCHANT.merchantId}_${totalPrice.toFixed(2)}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert("KHQR code downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download QR code. Please try again.");
    }
  };

  // Copy KHQR string to clipboard
  const copyKHQRString = () => {
    const khqr = generateKHQRData();
    if (khqr && navigator.clipboard) {
      navigator.clipboard.writeText(khqr)
        .then(() => alert("KHQR string copied to clipboard!"))
        .catch(() => alert("Failed to copy to clipboard"));
    } else {
      alert("Clipboard not available");
    }
  };

  // Format currency display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: MERCHANT.currency,
    }).format(amount);
  };

  return (
    <>
      <Headercomponent />

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-4">Your Shopping Cart</h3>
            <hr />

            {cart.length === 0 ? (
              <div className="text-center py-5">
                <div className="text-muted fs-1 mb-3">🛒</div>
                <h5 className="text-muted">Your cart is empty</h5>
                <p className="text-muted">Add some products to get started!</p>
                <a href="/products" className="btn btn-primary mt-3">
                  Continue Shopping
                </a>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ 
                                  width: "80px", 
                                  height: "80px", 
                                  objectFit: "cover" 
                                }}
                                className="rounded me-3"
                              />
                              <div>
                                <h6 className="mb-1">{item.name}</h6>
                                {item.color && (
                                  <small className="text-muted">Color: {item.color}</small>
                                )}
                                {item.size && (
                                  <small className="text-muted ms-2">Size: {item.size}</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="fw-semibold">
                            {formatCurrency(item.price)}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => decreaseQty(item.id)}
                                disabled={item.qty <= 1}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                -
                              </button>
                              <span className="mx-3 fw-semibold">{item.qty}</span>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => increaseQty(item.id)}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold text-primary">
                            {formatCurrency(item.price * item.qty)}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <FontAwesomeIcon icon={faTrash} className="me-1" />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row mt-4">
                  <div className="col-md-8">
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => window.history.back()}
                      >
                        ← Continue Shopping
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={clearCart}
                      >
                        Clear Entire Cart
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Total Amount:</h5>
                          <h4 className="mb-0 text-success">
                            {formatCurrency(totalPrice)}
                          </h4>
                        </div>
                        <button 
                          className="btn btn-success w-100 py-2"
                          onClick={handleCheckout}
                          aria-label={`Checkout with total ${formatCurrency(totalPrice)}`}
                        >
                          <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===================== Enhanced Payment Modal ===================== */}
      {showModal && (
        <div 
          className="modal show fade" 
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          id="payment-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="paymentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title" id="paymentModalLabel">
                  Complete Your Purchase
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleClose}
                  disabled={isProcessing}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {/* Payment Status Alerts */}
                {paymentStatus === 'failed' && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <div className="flex-grow-1">
                      <h6 className="alert-heading mb-1">Payment Failed</h6>
                      <p className="mb-0">Please try again or use a different payment method.</p>
                    </div>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setPaymentStatus('idle')}
                      aria-label="Dismiss"
                    ></button>
                  </div>
                )}

                {paymentSuccess ? (
                  <div className="text-center py-4">
                    <div className="text-success mb-3" style={{ fontSize: '4rem' }}>✅</div>
                    <h4 className="text-success mb-3">Payment Successful!</h4>
                    <p className="text-muted mb-3">
                      Thank you for your purchase. Your order has been confirmed.
                    </p>
                    <div className="alert alert-info text-start">
                      <small>
                        <strong>Order Details:</strong><br />
                        • Total Paid: {formatCurrency(totalPrice)}<br />
                        • Payment Method: {paymentMethod === 'aba' ? 'KHQR' : 'Cash on Delivery'}<br />
                        • You will receive an email confirmation shortly.
                      </small>
                    </div>
                    <button 
                      className="btn btn-primary mt-3"
                      onClick={handleClose}
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Order Summary */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="card-title">Order Summary</h6>
                        <div className="d-flex justify-content-between">
                          <span>Items ({cart.length})</span>
                          <span>{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Shipping</span>
                          <span className="text-success">Free</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                          <span>Total</span>
                          <span className="text-primary">{formatCurrency(totalPrice)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-4">
                      <h6 className="mb-3">Select Payment Method</h6>
                      
                      <div className="form-check mb-3">
                        <input
                          type="radio"
                          id="aba"
                          name="payment"
                          value="aba"
                          checked={paymentMethod === "aba"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-check-input"
                          disabled={isProcessing}
                        />
                        <label htmlFor="aba" className="form-check-label fw-semibold">
                          🏦 ACCEDA KHQR Payment
                        </label>
                        <small className="form-text text-muted d-block">
                          Scan QR code with ABA Mobile app for instant payment
                        </small>
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
                          disabled={isProcessing}
                        />
                        <label htmlFor="cod" className="form-check-label fw-semibold">
                          🚚 Cash on Delivery
                        </label>
                        <small className="form-text text-muted d-block">
                          Pay cash when you receive your order
                        </small>
                      </div>
                    </div>

                    {/* Payment Method Content */}
                    {paymentMethod === "aba" && (
                      <div className="border rounded p-4 bg-light">
                        <div className="text-center">
                          {/* KHQR Header */}
                          <div className="mb-3 p-3 bg-white rounded border">
                            <h6 className="mb-1 text-primary fw-bold">ACCEDA BANK</h6>
                            <p className="small mb-1 text-muted">Scan. Pay. Done.</p>
                            <hr className="my-2" />
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="small fw-bold">{MERCHANT.merchantId}</span>
                              <span className="small text-muted">Member of KHQR</span>
                            </div>
                            <div className="mt-2">
                              <small className="fw-semibold">
                                Amount: {formatCurrency(totalPrice)}
                              </small>
                            </div>
                          </div>

                          <p className="mb-3">Scan this KHQR code with your ABA Mobile app:</p>

                          {/* QR Code Container */}
                          {(() => {
                            const qrData = generateKHQRData();
                            return qrData ? (
                              <>
                                <div
                                  id="khqr-svg-container"
                                  className="border rounded p-3 d-inline-block mb-3 bg-white"
                                  ref={qrSvgRef}
                                >
                                  <QRCodeSVG
                                    value={qrData}
                                    size={200}
                                    level="M"
                                    includeMargin={true}
                                  />
                                </div>

                                <div className="d-flex gap-2 justify-content-center mb-3 flex-wrap">
                                  <button 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={downloadSVG}
                                    disabled={isProcessing}
                                  >
                                    Download QR Code
                                  </button>
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={copyKHQRString}
                                    disabled={isProcessing}
                                  >
                                    Copy KHQR Data
                                  </button>
                                </div>

                                {/* <div className="alert alert-info small text-start">
                                  <strong>How to pay:</strong><br />
                                  1. Open ABA Mobile app<br />
                                  2. Tap 'Scan & Pay'<br />
                                  3. Scan the QR code above<br />
                                  4. Confirm payment details
                                </div> */}
                              </>
                            ) : (
                              <div className="alert alert-warning">
                                Unable to generate QR code. Please try again.
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="border rounded p-4 bg-light text-center">
                        <div className="fs-1 mb-3">🚚</div>
                        <h6 className="mb-3">Cash on Delivery</h6>
                        <p className="mb-3">
                          Pay with cash when your order is delivered to your doorstep.
                        </p>
                        <div className="alert alert-warning small text-start">
                          <strong>Note:</strong> Please have exact change ready. 
                          Delivery may be delayed if payment is not available.
                        </div>
                      </div>
                    )}

                    {/* Loading Spinner */}
                    {isProcessing && (
                      <div className="text-center py-3">
                        <FontAwesomeIcon 
                          icon={faSpinner} 
                          spin 
                          className="text-primary me-2"
                          size="lg"
                        />
                        <span>Processing your payment...</span>
                        <div className="progress mt-2">
                          <div 
                            className="progress-bar progress-bar-striped progress-bar-animated" 
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Modal Footer */}
              {!paymentSuccess && !isProcessing && (
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleClose}
                    disabled={isProcessing}
                  >
                    Cancel Order
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handlePayment}
                    disabled={isProcessing || paymentStatus === 'processing'}
                  >
                    {paymentMethod === 'aba' ? 'Confirm KHQR Payment' : 'Place COD Order'} 
                    {' '}({formatCurrency(totalPrice)})
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