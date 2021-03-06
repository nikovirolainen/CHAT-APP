const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.get('/', (req, res) => {
	res.render('index', null)
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

router.get('/room/:id', (req, res) => {
	res.render('room', {room:req.params.id})
})


module.exports = router
