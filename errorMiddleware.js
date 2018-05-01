module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    if (typeof err === 'HTTPError') {
      ctx.status = err.status;
    }
    ctx.body = { errors: [err.message] };
  }
};
