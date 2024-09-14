import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("User registered successfully");
    } else {
      alert("Failed to register");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='username' onChange={handleChange} placeholder='Username' />
      <input name='email' onChange={handleChange} placeholder='Email' />
      <input
        name='password'
        type='password'
        onChange={handleChange}
        placeholder='Password'
      />
      <button type='submit'>Register</button>
    </form>
  );
}
