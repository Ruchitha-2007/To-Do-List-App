import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'

const ProtectedRoute=({children})=>{
    const {user}=useContext(AuthContext)
    if(!user) return(
        <>
            <p>Please login first!</p><br />
            <Navigate to='/login' replace />
        </>
    ) 
    return children
}
export default ProtectedRoute;