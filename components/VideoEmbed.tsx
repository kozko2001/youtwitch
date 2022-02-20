export declare interface VideoEmbedProps {
    video_id: string
}


const VideoEmbed = (props: VideoEmbedProps) => {
    const parent = process.env.NEXT_PUBLIC_TWITCH_PARENT
    const url = `https://player.twitch.tv/?video=${props.video_id}&parent=${parent}&autoplay=true&muted=false`
    return (
        <div className='sm:col-span-1 md:col-span-3 lg:col-span-4 bg-indigo-400 row-span-3'>
        <iframe
          style={{"maxHeight": '600px'}}
          className='aspect-video'
          src={url}
          width="100%"
          allowFullScreen>
      </iframe>
      </div>
    )
}

export default VideoEmbed
