import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const gerar = async () => {
    const res = await fetch("/api/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    const corte = data.peticao.split("DO DIREITO")[0];
    setPreview(corte);
  };

  return (
    <div style={{padding:20}}>
      <h1>Te cobraram indevidamente? Gere sua petição</h1>

      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="cpf" placeholder="CPF" onChange={handleChange} />
      <input name="reu" placeholder="Empresa" onChange={handleChange} />
      <textarea name="problema" placeholder="Descreva o problema" onChange={handleChange} />

      <button onClick={gerar}>Gerar Petição</button>

      {preview && (
        <div>
          <h3>Prévia</h3>
          <textarea value={preview} readOnly style={{width:"100%", height:200}} />

          <a href="https://buy.stripe.com/test_link" target="_blank">
            <button>Desbloquear por R$19,90</button>
          </a>
        </div>
      )}
    </div>
  );
}
