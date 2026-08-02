export async function getLatestPosts() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/posts');
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message);
        }
        return json.posts;
    } catch (error) {
        console.log('[ERROR]', error);
        return null;
    }
}