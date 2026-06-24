import { useContext } from "react";
import CartContext from "../store/CartContext";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";

function Cart({ show, handleClose }) {
  const { cartItems, removeItem, updateQuantity, clearCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    alert("Thanks for the purchase");
    clearCart();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="cart-offcanvas"
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="cart-header-title text-uppercase w-100 text-center fw-bold">
          Cart
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          {/* Column Headers */}
          <Row className="cart-table-header text-center fw-bold mx-0">
            <Col xs={5} className="text-start ps-0">
              Item
            </Col>
            <Col xs={3}>Price</Col>
            <Col xs={4} className="pe-0 text-end">
              Quantity
            </Col>
          </Row>

          {/* Cart Elements */}
          {cartItems.length === 0 ? (
            <div className="text-center my-5 text-muted py-5">
              <span className="fs-5 d-block mb-3">Your cart is empty</span>
              <Button variant="outline-secondary" onClick={handleClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <Row key={index} className="cart-item-row mx-0 py-3">
                {/* Item Details */}
                <Col xs={5} className="d-flex align-items-center ps-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-img me-2"
                  />
                  <span
                    className="cart-item-title text-truncate d-inline-block"
                    style={{ maxWidth: "85px" }}
                    title={item.title}
                  >
                    {item.title}
                  </span>
                </Col>

                {/* Price */}
                <Col xs={3} className="text-center px-0">
                  <span className="cart-item-price font-monospace">
                    ${item.price}
                  </span>
                </Col>

                {/* Quantity and Actions */}
                <Col
                  xs={4}
                  className="d-flex align-items-center justify-content-end pe-0 gap-2"
                >
                  <Form.Control
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.title,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="cart-quantity-input px-1"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="cart-remove-btn text-uppercase"
                    onClick={() => removeItem(item.title)}
                  >
                    REMOVE
                  </Button>
                </Col>
              </Row>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4 pt-3 border-top bg-white">
            <div className="cart-total-section d-flex justify-content-between align-items-center mb-4">
              <span>Total:</span>
              <span className="text-primary font-monospace">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="text-center mb-3">
              <Button
                className="cart-purchase-btn w-100 py-3 text-uppercase fw-bold"
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </div>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;