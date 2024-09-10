export const getFollowings = async (token, id) => {
    const url = `http://localhost:3000/api/follow/followings/${id}`;
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    try {
        const resp = await fetch(url, requestOptions);
        if (!resp.ok) {
            throw new Error('Failed to fetch Followings');
        }
        const { followings } = await resp.json();
        return followings;
    } catch (error) {
        console.error('Error fetching Followings:', error);
        throw error; 
    }
};