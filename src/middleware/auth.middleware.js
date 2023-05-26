export default function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
      return res.redirect('/login');
  }

  req.session.touch();
  return next();
}