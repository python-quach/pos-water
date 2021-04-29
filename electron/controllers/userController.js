const { channels } = require('../../src/shared/constants');

// USER CONTROLLER

module.exports = (db) => {
    return {
        getUsers: async function (event, _) {
            console.log('controller getUsers');
            const error = 'Unable to Get Users';
            try {
                const data = await db.getAllUsers();
                data
                    ? event.sender.send(channels.GET_USERS, { data })
                    : event.sender.send(channels.GET_USERS, { error });
            } catch (err) {
                return console.log(err.message);
            }
        },

        addUser: async function (event, args) {
            console.log('controller: addUser', args);
            const error = 'Unable to Add User';
            try {
                const result = await db.addUser(args);
                result
                    ? event.sender.send(channels.ADD_USER, { data: result })
                    : event.sender.send(channels.ADD_USER, { error });
            } catch (err) {
                return console.log(err.message);
            }
        },

        deleteUser: async function (event, args) {
            console.log('controller: deleteUser', args);
            const error = 'Unable to delete user';
            try {
                const data = await db.deleteUser(args);
                data
                    ? event.sender.send(channels.DELETE_USER, { data })
                    : event.sender.send(channels.DELETE_USER, { error });
            } catch (err) {
                return console.log(err.message);
            }
        },

        editUser: async function (event, args) {
            console.log('controller: editUser', args);
            const error = 'Unable to Edit User';
            try {
                const data = await db.editUser(args);
                data
                    ? event.sender.send(channels.EDIT_USER, { data })
                    : event.sender.send(channels.EDIT_USER, { error });
            } catch (err) {
                event.sender.send(channels.EDIT_USER, err);
            }
        },
    };
};
