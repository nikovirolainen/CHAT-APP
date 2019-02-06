// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/register', (req, res) => {
        turbo.createUser(req.body)
        .then(data => {
            req.vertexSession.user = {id: data.id} 
            res.json({
                confirmation: 'success',
                data: data
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
})

router.post('/login', (req, res) => {
    turbo.login(req.body)
    .then(data => {
        // SUCCESFUL LOGIN! SET vertexSession:
        req.vertexSession.user = {id: data.id}

        res.json({
            confirmation: 'success',
            data: data
    })
})
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })

    })
})

router.get('/currentuser', (req, res) => {

   // no one logged in
   if (req.vertexSession == null) {
       res.json({
           confirmation: 'success',
           user: null
       })
       return
   }
   // no one logged in
   if (req.vertexSession.user == null){
        res.json({
            confirmation: 'success',
            user: null
        })
        return
   }

   // someone logged in
   turbo.fetchOne('user', req.vertexSession.user.id)
   .then(data => {
        res.json({
            confirmation: 'success',
            user: data
        })
   })
   .catch(err => {
        res.json({
            confirmation: 'fail',
            user: data
        })
   })
})

router.get('/logout', (req, res) => {

    req.vertexSession.reset()

    res.json({
        confirmation: 'success',
        user: null
    })

})

module.exports = router
