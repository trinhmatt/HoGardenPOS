// Calculates price of item as user selects choices
export const calculateItemPrice = (item) => {
    let totalPrice = item.price;
    let qtyCopy = 1;
    
    if (item.drinkChoice) {
        if (item.drinkChoice.comboHot) {
            totalPrice += item.drinkChoice.comboHot;
        }
    }
    if (item.addOn && item.addOn.length > 0) {
        for (let i = 0; i < item.addOn.length; ++i) {
            if (item.addOn[i].qty !== undefined) {
                totalPrice += (item.addOn[i].price * item.addOn[i].qty);
            } else if (item.addOn[i].price !== undefined) {
                totalPrice += item.addOn[i].price;
            }
        }
    }
    if (item.qty > 0) {
        qtyCopy = item.qty;
    }
    return totalPrice * qtyCopy;
}