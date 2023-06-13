const { response, request } = require('express');
const Film = require('../models/film');
const url = require('url');


const getFilms= async(req = request,res= response) =>{
    // const current_url = new URL('http://localhost:8000/film?id=6475b3049e0120db6b1dc843');

    const film = await Film.find()
    res.json({film})
   
}

const getFilmById = async (req = request,res= response) =>{
    const id = req.params.id;

    const film = await Film.findById( id)
    // console.log('film',film);
    if (film == null) {
        return res.status(400).json({
            msg : `Film  doesnt exits`
        });
    }else{
        res.json({film})
    }

}

const addFilm = async(req, res) => {

    const { title, duration, country, genre, productores } = req.body;
    
    const film = new Film({ title, duration, country, genre,productores})
    const aux = await Film.findOne({title})
    

    if (aux == null) {
        await film.save();
        res.json( film)
        
    }else if (aux!=null){
        return res.status(400).json({
            msg : `Film already exits`
        });
    }

}


const delFilm = async(req = request, res= response) => {
    const id = req.params.id;
    const aux = await Film.findById(id)

    if (aux!=null) {
        const remove = await Film.findByIdAndRemove(id);
        res.json(remove)
        
    }else{
        return res.status(400).json({
            msg : `Cannot remove a film wich doesnt exist`
        });
    }
}


const updateFilm = async (req = request, res = response) => {
    const id = req.params.id;

    const {_id,...filmBody} = req.body;
    const film= await Film.findById(id);
    const aux = await Film.findOne(filmBody.title)

    if (film!=null && aux!=null) {
        const updateFilm = await Film.findByIdAndUpdate(id,filmBody);
        res.json(updateFilm)
        
    }else if (film!=null){
        return res.status(400).json({msg : `Film  doesnt exits with id: ${id}`})
    }else if (aux==null){
        return res.status(400).json({
            msg : `Film already exits`
        });
    }
    
    }


module.exports = {getFilms,getFilmById,addFilm,delFilm,updateFilm}