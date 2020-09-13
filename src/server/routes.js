import { Router }from 'https://deno.land/x/oak/mod.ts'
import authorize from './api/authorize.js'
import getReadme from './api/getReadme.js'
import getToken from './api/getToken.js'
import getTopArtists from './api/getTopArtists.js'
import getTopTracks from './api/getTopTracks.js'

const router = new Router()

router.get('/', ({ response }) => response.body = 'server is running')

router.get('/authorizeSpotify', authorize)
router.post('/spotifyToken', getToken)

router.get('/topTracks', getTopTracks)
router.get('/topArtists', getTopArtists)

router.get('/readme', getReadme)

export default router
