import { AccessToken } from 'livekit-server-sdk'
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const port = process.env.PORT || 5000



// middlewares
app.use(cors(["loaclhost:3000"]))
app.use(express.json())


const createToken = async () => {
  // if this room doesn't exist, it'll be automatically created when the first
  // client joins
  const roomName = 'TestLive';
  // identifier to be used for participant.
  // it's available as LocalParticipant.identity with livekit-client SDK
  const participantName = 'jamil2001';

  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: participantName,
    // token to expire after 10 minutes
    ttl: '59m',
  });
  at.addGrant({ roomJoin: true, room: roomName });
  // console.log(at)
  return await at.toJwt();
}




app.get('/', (req, res) => {
  res.send('Testing!')
})
app.get('/getToken', async (req, res) => {
  // res.send(await createToken());
  let a = await createToken()
  res.send({"token":a})
});
app.listen(port, () => {
  console.log(`testing server ${port}`)
})

