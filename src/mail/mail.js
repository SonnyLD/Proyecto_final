import { createTransport } from "nodemailer";
import bcrypt from'bcrypt';

// Configurar el transporte del correo
const transporter = createTransport({
  service: 'Gmail', // Servicio de correo a utilizar (por ejemplo, Gmail)
  auth: {
    user: 'tu_correo@gmail.com', // Correo emisor
    pass: 'tu_contraseña' // Contraseña del correo emisor
  }
});

// Función para enviar correo de recuperación de contraseña
const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    // Crear el contenido del correo
    const mailOptions = {
      from: 'tu_correo@gmail.com', // Correo emisor
      to: email, // Correo receptor
      subject: 'Recuperación de Contraseña',
      html: `<p>Hola,</p><p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p><a href="${resetLink}">Restablecer Contraseña</a><p>Este enlace expirará en una hora.</p><p>Si no solicitaste restablecer tu contraseña, ignora este correo.</p><p>Saludos,</p><p>Tu Aplicación</p>`
    };

    // Enviar el correo
    const result = await transporter.sendMail(mailOptions);
    console.log('Correo de recuperación de contraseña enviado:', result);
  } catch (error) {
    console.error('Error al enviar el correo de recuperación de contraseña:', error);
  }
};

// Función para generar el enlace de restablecimiento de contraseña
const generateResetLink = async (userId) => {
  try {
    const resetToken = 'token_de_reset'; // Generar un token de reset de forma segura (puedes usar una librería como 'jsonwebtoken')
    const resetLink = `https://tusitio.com/reset-password/${userId}/${resetToken}`; // Enlace de restablecimiento de contraseña

    // Guardar el token de reset en la base de datos junto con la fecha de expiración (1 hora después)
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    // Guardar el token y la fecha de expiración en la base de datos del usuario con el ID del usuario correspondiente

    // Enviar el correo de recuperación de contraseña con el enlace de restablecimiento
    sendPasswordResetEmail(userId, resetLink);

    console.log('Enlace de restablecimiento de contraseña generado:', resetLink);
  } catch (error) {
    console.error('Error al generar el enlace de restablecimiento de contraseña:', error);
  }
};

// Función para restablecer la contraseña
const resetPassword = async (userId, resetToken, newPassword) => {
  try {
    // Verificar si el token de reset está vigente (no ha expirado)
    // Obtener el token de reset y la fecha de expiración de la base de datos del usuario con el ID del usuario correspondiente
    // Comparar la fecha de expiración con la fecha actual para determinar si el token ha expirado

    if (resetTokenExpired) {
      console.log('El enlace de restablecimiento de contraseña ha expirado');
      // Redirigir a una vista para generar nuevamente el correo de restable

    // restablecimiento
    // Enviar correo de recuperación de contraseña con nueva duración de 1 hora
    generateResetLink(userId);

    // Redirigir a una vista para generar nuevamente el correo de restablecimiento
    // Puedes implementar la lógica de redirección a la vista correspondiente aquí

  } else {
    // Verificar si la nueva contraseña es diferente a la contraseña actual del usuario
    // Obtener la contraseña actual del usuario de la base de datos con el ID del usuario correspondiente
    // Comparar la nueva contraseña con la contraseña actual del usuario
    const isSamePassword = await bcrypt.compare(newPassword, currentPassword);

    if (isSamePassword) {
      console.log('No se puede restablecer la contraseña con la misma contraseña del usuario');
      // Retornar un mensaje indicando que no se puede usar la misma contraseña
    } else {
      // Actualizar la contraseña del usuario en la base de datos con la nueva contraseña
      // Actualizar el token de reset y la fecha de expiración en la base de datos del usuario con el ID del usuario correspondiente
      console.log('Contraseña restablecida exitosamente');
      // Retornar un mensaje indicando que la contraseña se ha restablecido exitosamente
    }
  }
} catch (error) {
  console.error('Error al restablecer la contraseña:', error);
}
};
