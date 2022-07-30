const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'My express project ', message: 'Hello world'});
});

module.exports = router;