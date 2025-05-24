export async function Autenticar(valores) {
  try {
    const temp = await fetch("http://localhost:5000/usuarios/login", {
      method: 'POST',
      body: JSON.stringify(valores),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await temp.json(); // Siempre parseamos el JSON

    // Devolvemos un objeto con toda la información importante
    return {
      status: temp.status, 
      ok: temp.ok, 
      data: data 
    };
    
  } catch (error) {
    console.error('Error de red:', error);
    return {
      status: 0, // Status 0 indica error de red
      ok: false,
      error: 'Error de conexión'
    };
  }
  }
  