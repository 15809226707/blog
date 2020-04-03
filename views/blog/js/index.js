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
        // Github Technology blog
        case 'Q2xvdWRFbXBlcm9yPWdpdGh1Yg==' :
            window.location.href = 'https://github.com/CloudEmperor/blog'
            break;
        // juejin Technology blog
        case 'Q2xvdWRFbXBlcm9yPWp1ZWppbg==':
            window.location.href = 'https://juejin.im/user/5b7c1540f265da4355387634'
            break;
        // CSDN Technology blog
        case 'Q2xvdWRFbXBlcm9yPWNzZG4=':
            window.location.href = 'https://me.csdn.net/weixin_38008863'
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