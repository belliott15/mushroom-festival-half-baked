// import functions and grab DOM elements
import { renderMushroom, renderFriend, renderBerry, renderPoison } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;
let berryCount = 1;
let poisonCount = 1;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() < 0.33) {
        alert('You found a mushroom!');
        mushroomCount++;
        displayFood();
    } else if (Math.random() > 0.66){
        alert('You found a berry!');
        berryCount++;
        displayFood();
    } else if (Math.random() > 0.75) {
        alert('You found a special mushroom');
        poisonCount++;
        displayFood();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    if (friendInputEl.value === '') {
        const friendRandom = Math.floor(Math.random() * 10000);
        const friendRandomObj = { name: `Friend #${friendRandom}`, satisfaction: 1 };
        friendData.push(friendRandomObj);
        displayFriends();
    } else {
        const friend = friendInputEl.value;
    // create a new friend object
        const friendObj = { name: friend, satisfaction: 1, resistance: true };
    // push it into the friends state array, passed in as an argument
        friendData.push(friendObj);
    // reset the input
        friendInputEl.value = '';
    // display all the friends (use a function here)
        displayFriends();
    }
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        if (friend.satisfaction === 0) {
            friendEl.classList.add('dead');
        } else {
            friendEl.addEventListener('click', () => {
        //      and if the friend's satisfaction level is below 3 and you have mushrooms left
        //      increment the friends satisfaction and decrement your mushrooms
                if (friend.satisfaction < 3 && mushroomCount > 0) {
                    friend.satisfaction++;
                    mushroomCount--;
                } else if (friend.satisfaction >= 3 && berryCount > 0){
                    friend.satisfaction ++;
                    berryCount--;
                } else if (friend.resistance !== true && poisonCount > 0){
                    friend.satisfaction--;
                    poisonCount--;
                } else {
                    alert('Go forage for other supplies');
                }
                

        //       then display your friends and mushrooms with the updated state
                displayFriends();
                displayFood();
            });
        }
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayFood() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomsImg = renderMushroom();
        mushroomsEl.append(mushroomsImg);
    }
    for (let i = 0; i < berryCount; i++) {
        const berryImg = renderBerry();
        mushroomsEl.append(berryImg);
    }
    for (let i = 0; i < poisonCount; i++) {
        const poisonImg = renderPoison();
        mushroomsEl.append(poisonImg);
    }

}
displayFriends();
displayFood();

// const poisonResistance = Math.ceil(Math.random() * 2);
// if (poisonResistance === 1){
//     friendData.resistance = true;
// } else {
//     friendData.resistance = false;
// }
// console.log(poisonResistance);