import React, { useEffect, useState } from 'react';
import { withRouter}  from 'react-router';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import CustOrderItem from './CustOrderItem';


const ReviewOrder = (props) => {
    const { language } = props;
    const [errorMsg, setError] = useState(null);
    const [itemElements, setItemElements] = useState([]);
    const currentDayStr = dayjs().format('');

    const fetchOrder = () => {
        return new Promise( (resolve, reject) => {
            database.ref(`orders/${currentDayStr}`).once("value")
                .then( snapshot => {
                    const orders = snapshot.val();
                    const tableNum = props.match.params.number.indexOf("C") > -1 ? props.match.params.number.replace("C","門口") : props.match.params.number;

                    if (orders) {
                        for (let i = 0; i < orders.length; i++) {
                            console.log(orders[i])
                            if (tableNum === orders[i].table) {
                                resolve(orders[i]);
                            }
                        }
                    }
                    reject("no order")
                })
                .catch( err => reject(err));
        })
    }
    const renderOrder = () => {
        if (props.location.state) {
            return buildItemElements(props.location.state.order.orderItems);
        } else {
            fetchOrder().then( fetchedOrder => {
                return buildItemElements(fetchedOrder.orderItems);
            }).catch( (err) => {
                if (err === "no order") {
                    setError("No order exists!");
                }
            })
        }
    }
    const buildItemElements = (orders) => {
        let itemElements = [];
        for (let i = 0; i < orders.length; i++) {
            itemElements.push(<CustOrderItem key={`${i}/item`} language={language} itemData={orders[i]}/>)
        }
        setItemElements(itemElements);
    }
    
    useEffect(() => {
        renderOrder();
    }, [])
    return (
        <div>
            <div>
                <h2>{errorMsg}</h2>
                {itemElements}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang
})

export default withRouter(connect(mapStateToProps)(ReviewOrder));