const expect = require('expect');

const { Users } = require('./users');

describe('User', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Sam',
                room: 'Scrubs Fans',
            },
            {
                id: '2',
                name: 'Mike',
                room: 'The Office Fans',
            },
            {
                id: '3',
                name: 'Jose',
                room: 'The Office Fans',
            },
        ];
    });

    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: '992001',
            name: 'Tuyen',
            room: 'Home',
        };

        let reUser = users.addUser(user.id, user.name, user.room);

        expect.expect(users.users).toEqual([user]);
    });

    it('Should return names for The Office fans', () => {
        let userList = users.getUserList('The Office Fans');

        expect.expect(userList).toEqual(['Mike', 'Jose']);
    });
    it('Should return names for Scrubs Fans', () => {
        let userList = users.getUserList('Scrubs Fans');

        expect.expect(userList).toEqual(['Sam']);
    });

    it('Should find user', () => {
        let userID = '2',
            user = users.getUser(userID);

        expect.expect(user.id).toBe(userID);
    });

    it('Should not find user', () => {
        let userID = '50',
            user = users.getUser(userID);

        expect.expect(user).toBeUndefined();
    });

    it('Should remove user', () => {
        let userID = '1',
            user = users.removeUser(userID);
        expect.expect(user.id).toBe(userID);
        expect.expect(users.users.length).toBe(2);
    });
    it('Should not remove user', () => {
        let userID = '108',
            user = users.removeUser(userID);
        expect.expect(user).toBeUndefined();
        expect.expect(users.users.length).toBe(3);
    });
});
