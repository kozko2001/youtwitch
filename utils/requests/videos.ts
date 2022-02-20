
type VideosResponse = {
    data: Array<VideoResponse>
  }

type VideoResponse = {
    id: string,
    stream_id: string,
    user_id: string,
    user_login: string,
    user_name: string,
    title: string,
    description: string,
    created_at: string,
    url: string,
    thumbnail_url: string,
    duration: string,
    view_count: number,
    type: string,
}

export type Video = VideoResponse & { created_at_date: number}

const getVideos = async (token: string, user_id: string):Promise<Array<Video>> => {
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    const params = new URLSearchParams()
    params.set("user_id", user_id)
    params.set("first", "100")
    
    let url = `https://api.twitch.tv/helix/videos?${params.toString()}`

    const response = await fetch(url, {
        headers: {
            'Client-Id': '' + client_id,
            'Authorization': `Bearer ${token}`,
        }
    });

    const json:VideosResponse = await response.json();
    return json.data.map(v => ({
        ...v,
        created_at_date: Date.parse(v.created_at)
    }))
}

export {
    getVideos
};