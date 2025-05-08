export async function Sedes() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/sede");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    const sedesList = data.map(sede => sede.nombre);
   
    return sedesList;
  } catch (error) {
    console.error('Error al obtener las sedes:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};


export async function levantamientos() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
    const levList = data.map(lev => lev.idsede);

    // Recorre los levantamientos y cuenta cuántos hay por sede
    levList.forEach(lev => {
      if (lev === 1) levantamientosSede[0]++;
      else if (lev === 2) levantamientosSede[1]++;
      else if (lev === 3) levantamientosSede[2]++;
      else if (lev === 4) levantamientosSede[3]++;
      else if (lev === 5) levantamientosSede[4]++;
    });
    return levantamientosSede;
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};

export async function inclusiones() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let inclusionesSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
    const incList = data.map(lev => lev.idsede);

    // Recorre los levantamientos y cuenta cuántos hay por sede
    incList.forEach(lev => {
      if (lev === 1) inclusionesSede[0]++;
      else if (lev === 2) inclusionesSede[1]++;
      else if (lev === 3) inclusionesSede[2]++;
      else if (lev === 4) inclusionesSede[3]++;
      else if (lev === 5) inclusionesSede[4]++;
    });

    return inclusionesSede;
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};

export async function totallevantamientos() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let total = data.length; // Total de levantamientos

    return total.toString();
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};

export async function totalinclusiones() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let total = data.length; // Total de levantamientos
    return total;
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function levantamientosAprobados() {
  try{
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
    const levList = data.map(lev => lev.idsede);

    // Recorre los levantamientos y cuenta cuántos hay por sede
    levList.forEach(lev => {
      if (lev === 1) levantamientosSede[0]++;
      else if (lev === 2) levantamientosSede[1]++;
      else if (lev === 3) levantamientosSede[2]++;
      else if (lev === 4) levantamientosSede[3]++;
      else if (lev === 5) levantamientosSede[4]++;
    });
    console.log("levantamientos aprobados",levantamientosSede);
    return levantamientosSede;

  }
  catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};

export async function totallevAprobados() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let total = data.length; // Total de levantamientos
    return total.toString();
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function totallevRN() {
  try {
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos/rn");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    let total = data.length; // Total de levantamientos
    console.log("totallevRN",total);
    return total.toString();
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};