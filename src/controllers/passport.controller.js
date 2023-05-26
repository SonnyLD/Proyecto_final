export default class PassportController {
  fail = async (req, res) => {
      console.log('Failed login');
      res.redirect('error', { error: 'Failed login' });
  };

  signUp = async (req, res) => {
      res.status(201).redirect('/products');
  };

  login = async (req, res) => {
      /*     req.session.logged = true; 
  req.session.user = req.user; */
      res.status(200).redirect('/products');
  };

  logout = async (req, res, next) => {
      try {
          await req.logout(async (err) => {
              if (err) return next(err);

              await req.session.destroy(() =>
                  res.status(200).json({ redirectURL: '/' })
              );
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };
}