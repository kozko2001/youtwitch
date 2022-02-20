export declare interface VideoEmbedProps {
    video_id: string
}


const VideoEmbed = (props: VideoEmbedProps) => {
    const url = `https://player.twitch.tv/?video=${props.video_id}&parent=localhost&autoplay=true&muted=false`
    return (
        <div className='sm:col-span-1 md:col-span-3 lg:col-span-4 bg-indigo-400 row-span-3'>
        <iframe
          style={{"maxHeight": '600px'}}
          className='aspect-video'
          src={url}
          width="100%"
          allowFullscreen="true">
      </iframe>
      </div>
    )
}

export default VideoEmbed
