import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imagenRegistro from '../../assets/imagenRegistro.png';
import { Autenticar } from '../../functions/autenticacion';
import { UserContext } from '../../context/UserContext';

const LoginScreen = () => {
  const [valores, setValores] = useState({ email: '', password: '' });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const alertRef = useRef(null);
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

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
        setUsuario(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        const rol = usuario.idtipousuario;
        if (rol === 1) navigate('/administrador');
        else if (rol === 2) navigate('/administrativo/panelControl');
        else if (rol === 3) navigate('/estudiantes');
        else if (rol === 4) navigate('/administrativo');
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

  useEffect(() => {
    if (openAlert && alertRef.current) {
      alertRef.current.focus();
    }
  }, [openAlert]);

  return (
    <>
      <header>
        <Typography component="h1" variant="h5" sx={{ position: 'absolute', left: -9999 }}>
          Plataforma de inicio de sesión
        </Typography>
      </header>

      <main>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Sección Izquierda */}
          <Box
            component="aside"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={imagenRegistro}
              alt="Ilustración de acceso a plataforma con una persona frente a una computadora"
              style={{ width: '80%', maxWidth: '400px' }}
            />
          </Box>

          {/* Sección Derecha */}
          <Box
            component="section"
            aria-labelledby="login-title"
            sx={{ flex: 1, px: 4 }}
          >
            <Typography id="login-title" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 2 }}>
              Inicio de Sesión
            </Typography>

            <Typography variant="body2" sx={{ color: '#6b6b6b', mb: 4 }}>
              Ingresa tu correo estudiantil o institucional
            </Typography>

            <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
              <TextField
                fullWidth
                label="Dirección de correo electrónico"
                variant="outlined"
                id="email"
                name="email"
                value={valores.email}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
                required
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
                required
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold', mb: 2 }}
              >
                Iniciar Sesión
              </Button>
            </form>

            <Link
              href="#"
              role="link"
              aria-label="Enlace de ayuda si tienes problemas para acceder"
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', color: '#6b6b6b' }}
            >
              ¿Tienes problemas para acceder?
            </Link>
          </Box>

          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              ref={alertRef}
              onClose={() => setOpenAlert(false)}
              severity={alertSeverity}
              sx={{ width: '100%' }}
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      </main>

      <footer>
        <Typography component="p" sx={{ position: 'absolute', left: -9999 }}>
          Pie de página invisible para accesibilidad
        </Typography>
      </footer>
    </>
  );
};

export default LoginScreen;
