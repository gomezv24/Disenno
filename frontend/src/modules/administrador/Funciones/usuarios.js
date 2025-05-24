
export async function informacion(tipo) {
    try {
        const response = await fetch("http://localhost:5000/usuarios");
        if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        const solicitudes = data.map(solicitud => ({
            sede: solicitud.idsede,
            identificacion: solicitud.identificacion,
            nombre: solicitud.nombre,
            estado: solicitud.activo,
            correo: solicitud.correoinstitucional,
            tipo: solicitud.idtipousuario
          }));


        for (let i = 0; i < solicitudes.length; i++) {
           
            const estado = await fetch(`http://localhost:5000/usuarios/tipo/${solicitudes[i].tipo}`);
            let tipoString = await estado.json();
            solicitudes[i].tipo = tipoString.nombre;

            const sede = await fetch(`http://localhost:5000/formularios/sede/${solicitudes[i].sede}`);
            let sedeString = await sede.json();
           solicitudes[i].sede = sedeString[0].nombre;

           if (solicitudes[i].estado === true) {
                solicitudes[i].estado = "Activo";
            }
            else{
                solicitudes[i].estado = "Inactivo";
            }
        }
        
        console.log(solicitudes);
        
        return solicitudes;
       
    } catch (error) {
        console.error('Error al obtener la información:', error);
        throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
    };




