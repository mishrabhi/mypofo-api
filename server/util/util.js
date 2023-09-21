exports.pagination = (req) => {
  let pno = 1,
    skip = 0,
    psize = 10;
  if (
    req.query.psize != undefined &&
    req.qeury.psize != null &&
    !isNaN(req.query.psize)
  ) {
    psize = parseInt(req.query.psize);
  }
  if (
    req.query.pno != undefined &&
    req.query.pno != null &&
    isNaN(req.query.pno)
  ) {
    pno = parseInt(req.query.pno);
  }

  skip = (pno - 1) * psize;

  return { skip, psize, pno };
};
