const Koa = require('koa');
const router = require('koa-router')();
const send = require('koa-send');

const bodyParser = require('koa-body');
const jwt = require('jsonwebtoken');
// =======================
// configuration =========
// =======================
const config = require('./config');
const app = new Koa();

// app.set('tokenSecret', config.tokenSecret);
// creates http server from app, and attach the io (realtime) middleware to app,
const { io, server } = require('./io')(app);

// =======================
// middlewares =========
// =======================
app.use(bodyParser());

const { User } = require('./models')
app.use((ctx, next) => {
  // TODO: move to router logic - separating nonAuth routes
  if (ctx.method == "POST" || ctx.path == "/login") return next();
  ctx.body = ctx.body || {}
  const token = ctx.body.token || ctx.query.token || ctx.headers['x-access-token'];

  try {
   // jsonwebtoken should throw if can't verify https://github.com/auth0/node-jsonwebtoken
   const decoded = jwt.verify(token, config.tokenSecret);
   console.log('DECODED', decoded)
   const user = User.findOne({ '_id': decoded.userId });

   if (!user) throw new Error('user not found');
   if (user.lastActive != decoded.lastActive) throw new Error('stale user');

   ctx.user = user;
   return next();
  }
  catch (err) {
   console.log("token verification middleware failed", err);
   if (ctx.path == "/") return next();
   ctx.status = 403;
   ctx.body = {
     success: false,
     message: "Unauthorized",
     fullMessage: err.message
   }
  }

});


// =======================
// routes =========
// =======================
router.get('/', async (ctx) => {
  const { req, res, user } = ctx;
  if (user) {
    ctx.body = {
      user,
      loggedIn: true
    }
  } else {
    ctx.body = {
      loggedIn: false
    }
  }

  ctx.status = 200;
});

const { auth } = require('./routes');
app.use(router.routes());
app.use(auth.routes());


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message received', msg);
    io.emit('chat message', msg);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, () => console.log("listening on port 3000"));
