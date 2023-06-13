const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoria'],       
    },
    password: {
        type: String,
        required: [true, 'La constrasena es obligatoria'],
    },
    rol:{
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img:{
        type:String
    }
})

// UserSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...user} = this.toObject();
//     user.uid = _id;
//     return user;
// }

module.exports = model( 'User', UserSchema );