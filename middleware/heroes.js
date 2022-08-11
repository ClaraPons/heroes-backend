const heroes = require('../heroes.json')
const _ = require('lodash');
const { keys } = require('lodash');

const verifyHero = (req, res, next) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.body.slug
    })

    const heroFindNew = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    if (heroFind){
        console.log("je suis dans Hero middleware")
        res.status(404).send('Hero already exist')
    }else{
        next()
    }
    
}

const deleteHero = (req, res, next) =>{
    const heroFindIndex = heroes.findIndex((hero) =>{
        return hero.slug === req.params.slug
    })

    const heroFind = heroes.find((hero) => {
        return hero.slug === req.params.slug
    })


    if (heroFindIndex > -1){
        console.log("je suis dans Hero middleware")
        req.heroFind = heroFind
        req.heroFindIndex = heroFindIndex
        next()
    }else{
        res.status(404).send("Hero Not Found")
    }
}

const verifyPower = (req, res, next) => {
    const powerFindIndex =  req.heroFind.power.findIndex((power) =>{
        return power === req.params.power
    })

    const powerFind = req.heroFind.power.find((power) =>{
        return power === req.params.power
    })

    if(powerFindIndex > -1){
        console.log("je suis dans Power middleware")
        req.powerFindIndex = powerFindIndex
        req.powerFind = powerFind
        next()
    }else{
        res.status(404).send("Power Not Found")
    }
    
}

const validateHero = (req, res, next) => {
    
    const heroFindNew = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    const keysParamsArray = Object.keys(heroFindNew).sort()
    const keysBodyArray  = Object.keys(req.body).sort()
    console.log("je suis dans Validate middleware")
    console.log(keysParamsArray, keysBodyArray)
    const isEqual = _.isEqual(keysParamsArray, keysBodyArray)
    console.log(isEqual)

    if(isEqual){
        next()
    }else{
        res.status(404).send("Format isn't right")
    }

}

module.exports = {
    verifyHero: verifyHero,
    deleteHero: deleteHero,
    verifyPower: verifyPower, 
    validateHero: validateHero
}