export const isPostLikedByUser = (post, userId) => {
    for (let item of post.likedByUsers) {
        if (item.id === userId) return true;
    }
    return false;
}

export const isCommentLikedByUser = (comment, userId) => {
    for (let item of comment.likedByUsers) {
        if (item.id === userId) return true;
    }
    return false;
}

export const isSavedPost = (user, postId) => {
    if (user && user.savedPost) {
        for (let item of user.savedPost) {
            if (item.id === postId) return true;
        }
    }
    return false;
}


export const isFollowing = (reqUser, user) => {
    if (reqUser && user) {
        for (let item of user.follower) {
            if (reqUser.id === item.id) return true;
        }
    }
    return false;
}

function getTimeInHours(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}

export const hasStory = (users) => {
    const temp = users.reduce((acc, item) => {
        if (item.stories?.length > 0) {
            const time = getTimeInHours(item.stories[item.stories?.length-1].timestamp);
            if (time < 24) {
                acc.push(item);
            }
        }
        return acc;
    }, []);

    return temp;
}

export const isReqUser = (userId1, userId2) => {
    if (userId1 && userId2) return userId1 === userId2;
}

export const timeDifference = (timestamp) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const days = Math.floor(hr / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hr > 0) {
        return hr + " hour" + (hr === 1 ? "" : "s") + " ago";
    } else if (min > 0) {
        return min + " minute" + (min === 1 ? "" : "s") + " ago";
    } else if (sec > 0) {
        return sec + " second" + (sec === 1 ? "" : "s") + " ago";
    } else {
        return "now";
    }
}