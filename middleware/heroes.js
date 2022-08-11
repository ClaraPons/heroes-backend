const heroes = require('../heroes.json')

const verifyHero = (req, res, next) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.body.slug
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

    if (heroFindIndex > -1){
        console.log("je suis dans Hero middleware")
        req.heroFindIndex = heroFindIndex
        next()
    }else{
        res.status(404).send("Hero Not Found")
    }
}

const verifyPower = (req, res, next) => {
    const powerFindIndex =  heroes.find((power) =>{
        return power.power === req.params.power
    })


    console.log(powerFindIndex)
    next()
}

module.exports = {
    verifyHero: verifyHero,
    deleteHero: deleteHero,
    verifyPower: verifyPower
}