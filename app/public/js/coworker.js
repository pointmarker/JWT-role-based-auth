console.log('coworker.js çalıştı')

window.onload = async(e) => {
    try {
        const res = await fetch('/coworker',{
            method: 'GET',
            headers: {'Content-Type': "application/json"},
            credentials: 'include'
        }) 

        if(!res.ok) {
            alert('not authorized')
            window.location.href = "/login"
        }
        const data = await res.json()

    } catch (error) {
        console.error("coworker.js hata",error)
    }
}
