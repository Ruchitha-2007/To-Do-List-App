import {createContext,useEffect,useState} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [accessToken,setAccessToken]=useState(null)

    useEffect(() => {
        console.log("User:", user);
        console.log("Access Token:", accessToken);
      }, [user, accessToken]);
      

    useEffect(()=>{
        //when a page is refreshed , refreshToken come into use
        if(window.location.pathname==='/login') return;
        const refresh=async()=>{
            try{
                const res=await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`,{
                    withCredentials:true
                })
                setAccessToken(res.data.accessToken);
                const decoded=jwtDecode(res.data.accessToken)
                setUser({email:decoded.email})
            }catch(err){
                setUser(null);
            }
        }
        refresh();
    },[])

    const login=(token,email)=>{
        setAccessToken(token);
        setUser({email});
    }

    const logout=async()=>{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true });
        setUser(null)
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{user,login,logout,accessToken}}>
            {children}
        </AuthContext.Provider>
    )

}