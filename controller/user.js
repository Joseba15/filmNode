const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')

const getUsers= async(req,res) =>{
   
    const user = await User.find()
    res.json({user})
}

const updateUser = async (req = request, res = response) => {
    const id = req.params;
    const getUser = await User.findOne({_id:id})
    const updateUser = req.body;
    
    if (getUser.length) {
        const salt = bcryptjs.genSaltSync();
        updateUser.password = bcryptjs.hashSync( userBody.password, salt );
        await User.updateOne({_id:id},updateUser)
        res.json(updateUser)
    }else if(updateUser.rol!=null){
        return res.status(400).json({msg: 'No se puede cambiar el tipo de rol '});
    }
    else{
        return res.status(400).json({msg: 'Usuario no encontrado con el id '+id});
    }

    

}

const delUser = async(req = request, res= response) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({msg: 'Usuario no encontrado con el id '+id});
    }else{
        const userDelete = await User.deleteOne(user)
        res.json({ userDelete})
    }
}


const signup = async(req, res) => {

    const { nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol})
    
    const existeEmail = await User.findOne({correo});
        if (existeEmail){
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

 const login = async(req=request, res=response) =>{
    const { correo, password} = req.body
    const user = await User.findOne({ "correo": correo })
    const validPassword = bcryptjs.compareSync(password, user.password)

    if(!user){
        res.status(400) .json( {mensage: 'El usuario no existe'})
    if(!validPassword){
        return res.status(400).json({mensage: 'La contraseña no es correcta'})
    }else{
        const token = await genJWT(user._id);
        res.json({user,token})
    }   
}
}



module.exports = { signup,login,getUsers,updateUser,delUser }