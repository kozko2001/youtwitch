import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { getData, Data } from '../utils/request'
import VideoItem from '../components/VideoItem'
import Cookies from 'js-cookie'

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
  useEffect(() => {
    const token = checkToken()
    if(!token) {
      window.location.href = "/login/index.html";
      return;
    } else {
      getData(token).then((d) => { 
        setData(d)
      })
    }
  }, []);

  const count = data?.videos.length ?? 0;
  const items = (data?.videos ?? []).map(item => <VideoItem item={item} key={item.id} />);
  return (
    <div>
      <a> there is ... {`${count}`}</a>
      <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {items}
      </div>
    </div>
  )
}

export default Home
