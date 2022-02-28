import { useCallback, useState, useEffect } from 'react'
import { getRecommenderData } from './../utils/request'
import { Video } from './../utils/requests/videos'
import VideoItem from './VideoItem'


export declare interface RecommendationProps {
    channel: string
    token: string,
    setVideo: (video: string, channel: string) => void
}


const Recommendation = (props: RecommendationProps) => {
    const [data, setData] = useState<Array<Video> | undefined>();

    useEffect(() => {
        const d = getRecommenderData(props.token, props.channel)
            .then(setData)
    }, [props.channel, props.channel]);

    const items = (data ?? []).map(item => <VideoItem recommender item={item} key={item.id} setVideo={props.setVideo} user_display_name={item.user_name} user_login={item.user_login} />);

    return (<> {items} </>)
}

export default Recommendation
