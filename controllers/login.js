var fn_login = async (ctx, next) => {
  const userName = ctx.request.body.userName
  const password = ctx.request.body.password
  let res 
  if (userName === 'chenliuqing' && password === '123456'){
    res = {
      code: 0,
      data: [],
      msg: "success"
    }
  }else {
    res = {
      code: 1,
      data: [],
      msg: "账号信息有误"
    }
  }
  ctx.response.body = res
}

module.exports = {
  'POST /user/login': fn_login
}