import { getUser } from './requests/user'
import { getFollowers } from './requests/followers'
import { getVideos } from './requests/videos'

const getData = async (token: string) => {
    const userResponse = await getUser(token);
    const user = userResponse.data[0];

    const followersResponse = await getFollowers(token, user.id);
    const followersIds = followersResponse.data.map(follower => follower.to_id);
    const followers = await (await getUser(token, followersIds)).data
    
    const videos = (await Promise.all(followersIds.map(user_id => getVideos(token, user_id)))).map(v => v.data).flat();

    return {
        "user": user,
        "followers": Object.assign({}, ...followers.map((x) => ({[x.id]: x}))),
        "videos": videos,
    }
}



export {
    getData,
}