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


//estadisticas levantamientos
export async function levantamientos(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
          new Date("2025-02-17T00:00:00"),
          new Date("2025-06-13T23:59:59")
        ];
      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idsede); // Opcional: guardar IDs para traza
          }

      }
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede

      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
    else{
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      semestre = data.map(lev => lev.idsede); // Opcional: guardar IDs para traza

      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function totallevantamientos(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
        new Date("2025-02-17T00:00:00"),
        new Date("2025-06-13T23:59:59")
      ];

      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idformulario); // Opcional: guardar IDs para traza
          }

      }
      let total = semestre.length; 
      return total.toString();
    }
    else{
      let total = data.length;
      return total.toString();
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};



export async function levantamientosAprobados(semestral) {
  let semestre = [];
  try{
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
          new Date("2025-02-17T00:00:00"),
          new Date("2025-06-13T23:59:59")
        ];
      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idsede); // Opcional: guardar IDs para traza
          }

      }
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      semestre = data.map(lev => lev.idsede); // Opcional: guardar IDs para traza

      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
    else{
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      semestre = data.map(lev => lev.idsede); // Opcional: guardar IDs para traza
      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
  }

  }
  catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};

//trae todos los levantamientos aprobados para el grafico
export async function levantamientosAprobadosTotal(semestral) {
  let semestre = [];
  try{
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos/data");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
          new Date("2025-02-17T00:00:00"),
          new Date("2025-06-13T23:59:59")
        ];
      for (let i = 0; i < data.length; i++) {

        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idsede); // Opcional: guardar IDs para traza
          }

      }
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
    else{
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      semestre = data.map(lev => lev.idsede); // Opcional: guardar IDs para traza
    // Recorre los levantamientos y cuenta cuántos hay por sede
    semestre.forEach(lev => {
      if (lev === 1) levantamientosSede[0]++;
      else if (lev === 2) levantamientosSede[1]++;
      else if (lev === 3) levantamientosSede[2]++;
      else if (lev === 4) levantamientosSede[3]++;
      else if (lev === 5) levantamientosSede[4]++;
    });
    return levantamientosSede;
  }

  }
  catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};

export async function totallevAprobados(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
        new Date("2025-02-17T00:00:00"),
        new Date("2025-06-13T23:59:59")
      ];

      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idformulario); // Opcional: guardar IDs para traza
          }

      }
      let total = semestre.length; 
      return total.toString();
    }
    else{
      let total = data.length;
      return total.toString();
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function totallevRN(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/levantamientos/rn");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
        new Date("2025-02-17T00:00:00"),
        new Date("2025-06-13T23:59:59")
      ];

      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idformulario); // Opcional: guardar IDs para traza
          }

      }
      let total = semestre.length; // Total de levantamientos
      return total.toString();
    }
    else{
      let total = data.length; // Total de levantamientos
      return total.toString();
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


//estadisticas inclusiones
export async function inclusiones(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
          new Date("2025-02-17T00:00:00"),
          new Date("2025-06-13T23:59:59")
        ];
      for (let i = 0; i < data.length; i++) {

        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idsede); // Opcional: guardar IDs para traza
          }

      }
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
    else{
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
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function totalinclusiones(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
        new Date("2025-02-17T00:00:00"),
        new Date("2025-06-13T23:59:59")
      ];

      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idformulario); // Opcional: guardar IDs para traza
          }

      }
      let total = semestre.length; 
      return total.toString();
    }
    else{
      let total = data.length;
      return total.toString();
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};


export async function inclusionesAprobadas(semestral) {
  let semestre = [];
  try{
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
          new Date("2025-02-17T00:00:00"),
          new Date("2025-06-13T23:59:59")
        ];
      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        } 
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idsede); // Opcional: guardar IDs para traza
          }

      }
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
    }
    else{
      let levantamientosSede = [0, 0, 0, 0, 0]; // Inicializa un arreglo para contar los levantamientos por sede
      semestre = data.map(lev => lev.idsede); // Opcional: guardar IDs para traza
      // Recorre los levantamientos y cuenta cuántos hay por sede
      semestre.forEach(lev => {
        if (lev === 1) levantamientosSede[0]++;
        else if (lev === 2) levantamientosSede[1]++;
        else if (lev === 3) levantamientosSede[2]++;
        else if (lev === 4) levantamientosSede[3]++;
        else if (lev === 5) levantamientosSede[4]++;
      });
      return levantamientosSede;
  }   
  
    }
  catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};

export async function totalincluAprob(semestral) {
  let semestre = [];
  try {
    const response = await fetch("http://localhost:5000/estadisticas/seguimiento/inclusiones");
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    
    const data = await response.json();
    if (semestral === "1") {
      const [inicioSemestre, finSemestre] = [
        new Date("2025-02-17T00:00:00"),
        new Date("2025-06-13T23:59:59")
      ];

      for (let i = 0; i < data.length; i++) {
        const fechaCreacion = new Date(data[i].fechacreacion);
        if (isNaN(fechaCreacion.getTime())) {
          console.warn(`Fecha inválida en registro ${data[i].idformulario}`);
          continue;
        }
        if (fechaCreacion >= inicioSemestre && fechaCreacion <= finSemestre) {
            semestre.push(data[i].idformulario); // Opcional: guardar IDs para traza
          }

      }
      let total = semestre.length; 
      return total.toString();
    }
    else{
      let total = data.length;
      return total.toString();
    }
  } catch (error) {
    console.error('Error al obtener los levantamientos:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
  
};