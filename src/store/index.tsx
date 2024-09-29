import { FC, createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { Product } from "../models/product";
import { reducer, initialState } from "./reducer";
import { ContextType, ActionTypes} from "./contextTypes";
import { useActions } from "./actions";

type Props = {
    children: ReactNode
}

const Context = createContext<ContextType | undefined>(undefined)

const ContextProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = useActions(state, dispatch)

    //effect to filter
    useEffect(() => {
        let newProducts: Product[] = state.items;

        if(state.categoryFilter !== "") newProducts = newProducts.filter(item => item.category.name.toLowerCase().includes(state.categoryFilter.toLowerCase()))
        if(state.searchInput !== '') newProducts = newProducts.filter(item => item.title.toLowerCase().includes(state.searchInput.toLowerCase()));
        
        dispatch({type: ActionTypes.setFilteredProducts, payload: newProducts})
    }, [state.items, state.searchInput, state.categoryFilter])

    return (
        <Context.Provider value={{ state, actions }}>
            {children}
        </Context.Provider>
    )   
}

//hook for context value
const useContextProvider = (): ContextType => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('must be used within a Provider');
	}
	return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useContextProvider }