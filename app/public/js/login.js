console.log('login.js çalıştı')

const logForm = document.getElementById('loginForm')
logForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const fd = new FormData(regForm)

    const payload = {
        username: fd.get('username'),
        password: fd.get('password')
    }

    try {
        const logRes = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(payload),
            credentials: 'include'
        })

        const logData = await logRes.json();
        console.log(logData)
        if(logRes.status != 200) throw new Error('login error');

        const curUserRes = await fetch('/api/current-user', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            credentials: 'include'
        })

        alert('connected')
        window.location.href = '/feed'

        } catch (error) {
            alert('hata')
            console.error(error)
        } 

})