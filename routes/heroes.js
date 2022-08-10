const express = require('express')
const app = express()
const heroes = require('../heroes.json')

app.get('/', (req, res) => {
    res.json(heroes)
})

app.get('/:slug', (req,res) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    res.json(heroFind)
})


app.get('/:slug/powers', (req, res) => {
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    res.json(heroFind.power)
})

app.post('/', (req, res) => {
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
    const heroFind = heroes.find((hero) =>{
        return hero.slug === req.params.slug
    })

    const power = {
        power: [req.body.power]
    }

    // heroFind.push(power)
    console.log(heroFind)
})

module.exports = app