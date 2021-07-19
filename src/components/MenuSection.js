import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'; 

const MenuSection = (props) => {
    const ref = useRef(null);
    const { data, language } = props;
    const [items, setItems] = useState({});
    const [displaySection, setDisplay] = useState(false);
    useEffect(() => {
        let items = {};
        for (const item in data.menuItems) {
            items[item] = {
                ...data.menuItems[item],
                qty: 0
            }
        }
        setItems(items);
    }, [])
    const renderItems = () => {
        let elements = [];
        if (Object.keys(items).length > 0) {
            for (const item in items) {
                elements.push(
                    <div key={item}>
                        <p>{items[item][language]} {items[item].qty > 0 && <span>{items[item].qty}</span>}</p>
                        <p>{items[item].price}</p>
                    </div>
                )
            }
        }
        return elements;
    }
    const showDisplay = () => {
        ref.current.focus()
        setDisplay(!displaySection);
    }
    return (
        <div ref={ref}>
            <h1 onClick={showDisplay}>{data.title[language]}</h1>
            <div style={{display: displaySection ? "inline-block" : "none"}}>
                {renderItems()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang
})

export default connect(mapStateToProps)(MenuSection);