import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de autenticação
        console.log("Email:", email);
        console.log("Senha:", senha);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Faça seu login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Senha:</label><br />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
