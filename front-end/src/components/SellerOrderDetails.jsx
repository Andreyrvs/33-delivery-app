import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import '../css/OrderDetailsPage.css';
import { fetchAll } from '../services/connectApi';
import { changeString, formattedNumber } from '../util/changeNumber';
import SellerHeaderOrderDetails from './SellerHeaderOrderDetails';

export default function SellerOrderDetails() {
  const { orderSelected } = useContext(MyContext);
  const [order, setOrder] = useState();

  const MOCK = [{
    id: 1,
    name: 'Algo pra teste',
    qtd: 2,
    price: 1.20,
    totalPrice: 2.40,
  }];

  const getOrderSelected = async () => {
    // console.log('id', orderSelected);
    const URL = `http://localhost:3001/orders/${orderSelected.id}`;
    const result = await fetchAll(URL);
    setOrder(result);
  };

  useEffect(() => {
    getOrderSelected();
  }, []);

  return (
    <section className="checkout">
      <section className="finalize-order">
        <p className="finalize-order-text">Detalhe do Pedido</p>
      </section>
      <SellerHeaderOrderDetails />
      <section className="checkout-container">
        <section className="checkout-titulo">
          <section className="titulo-left-container">
            <p className="titulo-left">Item</p>
            <p className="titulo-descricao">Descrição</p>
          </section>
          <section className="titulo-right-container">
            <p className="titulo-right">Quantidade</p>
            <p className="titulo-right">Valor Unitário</p>
            <p className="titulo-right">Sub-total</p>
            <p className="titulo-remover">Remover Item</p>
          </section>
        </section>
        { MOCK && order && (
          MOCK.map((item, index) => (
            <section key={ order.id } className="item-container">
              <section className="left-container">
                <section
                  className="item-number"
                >
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}

                  </p>
                </section>
                <section
                  className="item-description"
                >
                  <p
                    data-testid={ `seller_order_details__element-order-table-name
                    -${index}` }
                  >
                    {item.name}

                  </p>
                </section>
              </section>
              <section className="right-container">
                <section className="item-quantity">
                  <p
                    className="quantity-text"
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {item.qtd}

                  </p>
                </section>
                <section className="item-price">
                  <p
                    className="price-text"
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {formattedNumber(item.price)}

                  </p>
                </section>
                <section className="item-total-price">
                  <p
                    className="total-price-text"
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    {formattedNumber(item.totalPrice)}
                  </p>
                </section>
              </section>
            </section>
          ))
        ) }
        <section className="checkout-total-container">

          <section className="checkout-total">
            <p
              className="checkout-total-text"
              data-testid="seller_order_details__element-order-total-price"
            >
              {order && changeString(order.totalPrice)}
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
