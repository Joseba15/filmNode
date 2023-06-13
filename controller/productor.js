const { response, request } = require('express');
const Productor = require('../models/productor');

const getProductors= async(req = request,res= response) =>{
    const productor = await Productor.find()
    res.json({productor})
   
}

const getProductorById = async (req = request,res= response) =>{
    const id = req.params.id;

    const productor = await Productor.findById(id)
    if (productor == null) {
        return res.status(400).json({
            msg : `Productor  doesnt exits`
        });
    }else{
        res.json({productor})
    }

}

const addProductor = async(req, res) => {

    const { name,address} = req.body;
    
    const productor = new Productor({name,address})
    const aux = await Productor.findOne({name})

    if (aux==null) {
        await productor.save();
            res.json( productor)
        
    }else{
        return res.status(400).json({
            msg : `Productor already exits`
        });
    }
}


const delProductor = async(req = request, res= response) => {
    const id = req.params.id;
    const aux = await Productor.findById(id)

    if (aux!=null) {
        const remove = await Productor.findOneAndRemove(id);
        res.json(remove)
        
    }else{
        return res.status(400).json({
            msg : `Cannot remove a productor wich doesnt exist`
        });
    }
}


const updateProductor = async (req = request, res = response) => {
    const id = req.params.id;

    const {_id,...productorBody} = req.body;
    const productor= await Productor.findById(id);

    const updateProductor = await Productor.findByIdAndUpdate(id,productorBody);

    res.json(productor)

}


module.exports = {getProductors,getProductorById,addProductor,delProductor,updateProductor}