/* API REQUESTS */
// User data request
async function getName() {
    const url = "https://randomuser.me/api/";
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error ('Response status:', response.status)
        }
        const json = await response.json();
        return json;
    } catch(error) {
        console.error(error.message)
    }
}

// Post data request
async function getPost(id) {
    const url = "https://dummyjson.com/posts/" + id;
    /* const url = BASE_URL + id; */
    
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error ('Response status:', response.status)
        }
        const json = await response.json();
        return json;
    } catch(error) {
        console.error(error.message)
    }
}

/* EXPORT DATA */
// User data
export async function userData(){
    const data = await getName();
    const results = data.results[0];

    const firstName = results.name.first;
    const lastName = results.name.last;
    const name = `${firstName} ${lastName}`;

    const username = results.login.username;

    const picture = results.picture.large;
    
    return {name, username, picture}
}

// Tweet body data
export async function tweetBody() {
    const id = getID();

    const data = await getPost(id);
    
    const body = data.body;

    return body
}

//Tweet interactions data
export async function tweetInteractions() {
    const id = getID();

    const data = await getPost(id);
    
    const likes = data.reactions.likes;
    const retweets = data.userId;
    const views = data.views;
    const comments = data.reactions.dislikes;

    return {likes, retweets, views, comments}
}

//random ID generator
function getID() {
    return Math.floor(Math.random() * 101);
}

/* console.log(await userData())
console.log(await tweetBodyAndInteractions()) */
