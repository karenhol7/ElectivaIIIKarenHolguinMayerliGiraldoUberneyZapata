export const unFollowUser = async (token, {id}) => {
    const url = `http://localhost:3000/api/follow/unfollow`;
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            userIdToUnFollow: id
          }),
    };

    try {
        const resp = await fetch(url, requestOptions);
        
        if (!resp.ok) {
            throw new Error('Failed to fetch followers');
        }
        const { response } = await resp.json();
        return response;
    } catch (error) {
        console.error('Error fetching followers:', error);
        throw error; 
    }
};