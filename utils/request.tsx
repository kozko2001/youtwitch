const getUser = async (token: string) => {
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-Id': '' + client_id,
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}

const getFollowers = async (token: string, user_id?: string): Promise<any> => {
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    if(!user_id) {
        const user = await getUser(token)
        return getFollowers(token, user.data[0].id);
    }
    const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${user_id}&first=100`, {
        headers: {
            'Client-Id': '' + client_id,
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}

export {
    getFollowers,
}