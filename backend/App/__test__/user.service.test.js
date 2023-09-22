const test = require('ava');

const userService = require('../services/user.service');

let sampleUser;
let updateParams;
let another;

test.beforeEach(()=>{
    sampleUser={
        name:"John Doe",
        email:"johndoe@hotmail.com",
        city:"New York",
        country:"US"
    };
    updateParams={
        name:"James Avogadro",
        email:"jamesavos@net.me"
    };
    another={
        name:"Roxanne Simango",
        email:"roxysimaz@hotmail.com",
        city:"chipinge",
        country:"Zimbabwe"
    }
});
test.after(()=>{
    if(userService.getUser(2)){
        userService.deleteUser(2);
    }
});

/**
 * creating a new user
 */
test('must Create a user', (t)=>{
    const expectedId =1;
    const user =userService.addUser(sampleUser);
    t.is(user.id,expectedId);
    t.deepEqual(user,{id:expectedId, ...sampleUser});
});

/**
 * reading a user by id
 */
test('must Read a user', (t)=>{
    const expectedId =1;
    const user =userService.getUser(expectedId);
    t.is(user.id,expectedId);
    t.deepEqual(user,{id:expectedId, ...sampleUser});
});
/**
 * getting all users
 */
test('must Read all users', (t)=>{
    const expectedId =1;
    // creating a second user
    userService.addUser(another);
    const users =userService.getAllUsers();
    t.deepEqual(users,[{id:expectedId, ...sampleUser}, {id:2, ...another}]);
});
/**
 * updating user test
 */
test('must Update a user', (t)=>{
    const expectedId =1;
    const updateDetails = {
        ...sampleUser,
        ...updateParams,
        id:expectedId
    }
    const user =userService.updateUser(updateDetails);
    t.is(user.id,expectedId);
    t.deepEqual(user,{id:expectedId, ...updateDetails});
});
/**
 * deleting user test
 */
test('must Delete a user', (t)=>{
    const expectedId =1;
    const deletedUser =userService.deleteUser(expectedId);
    t.is(deletedUser.id,expectedId);
    t.deepEqual(deletedUser,{id:expectedId, ...sampleUser, ...updateParams});

    // testing availability by retrieval after deletion
    const user = userService.getUser(expectedId);
    t.is(user, null);
});
