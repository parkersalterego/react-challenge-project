import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { SERVER_IP } from '../../private';
import { clearEditOrder, editOrder } from '../../redux/actions/orderActions';
import './orderForm.css';

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`

const mapActionsToProps = dispatch => ({
    commenceClearEditOrder: () => dispatch(clearEditOrder()),
    commenceEditOrder: (order) => dispatch(editOrder(order))
})

const mapStateToProps = state => ({
    auth: state.auth,
    order: state.order
})

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditOrder: false,
            order_item: "",
            quantity: "1"
        }
    }

    componentWillMount() {
        const order = this.props.order;
        if (order && order.order_item && order.quantity) {
            this.setState({ isEditOrder: true, quantity: this.props.order.quantity, order_item: this.props.order.order_item });
        }
    }

    componentWillUnmount() {
        if (this.props.order) {
            this.props.commenceClearEditOrder();
        }
    }

    menuItemChosen(event) {
        this.setState({ order_item: event.target.value });
    }

    menuQuantityChosen(event) {
        this.setState({ quantity: event.target.value });
    }

    onOrderButtonClick(event) {
        event.preventDefault();
        const order = {
            order_item: this.state.order_item,
            quantity: this.state.quantity,
            ordered_by: this.props.auth.email || 'Unknown!',
        };
        if (this.state.isEditOrder) {
            this.props.commenceEditOrder({ ...order, id: this.props.order._id }).then(result => {
                result.success 
                    ? this.props.history.push("view-orders")
                    : console.error("Error: Unable to submit order");
            })
        } else {
            this.submitOrder(order);
        }
    }

    submitOrder(order) {
        if (this.state.order_item === "") return;
        fetch(ADD_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                <div className="form-wrapper">
                    <form>
                    <label className="form-label">{ `I'd like to ${ this.state.isEditOrder ? "change my order to" : "order" }...` }</label><br />
                        <select 
                            value={this.state.order_item} 
                            onChange={(event) => this.menuItemChosen(event)}
                            className="menu-select"
                        >
                            <option value="" defaultValue disabled hidden>Lunch menu</option>
                            <option value="Soup of the Day">Soup of the Day</option>
                            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                            <option value="Chili Con Carne">Chili Con Carne</option>
                        </select><br />
                        <label className="qty-label">Qty:</label>
                        <select value={this.state.quantity} onChange={(event) => this.menuQuantityChosen(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <button
                            type="button"
                            className="order-btn"
                            onClick={(event) => this.onOrderButtonClick(event)}
                            >{ this.state.isEditOrder ? "Edit Order" : "Order It!" }</button>
                    </form>
                </div>
            </Template>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrderForm);