import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("Mensagem enviada com sucesso!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Erro ao enviar mensagem.");
      }
    } catch (err) {
      setStatus("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Mensagem" value={form.message} onChange={handleChange} required />
      <button type="submit">Enviar</button>
      <p>{status}</p>
    </form>
  );
}
