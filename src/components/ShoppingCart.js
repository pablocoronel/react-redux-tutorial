import React from 'react';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
// Ya no es necesario el store
import {removeFromCart} from '../actionCreators.js';
import {connect} from 'react-redux';

const styles = {
  footer: {
    fontWeight: 'bold'
  }
}


// Deja de ser una clase, es una funcion ahora, se borra el constructor
// const ShoppingCart = (props) => {

// Parte el parametro 'props' en sus llaves (destructurar un argumento en ES6)
const ShoppingCart = ({cart, removeFromCart}) => {

    return (
      <Panel header="Shopping Cart">
        <Table fill>
          <tbody>
            {cart.map(product =>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="text-right">${product.price}</td>
                <td className="text-right"><Button bsSize="xsmall" bsStyle="danger" onClick={() => removeFromCart(product)}><Glyphicon glyph="trash" /></Button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={styles.footer}>
                Total: ${cart.reduce((sum, product) => sum + product.price, 0)}
              </td>
            </tr>
          </tfoot>
        </Table>

      </Panel>
    )

  // quitado el dispatch
}

// mapeo del estado
const mapStateToProps = (state) => {
  return {
    cart : state.cart
  }
}

// mapeo del dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart(product) {
      dispatch(removeFromCart(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
