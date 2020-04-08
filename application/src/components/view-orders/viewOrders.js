import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import { connect } from 'react-redux';
import { setEditOrder, deleteOrder } from "../../redux/actions/orderActions";
import './viewOrders.css';

const mapActionsToProps = dispatch => ({
    commenceSetEditOrder: (order) => dispatch(setEditOrder(order)),
    commenceDeleteOrder: (id) => dispatch(deleteOrder(id))
  })

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    setOrder(order) {
        this.props.commenceSetEditOrder(order);
        this.props.history.push("/order");
    }

    deleteOrder(id) {
        this.props.commenceDeleteOrder(id).then(response => {
            response.success
                ? this.setState(prevState => ({ orders: prevState.orders.filter((order) => order._id !== id) }))
                : console.error("Error: unable to delete order.");
        })
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" onClick={() => this.setOrder(order)}>Edit</button>
                                     <button className="btn btn-danger" onClick={() => this.deleteOrder(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default connect(null, mapActionsToProps)(ViewOrders);
