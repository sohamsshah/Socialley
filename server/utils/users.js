const users = []; // db // 1 2 3

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
function userLeave(userId) {
    users = users.filter((user) => user.userId !== userId);
    return userId;
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