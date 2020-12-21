function makeUsersArray() {
    return [
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@yahoo.com",
            password: "12345678",
            date_of_birth: "1987-10-25T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
        {
            id: 2,
            first_name: "Jane",
            last_name: "Bro",
            email: "janebro@gmail.com",
            password: "82746293",
            date_of_birth: "1976-12-13T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
        {
            id: 3,
            first_name: "Jason",
            last_name: "Good",
            email: "jasongood@aol.com",
            password: "82738274",
            date_of_birth: "1999-01-22T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
        {
            id: 4,
            first_name: "Michelle",
            last_name: "Doherty",
            email: "michelledoherty@msn.com",
            password: "82768738",
            date_of_birth: "1989-08-05T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
        {
            id: 5,
            first_name: "Louis",
            last_name: "Kitty",
            email: "louiskitty@hotmail.com",
            password: "83738467",
            date_of_birth: "1996-11-17T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
        {
            id: 6,
            first_name: "Minous",
            last_name: "Kitty",
            email: "minouskitty@yahoo.com",
            password: "76584873",
            date_of_birth: "1965-05-29T00:00:00.000Z",
            date_created: "2020-12-06T02:38:02.250Z"
        },
    ];
}

function makeNewUser() {
    const newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@yahoo.com',
        password: '12345678',
        date_of_birth: '12/12/1999'
    }
    return { newUser }
}

module.exports = {
    makeUsersArray,
    makeNewUser
}