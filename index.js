var express = require('express');
var cors = require('cors');
require('dotenv').config()

// Importar Multer para manejar archivos
var multer = require('multer');
// Inicializar Multer. Usamos 'upload.single()' para procesar un solo archivo
// y lo configuramos sin destino para que el archivo quede en la memoria (req.file).
var upload = multer(); 

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Ruta de inicio
app.get('/', function (req, res) {
  // Asume que la interfaz está en /views/index.html
  res.sendFile(process.cwd() + '/views/index.html');
});

// ======================================================================
// RUTA DE METADATOS: /api/fileanalyse
// ======================================================================

/* * upload.single('upfile') es el middleware clave.
 * 'upfile' debe coincidir con el atributo 'name' del input de archivo en el HTML.
 */
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  
  // 1. Verificar si Multer pudo cargar el archivo
  if (!req.file) {
    return res.status(400).json({ error: "No se ha subido ningún archivo (No file uploaded)" });
  }

  // 2. req.file contiene los metadatos del archivo cargado
  const file = req.file;

  // 3. Devolver la respuesta JSON con el formato requerido por FreeCodeCamp
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// ======================================================================
// INICIO DEL SERVIDOR
// ======================================================================

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Tu aplicación está escuchando en el puerto ' + port)
});
