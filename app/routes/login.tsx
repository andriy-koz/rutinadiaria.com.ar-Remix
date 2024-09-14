import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Guardar el JWT
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='username' onChange={handleChange} placeholder='Username' />
      <input
        name='password'
        type='password'
        onChange={handleChange}
        placeholder='Password'
      />
      <button type='submit'>Login</button>
    </form>
  );
}
