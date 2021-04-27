import React from 'react';
import { AddToCartButton, CartDropdown } from './../../../Styles/Overview';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSize: 'Select a size',
      quantity: 'Qty: --',
      max: 0,
      totalStock: 0,
      toAdd: 0,
      warning: '',
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQtySelect = this.handleQtySelect.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.styles[this.props.currStyle].style_id !== nextProps.styles[nextProps.currStyle].style_id) {
      return true;
    }
    if (this.state.currSize !== nextState.currSize) {
      return true;
    }
    if (this.state.quantity !== nextState.quantity) {
      return true;
    }
    if (this.state.warning !== nextState.warning) {
      return true;
    }
    console.log('AddToCart did not re-render');
    return false;
  }

  componentDidMount() {
    this.props.setCart(this.props.store);
  }

  handleSizeSelect(event) {
    event.preventDefault();
    let skus = this.props.styles[this.props.currStyle].skus;
    let quantity = skus[event.target.value].quantity;
    let inCart = Number(window.localStorage.getItem(skus[event.target.value].sku));
    let max = quantity - inCart > 15 ? 15: quantity - inCart;
    let array = [];
    for (let i = 1; i <= max; i++) {
      array.push(i);
    }
    var string = array.length === 0 ? 'Qty: 0': 'Qty: 1';
    this.setState({
      currSize: `Size: ${skus[event.target.value].size}`,
      quantity: string,
      max: array,
      totalStock: quantity,
      toAdd: skus[event.target.value].sku,
      warning: '',
    });
  }

  handleQtySelect(event) {
    event.preventDefault();
    this.setState({
      quantity: event.target.value,
    });
  }

  handleAddCart() {
    if (this.state.currSize === 'Select a size') {
      this.setState({
        warning: 'Please select a size',
      })
    } else if (this.state.quantity === 'Qty: 0') {
      this.setState({
        warning: 'All available stock in cart',
      });
    } else {
      let cart = this.props.cart;
      var cartQty = (cart[this.state.toAdd] === undefined)? 0: cart[this.state.toAdd];
      var addQty = Number(this.state.quantity.slice(5));
      if ( (cartQty + addQty) >= this.state.totalStock) {
        cart[this.state.toAdd] = this.state.totalStock;
      } else if (cartQty > 0) {
        cart[this.state.toAdd] = cartQty + addQty;
      }  else {
        cart[this.state.toAdd] = addQty;
      }
      var newQty = cart[this.state.toAdd];
      var size = this.state.currSize.slice(6);
      var style = this.props.styles[this.props.currStyle].name;
      var title = this.props.title;
      window.localStorage.setItem('cart', JSON.stringify(cart));
      this.props.setCart();
      this.setState({
        currSize: 'Select a size',
        quantity: 'Qty: --',
        max: 0,
        toAdd: 0,
        warning: `${newQty}x ${size} ${title} (${style}) now in cart`,
      });
    }
  }

  render() {
    const skus = this.props.styles[this.props.currStyle].skus;
    const grid = {
      display: 'grid',
      gridTemplateAreas: `
        "size size qty qty"
        "warning warning warning warning"
        "cart cart cart share"
      `,
      gridTemplateRows: '45% 10% 45%',
      gridTemplateColumns: 'repeat(4, 24%)',
      columnGap: '5px',
      rowGap: '2px',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      flexGrow: 3,
    }
    const red = {
      color: 'red',
      fontSize: '65%',
      gridArea: 'warning',
    }

    const disabled = {
      opacity: '50%',
    }

    if (this.props.outOfStock) {
      return (
        <>
        <div id="addcart" style={grid}>
          <CartDropdown
            readOnly
            id="size"
            style={Object.assign({}, disabled, {gridArea: 'size'})}
            value="Size: --">
              <option value='0' disabled >Size: --</option>
          </CartDropdown>
          <CartDropdown
            readOnly
            id="qty"
            style={Object.assign({}, disabled, {gridArea: 'qty'})}
            value="Qty: --">
              <option value='0' disabled >Qty: --</option>
          </CartDropdown>
        <div style={red}>
          {this.props.styles[0].name === null ? '': 'Out of Stock'}
        </div>
        <AddToCartButton
          style={Object.assign({}, disabled, {gridArea: 'cart'})}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>
        <AddToCartButton style={{ gridArea: 'share' }}>share</AddToCartButton>
        </div>
        </>
      );
    } else if (this.state.currSize === 'Select a size') {

      return (
        <>
        <div id="addcart" style={grid}>
          <CartDropdown
            style={{ gridArea: 'size' }}
            id="size"
            value={this.state.currSize}
            onChange={(event) => this.handleSizeSelect(event)}>
              <option
                value={this.state.currSize}>
                  {this.state.currSize}
              </option>
              {skus.map((sku, index) => {
                if (sku.quantity > 0) {
                  return (
                    <option
                      key={sku.sku}
                      value={index}>
                        {sku.size}
                    </option>
                  );
                }
              })}
          </CartDropdown>
          <CartDropdown
            style={{ gridArea: 'qty' }}
            readOnly id="qty"
            disabled
            value={this.state.quantity}>
              <option value={this.state.quantity}>
                {this.state.quantity}
              </option>
          </CartDropdown>
        <div style={red}>{this.state.warning}</div>
        <AddToCartButton
          style={{ gridArea: 'cart' }}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>
        <AddToCartButton style={{ gridArea: 'share' }}>share</AddToCartButton>
        </div>
        </>
      );

    } else {

      return(
        <>
        <form id="addcart" style={grid}>
          <CartDropdown
            id="size"
            style={{ gridArea: 'size' }}
            value={this.state.currSize}
            onChange={(event) => this.handleSizeSelect(event)}>
              <option
                defaultValue
                value={this.state.currSize}>
                  {this.state.currSize}
              </option>
              {skus.map((sku, index) => {
                if (sku.quantity > 0) {
                  return (
                    <option
                      key={sku.sku}
                      value={index}>
                        {sku.size}
                    </option>
                  );
                }
              })}
          </CartDropdown>
          <CartDropdown
            id="qty"
            style={{ gridArea: 'qty' }}
            value={this.state.quantity}
            onChange={(event) => this.handleQtySelect(event)}>
              <option
                defaultValue
                value={this.state.quantity}>
                  {this.state.quantity}
              </option>
              {this.state.max.map((num) => {
                return (
                  <option
                      key={num}
                      value={`Qty: ${num}`}>
                        {num}
                    </option>
                )
              })}
          </CartDropdown>
        <div style={red}>{this.state.warning}</div>
        <AddToCartButton
          style={{ gridArea: 'cart' }}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>
        <AddToCartButton style={{ gridArea: 'share' }}>share</AddToCartButton>
        </form>
        </>
      );
    }
  }
}

export default AddToCart;