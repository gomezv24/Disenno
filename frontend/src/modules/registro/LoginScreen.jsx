import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Link, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imagenRegistro from '../../assets/imagenRegistro.png';
import { Autenticar } from '../../functions/autenticacion';
import { UserContext } from '../../context/UserContext';


const LoginScreen = () => {
  const [valores, setValores] = useState({ email: '', password: '' });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext); // Acceder al contexto

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValores({ ...valores, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!valores.email || !valores.password) {
      setAlertMessage('Por favor ingresa tu correo y contraseña');
      setAlertSeverity('error');
      setOpenAlert(true);
      return;
    }

    try {
      const response = await Autenticar({
        correoinstitucional: valores.email,
        contrasena: valores.password,
      });

      if (response.status === 200) {
        const usuario = response.data;
        setUsuario(usuario); // Guardar en contexto
        localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar en localStorage (opcional)
        console.log('Autenticación exitosa:', usuario);

        const rol = usuario.idtipousuario;
        if (rol === 1) {
          navigate('/administrador');
        } else if (rol === 2) {
          navigate('/administrativo/panelControl');//aquí cambiar 
        } else if (rol === 3) {
          navigate('/estudiantes');
        } else if (rol === 4) {
          navigate('/administrativo');
        }
      } else {
        setAlertMessage('Correo o contraseña incorrectos');
        setAlertSeverity('error');
        setOpenAlert(true);
      }
    } catch (err) {
      console.error('Error en autenticación:', err);
      setAlertMessage('Error al conectar con el servidor');
      setAlertSeverity('error');
      setOpenAlert(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      {/* Sección Izquierda */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imagenRegistro} alt="Gráfico" style={{ width: '80%', maxWidth: '400px' }} />
      </Box>

      {/* Sección Derecha */}
      <Box sx={{ flex: 1, px: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 2 }}>
          Inicio de Sesión
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b6b6b', mb: 4 }}>
          Ingresa tu correo estudiantil o ltcr
        </Typography>

        <TextField
          fullWidth
          label="Dirección de correo electrónico"
          variant="outlined"
          id="email"
          name="email"
          value={valores.email}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          variant="outlined"
          name="password"
          id="password"
          value={valores.password}
          onChange={handleInputChange}
          sx={{ mb: 4 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold', mb: 2 }}
        >
          Iniciar Sesión
        </Button>

        <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'center', color: '#6b6b6b' }}>
          ¿Tienes problemas para acceder?
        </Link>
      </Box>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginScreen;
