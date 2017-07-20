/* @params: controller object, and router
** @returns the router, with the routes attached
*/
module.exports = ({ auth }, router) => {
  router
    .get('/login', auth.getLogin)

    .get('/logout', auth.getLogout)

    .get('/register', auth.getRegister)

    .post('/login', auth.postLogin)

    .post('/register', auth.postRegister)

    return router;
}
