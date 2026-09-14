export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(`Hello, ${name} ${email}! Your password is save: ${password}`);
  res.send(`Hello, ${name} ${email}! Your password is save: ${password}`);
};
export const login = async (req, res) => {};
