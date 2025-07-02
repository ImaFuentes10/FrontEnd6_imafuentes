/* API REQUESTS */
// User data request
async function getName() {
    const url = "randomuser/api/"; //configure proxy en vite.config.js para evitar CORS
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const json = await response.json();
        return json;
    } catch(error) {
        console.error('Error in getName:', error);
        return null;
    }
}

// Post data request
async function getPost(id) {
    const url = "https://dummyjson.com/posts/" + id;
    /* const url = BASE_URL + id; */
    
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const json = await response.json();
        return json;
    } catch(error) {
        console.error('Error in getPost:', error);
        return null;
    }
}

/* EXPORT DATA */
// User data
export async function userData(){
    const data = await getName();
    
    if(!data || !data.results || !Array.isArray(data.results) || data.results.length === 0) return;

    const results = data.results[0];

    if(!results.picture || !results.picture.large || !results.picture.large.length === 0 || !results.name || !results.name.length === 0 || !results.name.first || !results.name.last || !results.name.first.length === 0 || !results.name.last.length === 0 || !results.login || !results.login.username || !results.login.length === 0 || !results.login.username.length === 0) return;

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
    
    if(!data) return

    const body = data.body;

    return { body }
}

//Tweet interactions data
export async function tweetInteractions() {
    const id = getID();

    const data = await getPost(id);
    if(!data) return

    const likes = data.reactions.likes;
    const retweets = data.userId;
    const views = data.views;
    const comments = data.reactions.dislikes;

    if(!likes || !retweets || !views || !comments ) return

    return { likes, retweets, views, comments }
}

//random ID generator
function getID() {
    return Math.floor(Math.random() * 101);
}

/* console.log(await userData())
console.log(await tweetBodyAndInteractions()) */
