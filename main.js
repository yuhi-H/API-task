"use strict";

const urlSignUp = "https://teachapi.herokuapp.com/sign_up";
const urlSignIn = "https://teachapi.herokuapp.com/sign_in";
const urlUsers = "https://teachapi.herokuapp.com/users";
const urlPostUp = "https://teachapi.herokuapp.com/posts";
const urlPosts = "https://teachapi.herokuapp.com/posts";


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const sign_up = () => {// ユーザー登録
    const user_name = document.getElementById("user_name").value;
    const user_bio = document.getElementById("user_bio").value;
    const user_email = document.getElementById("user_email").value;
    const user_password = document.getElementById("user_password").value;
    const user_password_confirmation = document.getElementById("user_password_confirmation").value;
    const bodyData = {
        sign_up_user_params: {
            name: user_name,
            bio: user_bio,
            email: user_email,
            password: user_password,
            password_confirmation: user_password_confirmation,
        }
    };
    const myBody = JSON.stringify(bodyData);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: myBody,
    };
    fetch(urlSignUp, requestOptions)
        .then(response => response.json())
        .then(json => {
            localStorage.token = json.token;
            localStorage.id = json.id;
            localStorage.name = json.name;
            localStorage.bio = json.bio;
            console.log(json);
        })
        .catch(error => console.log(`Error: ${error}`));
}


const get_users = () => {// ユーザー一覧
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myToken = localStorage.getItem('token');
    myHeaders.append("Authorization", `Bearer ${myToken}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    fetch(urlUsers, requestOptions)
        .then(response => response.json())
        .then(json => {
            let userText = "";
            json.forEach(element => {
                userText += `<li>${element.name}</li>\n`;
            });
            document.getElementById('users').innerHTML = userText;
        })
        .catch(error => console.log(`Error: ${error}`));
}

const sign_in = () => {// ユーザーログイン
    const user_email = document.getElementById("user_email").value;
    const user_password = document.getElementById("user_password").value;
    const user_password_confirmation = document.getElementById("user_password_confirmation").value;
    const bodyData = {
        sign_in_user_params: {
            email: user_email,
            password: user_password,
            password_confirmation: user_password_confirmation,
        }
    };
    const myBody = JSON.stringify(bodyData);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: myBody,
    };
    fetch(urlSignIn, requestOptions)
        .then(response => response.json())
        .then(json => {
            localStorage.token = json.token;
            localStorage.id = json.id;
            localStorage.name = json.name;
            localStorage.bio = json.bio;
            if (localStorage.token) {
                document.getElementById('login_data').innerHTML = 'ログイン中でーす！<br> <a href="" onclick="log_out();" class="btn btn-danger btn mb-4">ログアウト</a>';
            }
        })
        .catch(error => console.log(`Error: ${error}`));
}

const log_out = () => {// ローカルから消してる
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('bio');
}

const post_up = () => {// 投稿作成
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myToken = localStorage.getItem('token');
    const myLocalHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myToken}`
    }
    const postUpText = document.getElementById('postUpText').value;
    const bodyDate = {
        "post_params": {
            "text": postUpText
        }
    }
    const myBody = JSON.stringify(bodyDate);
    console.log("myLocalHeaders")
    console.log(myLocalHeaders)
    const requestOptions = {
        method: "POST",
        headers: myLocalHeaders,
        body: myBody,
    };
    console.log("requestOptions")
    console.log(requestOptions)
    fetch(urlPostUp, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log("成功");
            console.log(json);
            console.log(`urlPostUp: ${urlPostUp}`)
            console.log(`requestOptions: ${JSON.stringify(requestOptions)}`)
            document.getElementById('postUpConfirm').textContent = "投稿完了！！！"
        })
        .catch(error => {
            console.log("失敗");
            console.log(`Error: ${error}`)
            console.log(`urlPostUp: ${urlPostUp}`)
            console.log(`requestOptions: ${JSON.stringify(requestOptions)}`)
        });
}



