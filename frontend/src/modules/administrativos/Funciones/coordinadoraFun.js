export async function obtenerLevantamientos(tipo) {
  try {
    const res = await fetch("http://localhost:5000/formularios/levantamientosF");
    if (!res.ok) throw new Error("Error en la respuesta de la API");

    const data = await res.json();

    const solicitudes = data.map(item => ({
      idformulario: item.formulario.idformulario,
      fecha: item.formulario.fechacreacion.split('T')[0],
      sede: item.formulario.idsede,
      carnet: item.formulario.carnet,
      nombre: item.formulario.nombre,
      curso: item.cursoalevantar,
      requisito: item.requisitoalevantar,
      estado: "", // se obtiene aparte
      correo: item.formulario.correo,
      carrera: item.formulario.carrera,
      comentarios: item.comentariosolicitud,
      detalle: item.otrodetalle
    }));

    // Fetch seguimiento y estado igual que en la función `informacion`
    for (let i = 0; i < solicitudes.length; i++) {
      const seguimientoRes = await fetch(`http://localhost:5000/formularios/seguimiento/${solicitudes[i].idformulario}`);
      const seguimientoData = await seguimientoRes.json();

      const estadoRes = await fetch(`http://localhost:5000/formularios/estado/${seguimientoData[0].idestado}`);
      const estadoData = await estadoRes.json();

      solicitudes[i].estado = estadoData[0].nombre;

      const sedeRes = await fetch(`http://localhost:5000/formularios/sede/${solicitudes[i].sede}`);
      const sedeData = await sedeRes.json();
      solicitudes[i].sede = sedeData[0].nombre;
    }

    if (tipo === '1') return solicitudes;
    if (tipo === '2') return solicitudes.filter(s => s.estado === 'Pendiente');
    if (tipo === '3') return solicitudes.filter(s => s.estado === 'Aprobado');
    if (tipo === '4') return solicitudes.filter(s => s.estado === 'Rechazado');

  } catch (error) {
    console.error("Error al obtener levantamientos:", error);
    throw error;
  }
}

export async function actualizarEstado(idformulario, idestado) {
  try {
    const res = await fetch('http://localhost:5000/coordinadora/actualizarEstado', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idformulario, idestado }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Error al actualizar el estado');

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const obtenerRequisitosAutomaticos = async () => {
  try {
    const response = await fetch('http://localhost:5000/coordinadora/requerimientosLevAuto'); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos del backend:', error);
    return [];
  }
};

export const obtenerCursos = async () => {
  try {
    const response = await fetch('http://localhost:5000/cursos/getIdcurso'); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    return [];
  }
};

export const insertarRequisitoAutomatico = async (requisito) => {
  try {
    const response = await fetch('http://localhost:5000/coordinadora/insertarLenvAuto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requisito),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al insertar requisito:', error);
    throw error;
  }
};

export const eliminarRequisitoAutomatico = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/coordinadora/deleRequiAuto/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Error al eliminar el requisito');

    return await response.json();
  } catch (error) {
    console.error('Error eliminando requisito automático:', error);
    throw error;
  }
};

export const obtenerRequisitoPorId = async (id) => {
  const response = await fetch(`http://localhost:5000/coordinadora/getrequisitosAutomaticos/${id}`);
  if (!response.ok) throw new Error('No se pudo obtener el requisito');
  return await response.json();
};

export const actualizarRequisito = async (id, datos) => {
  const response = await fetch(`http://localhost:5000/coordinadora/updateRequisitoAuto/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el requisito');
  }

  return await response.json();
};

