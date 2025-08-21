console.log('register.js çalıştı')

const regForm = document.getElementById('registerForm')
regForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const fd = new FormData(regForm)

    const payload = {
        username: fd.get('username'),
        password: fd.get('password')
    }

    const renew = fd.get('renew')

    if(renew !== payload.password){
        alert('passwords are not same')
        window.location.href="/register"
    } 

    try {
        const regRes = await fetch('/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
            credentials: 'include'
        });

        const regData = await regRes.json();

        if(regRes.status != 201) throw new Error('register error');

        const logRes = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(payload),
            credentials: 'include'
        })

        const logData = await logRes.json();

        if(logRes.status != 200) throw new Error('login error');
        console.log("regData: ",regData,`\nlogData: `,logData)
        alert('connected')
        
        window.location.href = '/feed'

        } catch (error) {
            alert('hata')
            console.error(error)
        } 

})