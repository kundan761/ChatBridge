import Group from "../models/group.model.js";

// @desc    Create a new group
// @route   POST /api/groups/create
// @access  Private
const createGroup = async (req, res) => {
  const { name, members } = req.body;
  
  try {
    const group = await Group.create({
      name,
      members,
      admin: req.user.id,
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error });
  }
};

// @desc    Add a user to group
// @route   PUT /api/groups/:groupId/add
// @access  Private
const addUserToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to group', error });
  }
};

export { createGroup, addUserToGroup };
