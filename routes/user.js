const express = require('express')
const router = express.Router()
const {signup,login,getUsers,updateUser,delUser} = require('../controller/user')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

router.get('/', getUsers);
router.post('/signup', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],signup );
router.post('/login', [
    check('password', 'la contraseña es requerida').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
],login );
router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre', 'El nombre es requerida').not().isEmpty(),
    check('password', 'la contraseña es requerida').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
],updateUser );

router.delete('/:id', [
    validateJWT,
    check('id','No es un id correcto').isMongoId(),
    validarCampos
],delUser );



module.exports = router