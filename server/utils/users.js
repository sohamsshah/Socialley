const users = [];

// Join User to chat

function userJoin(userId, roomId) {
    const user = { userId, roomId}

    users.push(user);
    return user;
}

// Get the current user

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id == id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users

function getRoomUsers(roomId) {
    return users.filter(user => user.roomId == roomId);
}

module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave
}