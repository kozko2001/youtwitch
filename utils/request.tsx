import { getUser, User } from './requests/user'
import { getFollowers } from './requests/followers'
import { getVideos, Video } from './requests/videos'


export type Data = {
    user: User,
    videos: Array<Video>,
    followers: Array<User>
}

const getData = async (token: string): Promise<Data> => {
    const userResponse = await getUser(token);
    if(!userResponse.data) {
        throw new Error('no authorized');
    }
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

const getRecommenderData = async (token: string, channel: string): Promise<Array<Video>> => {   
    const response = await fetch(`${process.env.NEXT_PUBLIC_RECOMMEND_BASE}/api/recommend`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({channel}) // body data type must match "Content-Type" header
    });
    const video_ids:Array<number> = (await response.json()).result.map((x:any) => x.id )
    const promises = video_ids.map(vid => getVideos(token, vid.toString(), true))

    const videos = (await Promise.all(promises))
            .map(x => x[0])
            .map(v => ({
                ...v,
                user: undefined
            }))
            .sort((a, b) => {
                const keyA = new Date(a.created_at_date);
                const keyB = new Date(b.created_at_date);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            })

    return videos;
}

export {
    getData,
    getRecommenderData
}
