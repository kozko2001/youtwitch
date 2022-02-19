type FollowResponse = {
    data: Array<{
        from_id: string,
        from_login: string,
        from_name: string,
        to_id: string,
        to_login: string,
        to_name: string,
    }>
  }

const getFollowers = async (token: string, user_id: string): Promise<FollowResponse> => {
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${user_id}&first=100`, {
        headers: {
            'Client-Id': '' + client_id,
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}


export {
    getFollowers
}