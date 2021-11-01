const initState = {printerReady: true};

export const statusReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PRINTER_STATUS":
            return {printerReady: action.status}
        default:
            return state;
    }
} 