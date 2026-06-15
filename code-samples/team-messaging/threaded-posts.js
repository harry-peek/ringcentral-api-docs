const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
  create_threaded_posts()
})

async function create_threaded_posts() {
  try {
    let chatId = await get_personal_chat_id()
    let parentPost = await create_post(chatId, {
      text: "Thread parent post"
    })
    console.log("Parent post ID: " + parentPost.id)

    let reply = await create_post(chatId, {
      text: "First reply in the thread",
      parentPostId: parentPost.id
    })
    console.log("Reply post ID: " + reply.id)
    console.log("Thread ID: " + reply.threadId)

    let threadPosts = await list_thread_posts(chatId, reply.threadId)
    console.log("Posts in thread:")
    threadPosts.records.forEach((post) => {
      console.log(`- ${post.id}: ${post.text}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

async function get_personal_chat_id() {
  let endpoint = "/team-messaging/v1/chats"
  let resp = await platform.get(endpoint, { type: 'Personal' })
  let jsonObj = await resp.json()
  if (jsonObj.records.length === 0) {
    throw new Error("Personal chat not found")
  }
  return jsonObj.records[0].id
}

async function create_post(chatId, bodyParams) {
  let endpoint = `/team-messaging/v1/chats/${chatId}/posts`
  let resp = await platform.post(endpoint, bodyParams)
  return await resp.json()
}

async function list_thread_posts(chatId, threadId) {
  let endpoint = `/team-messaging/v1/chats/${chatId}/threads/${threadId}/posts`
  let resp = await platform.get(endpoint, { recordCount: 30 })
  return await resp.json()
}
