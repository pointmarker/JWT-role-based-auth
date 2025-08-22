console.log('admin.js çalıştı')

window.onload = async(e) => {
    try {
        const res = await fetch('/admin',{
            method: 'GET',
            headers: {'Content-Type': "application/json"},
            credentials: 'include'
        }) 

        if(!res.ok) throw new Error('admine giriş hatası');

        const data = await res.json()

        console.log(data.username, data.role)

    } catch (error) {
        console.error("feed.js hata",error)
    }
}
