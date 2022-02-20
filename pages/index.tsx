import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { getData, Data } from '../utils/request'
import VideoItem from '../components/VideoItem'
import Header from '../components/Header'
import Cookies from 'js-cookie'
import VideoEmbed from '../components/VideoEmbed'

const checkToken = (): string | null => {
  const params = new URLSearchParams(window.location.hash.substring(1))
  let access_token = params.get('access_token')
  if (access_token) {
    Cookies.set('token', access_token);
    return access_token;
  }
  const token = Cookies.get('token') ?? null;
  return token;
}


const Home: NextPage = () => {
  const [data, setData] = useState<Data | undefined>();
  const [currentVideo, setCurrentVideo] = useState<string | undefined>();

  useEffect(() => {
    const token = checkToken()
    if(!token) {
      window.location.href = "/login/index.html";
      return;
    } else {
      getData(token).then((d) => { 
        setData(d)
      }).catch(e => {
        window.location.href = "/login/index.html";
      })
    }

  }, []);
  const setVideo = (video: string) => {
    setCurrentVideo(video);
    window.scrollTo(0, 0);
  }

  const items = (data?.videos ?? []).map(item => <VideoItem item={item} key={item.id} setVideo={setVideo}  />);

  return (
    <div className='container mx-auto'>
      <Header />
      <div className="holder mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {currentVideo && <VideoEmbed video_id={currentVideo} />}
        {items}
      </div>
    </div>
  )
}

export default Home
