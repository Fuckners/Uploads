import { Request as Req, Response as Res, Router } from 'express';
import multer from 'multer';
import path from 'path';
import database from "../database/database";

const router :Router = Router();

const upload = multer({
    storage: multer.diskStorage({

        // local onde o arquivo será salvo
        destination(req, file, callback) {
            const diretorios :Array<string> = [ '.pdf', '.png', '.jpg' ];
            
            // verificar se já tem uma pasta para esse tipo de arquivo
            diretorios.includes(path.extname(file.originalname)) ? // if ternário
                callback(null, `src/uploads/${path.extname(file.originalname).slice(1)}/`) : // salvar na pasta respectiva
                callback(null, `src/uploads/outros/`); // salvar na pasta de outros

        },

        // configurando nome do arquivo
        filename(req, file, callback) {
            // alterando o nome do arquivo de acordo com a data atual para não haver arquivo com nomes repetidos
            callback(null, Date.now() + file.originalname);
        }
    }),

    // filtros para decidir se o arquivo será salvo ou não
    fileFilter(req, file, callback) {
        // impedindo upload de arquivos .bat
        file.mimetype === 'application/octet-stream' ?
            callback(null, false) : // impede o upload
            callback(null, true);  // faz o upload normalmente
    },

    // limites do arquivo
    limits: {
        // tamanho máximo de 2mb
        fileSize: 1024 * 1024 * 3 // 3mb
    }
});

interface file {
    id? :number,
    name :string | undefined,
    path :string | undefined,
    type :string | undefined,
    createdAt :Date | undefined
}

// rota principal onde o arquivo será selecionado para o upload
router.get('/', async (req :Req, res :Res) => {
    // res.send('Estou aqui!');
    const arquivos :Array<file> = await database.select().table('arquivos');

    res.render('pages/index', { arquivos, err: req.query.err });
});

// rota que efetuará o upload localmente e salvará no banco de dados
router.post('/upload', (req :Req, res :Res) => {
    try {
        upload.single('arquivo1')(req, res, async e => {
            if (e) {
                res.redirect('/?err=' + e.message);
            } else {

                const arquivo :file = {
                    name: req.file?.originalname,
                    path: req.file?.path,
                    type: req.file?.mimetype,
                    createdAt: new Date()
                };

                await database.insert(arquivo).table('arquivos');
                res.redirect('/');
            }
    
        });
    } catch (error) {
        res.redirect('/');
    }
});

// rota de erro para caso tentem acessar uma rota que não existe
router.use((req :Req, res :Res) => {
    res.send('Página not found :c');
});

// exportando o router para ser usado pelo app no server.js
// module.exports = router;
export default router;
