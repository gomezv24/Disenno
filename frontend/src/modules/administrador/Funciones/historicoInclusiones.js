

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


export async function informacion(tipo) {
    try {
        const response = await fetch("http://localhost:5000/formularios/inclusionesF");
        if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        const solicitudes = data.map(solicitud => ({
            fecha: (solicitud.formulario.fechacreacion).split('T')[0],
            idformulario: solicitud.idformulario,
            sede: solicitud.formulario.idsede,
            carnet: solicitud.formulario.carnet,
            nombre: solicitud.formulario.nombre,
            grupo: solicitud.grupoinclusion,
            curso: solicitud.cursoinclusion,
            profesor: solicitud.profesor,
            estado: "",
            correo: solicitud.formulario.correo,
            carrera: solicitud.formulario.carrera,
            consideraciones: solicitud.consideraciones,
            requisitos: solicitud.tienerequisitos,
            choquehorario: solicitud.tienechoquehorario,
            beca: solicitud.idtipobeca,
          }));

        for (let i = 0; i < solicitudes.length; i++) {
            const response = await fetch(`http://localhost:5000/formularios/seguimiento/${solicitudes[i].idformulario}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }


            let estadodata = await response.json();
            //console.log("estado id",estadodata);

            const estado = await fetch(`http://localhost:5000/formularios/estado/${estadodata[0].idestado}`);
            let estadoString = await estado.json();
            solicitudes[i].estado = estadoString[0].nombre;

            const sede = await fetch(`http://localhost:5000/formularios/sede/${solicitudes[i].sede}`);
            let sedeString = await sede.json();
           

           //console.log("sede",sede);
           solicitudes[i].sede = sedeString[0].nombre;
console.log('for',solicitudes);

            if (solicitudes[i].requisitos === true) {
                solicitudes[i].requisitos = "Si";
            }
            else {
                solicitudes[i].requisitos = "No";
            }

            if (solicitudes[i].choquehorario === true) {
                solicitudes[i].choquehorario = "Si";
            }
            else {
                solicitudes[i].choquehorario = "No";
            }

            if (solicitudes[i].beca === null) {
                solicitudes[i].beca = "No";
            }else {
                const beca = await fetch(`http://localhost:5000/formularios/tipobeca/${solicitudes[i].beca}`);
                let becaString = await beca.json();
                solicitudes[i].beca = becaString[0].tipo;
            }
        }
        
        console.log(solicitudes);
         console.log("tipo", tipo);
        if (tipo === '1'){
          return solicitudes;
        }
        if (tipo === '2'){
          const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.estado === "Pendiente");
          return solicitudesFiltradas;
        }
        if (tipo === '3'){
          const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.estado === "Aprobado");
          return solicitudesFiltradas;
        }
        if (tipo === '4'){
          const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.estado === "Rechazado");
          return solicitudesFiltradas;
        }
    } catch (error) {
        console.error('Error al obtener la información:', error);
        throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
    };




