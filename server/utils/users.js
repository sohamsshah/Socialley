let users = []; // db // 1 2 3

// Join User to chat

function userJoin(userId, roomId) {
    const user = { userId, roomId}

    users.push(user);
    return user;
}

// Get the current user

function getCurrentUser(userId) {
    return users.find(user => user.userId === userId);
}

// User leaves chat
function userLeave(userId) {
    const user = getCurrentUser(userId);
    users = users.filter((user) => user.userId !== userId);
    return user;
     
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