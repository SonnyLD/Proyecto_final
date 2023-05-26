export default class UserController {
  constructor({ UserService }) {
      this.service = UserService;
  }

  createUser = async (req, res) => {
      try {
          const user = await this.service.createUser(req.body);
          if (!user) {
              throw new Error('User not created');
          }
          delete user.password;
          res.status(201).redirect('/');
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  getUser = async (req, res) => {
      try {
          const { email } = req.params;

          const user = await this.service.getUser(email);

          if (!user) {
              throw new Error('User not found');
          }

          res.status(200).json({
              success: true,
              user,
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };
   // Función para actualizar el rol de un usuario
   updateUserRole = async (req, res) => {
    try {
        const { uid } = req.params; // Obtener el ID de usuario de los parámetros de la ruta
        const { role } = req.body; // Obtener el nuevo rol de usuario del cuerpo de la solicitud

        // Validar si el nuevo rol es válido (por ejemplo, 'user' o 'premium')
        if (role !== 'user' && role !== 'premium') {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Actualizar el rol del usuario en la base de datos
        const updatedUser = await UserModel.findByIdAndUpdate(
            uid,
            { role }, // Nuevo rol de usuario
            { new: true } // Opción para devolver el documento actualizado
        );

        // Verificar si se encontró y actualizó el usuario
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Devolver la respuesta con el usuario actualizado
        return res.status(200).json(updatedUser);
    } catch (error) {
        // Manejar errores de manera adecuada
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Se integra last_connection
updateLastConnection = async (req, res) => {
    try {
        const { uid } = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(
            uid,
            { last_connection: new Date() },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
  };

  uploadDocuments = async (req, res) => {
    try {
        const { uid } = req.params;
        const documents = req.files;

        // Validar si se recibieron archivos
        if (!documents || documents.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Actualizar el estado del usuario con los nombres de los archivos subidos
        const updatedUser = await UserModel.findByIdAndUpdate(
            uid,
            { $addToSet: { documents: documents.map((doc) => doc.filename) } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

  
}
