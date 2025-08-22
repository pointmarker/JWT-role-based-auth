console.log('feed.js çalıştı')

window.onload = async(e) => {
    try {
        const res = await fetch('/feed',{
            method: 'GET',
            headers: {'Content-Type': "application/json"},
            credentials: 'include'
        }) 

        if(!res.ok) throw new Error('feede giriş hatası');

        const userres = await fetch('/api/current-user', { credentials:'include' });
        const data = await userres.json();
        console.log(data.username, data.role);

    } catch (error) {
        console.error("feed.js hata",error)
    }
}
