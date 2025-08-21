console.log('coworker.js çalıştı')

window.onload = async(e) => {
    try {
        const res = await fetch('/auth/coworker',{
            method: 'GET',
            headers: {'Content-Type': "application/json"},
            credentials: 'include'
        }) 

        if(!res.ok) {
            alert('not authorized')
            window.onload.href = "/login"
        }
        const data = await res.json()

        console.log(data.username, data.role)

    } catch (error) {
        console.error("feed.js hata",error)
        alert('not authorized')
        window.onload.href = "/login"
    }
}
