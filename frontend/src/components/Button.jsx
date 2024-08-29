import { useNavigate } from "react-router-dom";

export const Button = (props) => {
    const navigate = useNavigate();
    
    const {routename, buttonname} = props
    
    const redirectUrl = ()=>{
        navigate("/game")
    }
    return <button onClick={redirectUrl} className="px-8 py-4 text-2xl bg-green-500
    hover:bg-green-700 text-white
    font-bold rounded">
        {buttonname}
    </button>
}