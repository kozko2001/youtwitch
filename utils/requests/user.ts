import { Url } from "url";

type UserResponse = {
    data: Array<User>
  }

export type User = {
    id: string,
    login: string,
    display_name: string,
    description: string,
    profile_image_url: string,
    offline_image_url: string,
    view_count: number
}

const getUser = async (token: string, user_ids: string[] = []):Promise<UserResponse> => {
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    let url = 'https://api.twitch.tv/helix/users'
    if (user_ids.length > 0) {
        url = url + '?' + user_ids.map(id => `id=${id}`).join("&")
    }

    const response = await fetch(url, {
        headers: {
            'Client-Id': '' + client_id,
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}

export {
    getUser,
};