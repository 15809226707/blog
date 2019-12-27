sessionStorage.removeItem("CLOUDEMPEROR_TOKEN")

function login(){
    var value = document.getElementById('password').value;
    var ps = window.btoa('CloudEmperor='+ value)
    if (ps === 'Q2xvdWRFbXBlcm9yPXpoeTU1NDk3MTM3NQ=='){ 
        sessionStorage.setItem("CLOUDEMPEROR_TOKEN", "Q2xvdWRFbXBlcm9yPXpoeTU1NDk3MTM3NQ==");
        window.location.href = 'https://github.com/CloudEmperor/blog/blob/master/views/curriculumVitae/index.html'
    }else{
        alert('密码输入有误')
    }
}

function keydownLogin(ev){
    var e = ev || window.event;
    if (e.keyCode === 13){
        login()
    }
    
}