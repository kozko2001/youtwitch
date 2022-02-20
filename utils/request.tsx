import { getUser, User } from './requests/user'
import { getFollowers } from './requests/followers'
import { getVideos, Video } from './requests/videos'


export type VideoWithUser = Video & { user: User }
export type Data = {
    user: User,
    videos: Array<VideoWithUser>,
    followers: Array<User>
}

const getData = async (token: string): Promise<Data> => {
    const userResponse = await getUser(token);
    const user = userResponse.data[0];

    const followersResponse = await getFollowers(token, user.id);
    const followersIds = followersResponse.data.map(follower => follower.to_id);
    const followers = await (await getUser(token, followersIds)).data
    
    const followersUsers = Object.assign({}, ...followers.map((x) => ({[x.id]: x})))
    
    const videos = (await Promise.all(followersIds.map(user_id => getVideos(token, user_id))))
            .flat()
            .map(v => ({
                ...v,
                user: followersUsers[v.user_id]
            }))
            .sort((a, b) => {
                const keyA = new Date(a.created_at_date);
                const keyB = new Date(b.created_at_date);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            })

    return {
        "user": user,
        "followers": followersUsers,
        "videos": videos,
    }
}



export {
    getData,
}
