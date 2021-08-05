const INIT_STATE= {
    
    isFetching: false,
    message: '',
    messageType: '',
}

export const authReducer = (state = INIT_STATE , action) => {
    switch(action.type){
        case 'LOGIN_STARTED':
            return{
                ...state,
                isFetching: true
            }
        case 'CREATE_USER':
            return {
                ...state,
                userLoginData: action.newUser,
                isLogged: true,
                isFetching: false,
            }
        case 'VALIDATED_USER':
            return{
                ...state,
                userLoginData: action.oldUser,
                isLogged: true,
                isFetching: false,
                
            }
        case 'INCORRECT_CREDENTIALS':
            return{
                ...state,
                isFetching: false,
            }
        case 'LOGGED_OUT':
            return{
                ...state,
                isLogged: false
            }
        default:
            return state
    }
}