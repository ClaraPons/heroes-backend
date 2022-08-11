const express = require('express')
const req = require('express/lib/request')
const app = express()
const heroes = require('../heroes.json')
const {verifyHero, deleteHero, verifyPower} = require('../middleware/heroes')

app.get('/', (req, res) => {
    res.json(heroes)
})

app.get('/:slug', (req,res) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    if(heroFind){
        res.json(heroFind)
    }else{
        res.status(404).send("Hero Not Found")
    }
})


app.get('/:slug/powers', (req, res) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    if(heroFind){
        res.json(heroFind.power)
    }else{
        res.status(404).send("Hero Not Found")
    }
})

app.post('/', verifyHero, (req, res) => {

    const hero = {
        slug: req.body.slug,
        name: req.body.name,
        power: [req.body.power],
        color: req.body.color,
        isAlive: req.body.isAlive,
        age: req.body.age,
        image: req.body.image
    }

        heroes.push(hero)
        res.json(hero)
    
        console.log(hero)
    
})

app.put('/:slug/powers', (req, res) => {
    const powerIndex = heroes.findIndex((hero) => {
        return hero.slug === req.params.slug
    })
 
    console.log(powerIndex)

    if(powerIndex > -1){
        const power = req.body.power
        const hero = heroes[powerIndex]
        // console.log(hero)
        const heroIncludes = hero.power.includes(power)
        // console.log(heroIncludes)
        // res.send("ca marche")

        if(heroIncludes){
            res.json("power already exist")
        }else{
            hero.power.push(req.body.power)
            console.log(hero)
            res.json(hero)
        }
        
    }else{
        res.status(404).send("Hero Not found")
    }
})

app.delete('/:slug', deleteHero, (req, res) => {
    heroes.splice(req.heroFindIndex, 1)
    res.json("ok")
})

app.delete('/:slug/power/:power', deleteHero, verifyPower, (req, res) => {
    // heroes.power.splice()
    res.json("ok")
})


module.exports = app