const initState = {lang: "english"};

export const langReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return {lang: action.lang}
        default:
            return state;
    }
}