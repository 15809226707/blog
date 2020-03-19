sessionStorage.removeItem("CLOUDEMPEROR_TOKEN")

function login(){
    var value = document.getElementById('password').value;
    var ps = window.btoa('CloudEmperor='+ value)
    switch (ps){
        //CurriculumVitae page
        case 'Q2xvdWRFbXBlcm9yPXpoeTU1NDk3MTM3NQ==' : 
            sessionStorage.setItem("CLOUDEMPEROR_TOKEN", "Q2xvdWRFbXBlcm9yPXpoeTU1NDk3MTM3NQ==");
            window.location.href = 'https://cloudemperor.github.io/blog/views/curriculumVitae/index.html'
            break;
        //Image Watermarking page
        case 'Q2xvdWRFbXBlcm9yPWltZw==':
            window.location.href = 'https://cloudemperor.github.io/blog/views/watermarking/index.html'
            break;
        default :
            alert('口令或者密码输入有误')
    }
    
}

function keydownLogin(ev){
    var e = ev || window.event;
    if (e.keyCode === 13){
        login()
    }
    
}