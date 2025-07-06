const readOnlyEmails = ["BossMan@gmail.com", "testerapp2232@gmail.com"];

const restrictDemoUser = (req, res, next) => {
  const userEmail = req.user?.email;
  if (readOnlyEmails.includes(userEmail)) {
    return res.status(403).json({
      success: false,
      message: "This is a demo account. You can only view data.",
    });
  }
  next();
};

export default restrictDemoUser;
