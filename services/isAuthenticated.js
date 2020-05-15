import {verify} from './jwtServices'

export const isAuthenticated = (req, res, next) => {
  try  {
    const isAuthenticated = verify(req);
    return next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'not authorized'
    });
  }
}
