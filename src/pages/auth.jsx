import { useEffect } from "react";

function GoogleAuth({ onLogin }) {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "TU_GOOGLE_CLIENT_ID",
      callback: handleGoogleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    const user_number = prompt("Ingresa tu número de teléfono:");
    const user_direction = prompt("Ingresa tu dirección:");

    const res = await fetch("http://localhost:8000/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, user_number, user_direction }),
    });

    const data = await res.json();
    alert(data.message);
    if (onLogin) onLogin(data);
  };

  return <div id="google-login"></div>;
}

export default GoogleAuth;
