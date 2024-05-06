// userController.js

// Sample user data
let users = [];

// Function to create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Function to get all users
exports.getAllUsers = (req, res) => {
  res.json(users);
};

// Function to get a specific user by ID
exports.getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Function to update a user by ID
exports.updateUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { name, email } = req.body;
  user.name = name;
  user.email = email;
  res.json(user);
};

// Function to delete a user by ID
exports.deleteUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
};
