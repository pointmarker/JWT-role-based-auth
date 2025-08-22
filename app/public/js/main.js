console.log('main.js çalıştı')

const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn){
    logoutBtn.onclick = async(e) => {
        try {
            const res = await fetch('/auth/logout',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                credentials:'include'
            })

            if(!res.ok){
                throw new Error('logout request error')
            }

            window.location.href='/'

        } catch (error) {
            console.error(error)
        }
    }
}