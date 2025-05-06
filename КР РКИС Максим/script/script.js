//#region Константы
const host = 'http://apiweb.api-web-tech.local/'
const context = elem('.content')
//#endregion

let token = ''

//#region Функции-комбайны
function elem(selector) {
    return document.querySelector(selector)
}

function get (params, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', params.url)
    xhr.send()

    xhr.onreadystatechange = function() {
        if(xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}

function post (params, callback) {
    let xhr = new XMLHttpRequest ();
    xhr.open('POST',params.url)
    xhr.send(params.data)

    xhr.onreadystatechange = function() {
        if(xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}

function load(url, c, callback) {
    let xhr = new XMLHttpRequest ();
    xhr.open('GET', url)
    xhr.send()
    
    console.log(c)
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4){http://127.0.0.1:3000/index.html
            c.innerHTML = xhr.responseText;
            if (callback){
                callback()
            }
        }
    }
}
//#endregion

load('/modules/authorization.html', context, onLoadAuth)

function onLoadAuth() {
    elem('.authorize').addEventListener('click', function(){
        let auth_data = new FormData()
        auth_data.append('email', elem('input[name=email]').value)
        auth_data.append('password', elem('input[name=password]').value)

        post ({url:`${host}authorization`, data: auth_data}, function(response){
            response =JSON.parse(response)
            console.log(response)
            if(response.success==true) {
                token = response.token
                load('/modules/show-files.html', context, onLoadShowFiles)
                elem('.callback').innerHTML = ''
            } else {
                elem('.callback').innerHTML = 'Login failed'
            }
        })
    })
}

function onLoadShowFiles () {
    elem('.logout').addEventListener('click', function(){
        let log_data = new FormData()
        log_data.append('token', token)

        post({url: `${host}logout`, data: log_data}, function(response){
            response = JSON.parse(response)
            load('/modules/authorization.html', context, onLoadAuth)
            token = ''
        })
    })
    let show_data = new FormData()
    show_data.append('token', token)

    post({url:`${host}data`, data: show_data}, function(response){
        files_table=JSON.parse(response)

        let table = elem('tbody')
        for(i=0;i<files_table.length; i++) {
            const element = files_table[i]

            let row = document.createElement('tr')
            let id = document.createElement('td')
            id.textContent = element._id
            row.append(id)

            let name = document.createElement('td')
            name.textContent = element.name
            row.append(name)

            let gender = document.createElement('td')
            gender.textContent = element.gender
            row.append(gender)
            
            let age = document.createElement('td')
            age.textContent = element.age
            row.append(age)

            let eyecolor = document.createElement('td')
            eyecolor.textContent = element.eyeColor
            row.append(eyecolor)

            let address = document.createElement('td')
            address.textContent = element.address
            row.append(address)

            let phone = document.createElement('td')
            phone.textContent = element.phone
            row.append(phone)

            let company = document.createElement('td')
            company.textContent = element.company
            row.append(company)

            let balance = document.createElement('td')
            balance.textContent = element.balance
            row.append(balance)

            let favFruit = document.createElement('td')
            favFruit.textContent = element.favoriteFruit
            row.append(favFruit)
            
            let email = document.createElement('td')
            email.textContent = element.email
            row.append(email)

            let picture = document.createElement('td')
            picture.textContent = element.picture
            row.append(picture)

            let register = document.createElement('td')
            register.textContent = element.registered
            row.append(register)

            table.append(row)
        }
    })
}