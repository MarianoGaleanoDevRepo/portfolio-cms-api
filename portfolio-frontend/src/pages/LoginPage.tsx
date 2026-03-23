import { useState } from "react";
import { login } from "../api/authApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const handleLogin = async () => {
    try {
      const response = await login({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("email", response.email);

      alert("Login correcto");
     navigate("/projects")
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
      <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-violet-700/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-indigo-700/20 blur-3xl" />

      <div className="w-full max-w-md">
        <Card>
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-violet-400">
              Portfolio CMS
            </p>
            <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Inicia sesión para administrar tu portafolio
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin}>Iniciar sesión</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;