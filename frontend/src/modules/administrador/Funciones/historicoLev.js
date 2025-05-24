
export async function informacion(tipo) {
    try {
        const response = await fetch("http://localhost:5000/formularios/levantamientosF");
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
            curso: solicitud.cursoalevantar,
            estado: "",
            correo: solicitud.formulario.correo,
            carrera: solicitud.formulario.carrera,
            comentario: solicitud.comentariosolicitud,
            consideraciones: solicitud.otrodetalle,
            requisito: solicitud.requisitoalevantar,
            tiposolicitud: solicitud.formulario.idtipoformulario,
            planestudio: solicitud.plandeestudio,
          }));

        for (let i = 0; i < solicitudes.length; i++) {
            const response = await fetch(`http://localhost:5000/formularios/seguimiento/${solicitudes[i].idformulario}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }




            let estadodata = await response.json();


            const estado = await fetch(`http://localhost:5000/formularios/estado/${estadodata[0].idestado}`);
            let estadoString = await estado.json();
            solicitudes[i].estado = estadoString[0].nombre;


            const sede = await fetch(`http://localhost:5000/formularios/sede/${solicitudes[i].sede}`);
            let sedeString = await sede.json();

           solicitudes[i].sede = sedeString[0].nombre;


           if (solicitudes[i].tiposolicitud === 2) {
                solicitudes[i].tiposolicitud = "Levantamiento de requisitos";
            }
            else{
                solicitudes[i].tiposolicitud = "Levantamiento RN";
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




