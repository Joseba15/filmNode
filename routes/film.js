const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')


const {getFilms,getFilmById,addFilm,delFilm,updateFilm} = require('../controller/film')


router.get('/', getFilms);
router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
],getFilmById);

router.post('/',[   
    check('title', 'El titulo tiene que tener entre 3 y 40 characteres').isLength({ min: 3, max:40}),
    check('title', 'El password es obligatorio').not().isEmpty(), 
    check('country', 'El pais es obligatorio').not().isEmpty(), 
    check('duration', 'La duracion debe de ser un numero').isNumeric(),  
    check('duration', 'La duracion es obligatorio').not().isEmpty(),   
validarCampos
] ,addFilm );

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
    check('title', 'El titulo tiene que tener entre 3 y 40 characteres').isLength({ min: 3, max:40}),
    check('title', 'El password es obligatorio').not().isEmpty(), 
    check('country', 'El pais es obligatorio').not().isEmpty(), 
    check('duration', 'La duracion debe de ser un numero').isNumeric(),  
    check('duration', 'La duracion es obligatorio').not().isEmpty(),   
    validarCampos
], updateFilm );

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validarCampos
],delFilm);

module.exports = router;


