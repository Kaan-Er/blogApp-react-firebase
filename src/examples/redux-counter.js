import {createStore} from "redux";

const initialState = {
    count: 0,
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            const incrementBy =
                typeof action.incrementBy === "number" ? action.incrementBy : 1;
            return { count: state.count + incrementBy };
        case "DECREMENT":
            return { count: state.count - 1 };
        case "RESET":
            return { count: 0 };
        default:
            return state;
    }
}

const store = createStore(counterReducer);

store.subscribe(() => {
    console.log(store.getState());
}); //state'de değişiklik meydana geldiğinde otomatik olarak çalışacak.

store.dispatch({
    incrementBy: 10,
    type: "INCREMENT",
});

store.dispatch({
    type: "DECREMENT",
});

store.dispatch({
    type: "RESET",
});