const put_user = () => {// ユーザー編集
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myToken = localStorage.getItem('token');
    myHeaders.append("Authorization", `Bearer ${myToken}`);
    const myId = localStorage.getItem('id');
    const urlUserEdit = `https://teachapi.herokuapp.com/users/${myId}`;
    const user_name = document.getElementById("user_name").value;
    const user_bio = document.getElementById("user_bio").value;
    const bodyData = {
        "user_params": {
            "name": user_name,
            "bio": user_bio,
        }
    };
    const myBody = JSON.stringify(bodyData);
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: myBody,
    };
    fetch(urlUserEdit, requestOptions)
        .then(response => response.json())
        .then(json => {
            localStorage.name = json.name;
            localStorage.bio = json.bio;
            location.reload();
        })
        .catch(error => console.log(`Error: ${error}`));
}

const get_posts = () => {// 投稿一覧
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myToken = localStorage.getItem('token');
    myHeaders.append("Authorization", `Bearer ${myToken}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    fetch(urlPosts, requestOptions)
        .then(response => response.json())
        .then(json => {
            let postText = "";
            json.forEach(element => {
                postText += `<li>ユーザー名: ${element.user.name}<br>\n投稿名: ${element.text}</li><br>\n`;
            });
            document.getElementById('posts').innerHTML = postText;
        })
        .catch(error => console.log(`Error: ${error}`));
}


const delete_user = () => {//ユーザー削除
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myId = localStorage.getItem('id');
    const myToken = localStorage.getItem('token');
    const myLocalHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myToken}`
    }
    const delete_user_url = `https://teachapi.herokuapp.com/users/${myId}`
    const requestOptions = {
        method: "DELETE",
        headers: myLocalHeaders,
    };
    fetch(delete_user_url, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById('deleteText').textContent = '消し飛びました( ◠‿◠ )';
        })
        .catch(error => console.log(`Error: ${error}`));
}

const userTimeline = () => {// タイムライン
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const id = localStorage.getItem('id');
    const timelineUrl = `https://teachapi.herokuapp.com/users/${id}/timeline`;
    const myToken = localStorage.getItem('token');
    const myLocalHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myToken}`
    }
    const requestOptions = {
        method: "GET",
        headers: myLocalHeaders,
    }
    fetch(timelineUrl, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let timelineText = json[0].text;
            let timelineName = json[0].user.name;
            let timelinePostId = json[0].id;
            document.getElementById('timelineText').textContent = `${timelineName}: ${timelineText} ポストID:${timelinePostId}`;
        })
}


const postEdit = () => {// 投稿編集
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myId = document.getElementById("postEditID").value;
    const myToken = localStorage.getItem('token');
    const postEditUrl = `https://teachapi.herokuapp.com/posts/${myId}`;
    const myLocalHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myToken}`
    }
    const postEditText = document.getElementById('postEditText').value;
    const bodyData = {
        "post_params": {
            "text": postEditText
        }
    }
    const myBody = JSON.stringify(bodyData);
    const requestOptions = {
        method: "PUT",
        headers: myLocalHeaders,
        body: myBody,
    }
    console.log(requestOptions);
    fetch(postEditUrl, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById('postEditConfirm').textContent = "編集完了！！！！";
        })
        .catch(error => console.log(`Error: ${error}`));
}


const postDelete = () => {// 投稿削除
    if (!localStorage.token) {
        window.location.href = 'login.html';
        alert('ログインしてないお！');
    }
    const myId = document.getElementById('postDeleteId').value;
    const myToken = localStorage.getItem('token');
    const myLocalHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${myToken}`
    }
    const delete_user_url = `https://teachapi.herokuapp.com/posts/${myId}`
    const requestOptions = {
        method: "DELETE",
        headers: myLocalHeaders,
    };
    fetch(delete_user_url, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById('deleteText').textContent = '消し飛びました( ◠‿◠ )';
        })
        .catch(error => console.log(`Error: ${error}`));
}



