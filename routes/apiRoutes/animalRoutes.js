const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const {animals} = require('../../data/animals.json');
const router = require('express').Router();

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result){
        res.json(result)
    } else {
        res.send(404);
    }
})

router.post('/animals', (req, res) => {
    //assign new animal an id based on what the next index will be
    req.body.id = animals.length.toString();

    //add to json file and array in this function
    const animal = createNewAnimal(req.body, animals);
    //validation
    if(!validateAnimal(req.body)){
        res.status(400).send('The animal is not formatted correctly.')
    }

    res.json(animal)
});

module.exports = router;
