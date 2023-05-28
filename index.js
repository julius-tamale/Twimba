import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(uuidv4());
// const tweetBtn = document.getElementById('tweet-btn')


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeCount(e.target.dataset.like)
    //    isLikeIcon = !isLikeIcon
       render() 
    } else  if(e.target.dataset.retweet) {
        handleRetweetCount(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
})


function handleLikeCount (tweetId) {
    
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId
    })[0]    
    
    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetCount(tweetId) {
    
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

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden') 
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    // console.log(tweetInput.value)
    if(tweetInput.value){
        tweetsData.unshift({
            name: `Kabaka Jewlius`,
            handle: `@kabakajewlius`,
            profilePic: `images/portrait.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })
        render()
        tweetInput.value = ''
    }
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
                                    <div class='initials'>
                                        <p class="name">${reply.myname}</p>
                                        <p class="handle">${reply.handle}</p>
                                    </div>
                    </div>
                    <p class="tweet-text">${reply.tweetText}</p>
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
                        <p class="name">${tweet.myname}</p>
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