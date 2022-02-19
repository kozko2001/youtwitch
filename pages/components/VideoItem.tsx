import { VideoWithUser } from '../../utils/request'


export declare interface VideoItemProps {
    item: VideoWithUser
}

const openUrl = (url: string) => {
    window.open(url);
}

const VideoItem = (props: VideoItemProps) => {
    const image_url = props.item.thumbnail_url.replace('%{width}','360').replace('%{height}', '202')
    return (
        <div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative" onClick={() => openUrl(props.item.url)}>
            <img className="w-full" src={image_url} alt="" />
            <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">{props.item.type}</div>
            <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
            <span className="mr-1 p-1 px-2 font-bold">{props.item.view_count} Watching</span>
            <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">{props.item.duration}</span>
            
            </div>
            <div className="desc p-4 text-gray-800">
                <a href="#" className="title font-bold block cursor-pointer hover:underline">{props.item.title}</a>
                <a href="#" target="_new" className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">@{props.item.user.display_name}</a>
                <span className="description text-sm block py-2 border-gray-400 mb-2">{props.item.description}</span>
            </div>
        </div>
    )
}

export default VideoItem
