import { tweetsData } from "./data.js";

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')
let isLikeIcon = false
let isRetweeted = false

tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
    tweetInput.value = ''
})

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeCount(e.target.dataset.like)
    //    isLikeIcon = !isLikeIcon
       render() 
    } else  if(e.target.dataset.retweet) {
        handleRetweetCount(e.target.dataset.retweet)
    }
})


function handleLikeCount (tweetId) {
    //targetTweetObj.likes++
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId
    })[0]    
    //like count logic
    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetCount(tweetId) {
    //console.log(tweetId)
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function getFeedHtml(){
    
    let feedHtml = ``

    tweetsData.forEach(tweet => {

        let likeIconClass = ''
        let repliesHtml = ``


        if(tweet.replies.length > 0) {
            // 
            tweet.replies.forEach(function(reply) {
                repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
            `})
        }

        if(tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''
        
        if(tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>  
            </div>
`
    })

    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()