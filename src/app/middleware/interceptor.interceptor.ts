import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
 

   const token = localStorage.getItem('token');

  const reqClone = req.clone ({
     setHeaders: {
      authorization: `Bearer ${token}`
     }
  });
  return next(reqClone)

};
