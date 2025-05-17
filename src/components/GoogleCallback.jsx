import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function GoogleCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');
    
        if (error) {
            toast.error(error);
            navigate('/login');
            return;
        }

        if (token){
            localStorage.setItem('token', token);

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                toast.success('Inicio de sesión con Google exitoso!');
                
                if (payload.user_role === 'Administrador') {
                    navigate('/AdminDashboard');
                } else {
                    navigate('/profile');
                }   
            } catch (e) {
                toast.error('Error procesando la autenticación');
                navigate('/login');
            }
        } else {
            toast.error('No se recivio el token de autenticación de Google');
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Procesando autenticación con Google...</h1>
                <p>Por favor espera mientras te redirigimos.</p>
            </div>
        </div>
    )
}