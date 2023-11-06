
export const checkUserAutentificated = (req, res, next)=>{
 
  if(req.user){
    next();
  } else{
    res.redirect("/login")
  }
}

export const showLoginView = (req, res, next)=>{
    if(req.user){
        res.redirect("/perfil")
      } else{
        next();
    }
  }
export const checkRole  =(roles)=>{//roles = [admin]
  return (req, res, next)=>{
      console.log("usuario", roles)
      const userRole = req.user && req.user.role;
      console.log("userRole", req.user)
      if(userRole ==='admin'){
        next();
      }else{
        res.json({status:"error", message:"no tienes permisos para usar este recurso"})
      }
     
  }
    
}  