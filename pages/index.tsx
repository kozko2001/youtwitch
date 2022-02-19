import type { NextPage } from 'next'
import { useEffect } from 'react';
import { getFollowers } from '../utils/request'
import Cookies from 'js-cookie'

const onClick = async () => {
  const token = checkToken();
  const followers = await getFollowers(token);
  console.log(followers);
}

const checkToken = () => {
  const params = new URLSearchParams(window.location.hash.substring(1))
  let access_token = params.get('access_token')
  if (access_token) {
    Cookies.set('token', access_token);
    return access_token;
  }
  const token = Cookies.get('token')
  return token;
}

const Home: NextPage = () => {
  useEffect(() => {
    const token = checkToken()
    if(!token) {
      window.location.href = "/login";
      return;
    }

  });
  return (
    <div>
      <a onClick={onClick}> click me !</a>
    </div>
  )
}

export default Home
