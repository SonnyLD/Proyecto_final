export const errorMessages = {
  missingTitle: 'El título del producto es requerido.',
  missingPrice: 'El precio del producto es requerido.',
  invalidQuantity: 'La cantidad del producto debe ser un número entero positivo.',
  productNotFound: 'No se encontró el producto especificado.',
  notEnoughStock: 'No hay suficiente stock del producto para satisfacer la cantidad deseada.',
};
const createCustomError = (errorKey, customMessage) => {
  const defaultErrorMessage = errorMessages[errorKey];

  return {
    message: customMessage || defaultErrorMessage,
    type: errorKey,
  };
};
// Ejemplo de uso en una ruta para crear un producto

app.post('/productsFaker', (req, res) => {
  const { title, price, quantity } = req.body;

  const requiredFields = {
    title: 'string',
    price: 'number',
  };

  const missingFields = [];

  for (const field in requiredFields) {
    if (!req.body[field]) {
      missingFields.push(`${field} (${requiredFields[field]})`);
    }
  }

  if (missingFields.length > 0) {
    const error = createCustomError(
      'missingFields',
      `Los siguientes campos son requeridos: ${missingFields.join(', ')}`
    );

    return res.status(400).json(error);
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    const error = createCustomError('invalidQuantity');

    return res.status(400).json(error);
  }

});



