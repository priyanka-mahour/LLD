import { Provider } from 'react-redux'
import store from './../pages/redux-toolkit/store'
import ReduxComp from './comp-to-pass-state/index'

const reduxPage = () => {
    return (
        <Provider store={store}>
            <ReduxComp/>
        </Provider>
    )
}

export default reduxPage
