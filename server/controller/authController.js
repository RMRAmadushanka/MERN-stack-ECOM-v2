import User from "../models/user.js";

const createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

const currentUser = async (req, res) => {
    
  User.findOne({ email: req.user.email })
    .then((res) => {
        console.log(res);
        res.json();
    })
    .catch((err) => {
      res.status(401).json({
        err: "Invalid or expired token",
      });
    });
};
export { createOrUpdateUser, currentUser };
