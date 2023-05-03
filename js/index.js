const uploadBtn = document.getElementById('upload-btn');
const preview = document.getElementById('preview');
const previewImg = document.getElementById('preview-img');
const downloadBtn = document.getElementById('download-btn');
const overlay = document.getElementById("overlay");
const result = document.getElementById("result");
const productPic = document.getElementById("product-pic");

let subPicList = productPic.childNodes;

let imgScale = 0.20;

function setImageWidth() {
    setTimeout(function () {
        imgScale = 650 / previewImg.naturalWidth;
        const curWidth = previewImg.naturalWidth * imgScale;
        previewImg.style.width = `${curWidth}px`;
        result.style.backgroundSize = `${curWidth}%`;
        rectangleBtn.click();
    }, 5);
}

window.addEventListener('load', setImageWidth);


overlay.addEventListener("mousedown", function (e) {
    let shiftX = e.clientX - overlay.getBoundingClientRect().left + previewImg.getBoundingClientRect().left;
    let shiftY = e.clientY - overlay.getBoundingClientRect().top + previewImg.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        let newLeft = pageX - shiftX;
        let newTop = pageY - shiftY;
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft > previewImg.width - overlay.offsetWidth) newLeft = previewImg.width - overlay.offsetWidth;
        if (newTop > previewImg.height - overlay.offsetHeight) newTop = previewImg.height - overlay.offsetHeight;
        overlay.style.left = newLeft + 'px';
        overlay.style.top = newTop + 'px';
        result.style.backgroundPosition = `-${overlay.offsetLeft}px -${overlay.offsetTop}px`;
        for (const each of subPicList) {
            each.style.backgroundPosition = `-${overlay.offsetLeft}px -${overlay.offsetTop}px`;
        }
    }

    // moveAt(e.pageX, e.pageY);

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    overlay.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
        overlay.removeEventListener('mouseup', arguments.callee);
    });
});

overlay.ondragstart = function () {
    return false;
};

overlay.addEventListener('mouseover', function () {
    overlay.addEventListener('mouseleave', function () {
        overlay.dispatchEvent(new MouseEvent('mouseup'));
        overlay.removeEventListener('mouseleave', arguments.callee);
    });
});

result.style.backgroundPosition = `-${overlay.offsetLeft}px -${overlay.offsetTop}px`;

uploadBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            preview.style.display = 'block';
            previewImg.src = reader.result;
            document.querySelector("body").style.setProperty("--image-url", `url(${previewImg.src})`);
            setImageWidth();
        };
    };
    input.click();
});

// downloadBtn.addEventListener('click', () => {
//     const a = document.createElement('a');
//     a.download = 'transformed-image.png';
//     a.href = previewImg.src;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// });

triangleBtn0.addEventListener('click', () => {
    overlay.style.height = `57.7350px`;
    result.style.height = `57.7350px`;
    overlay.style.clipPath = `polygon(100% 0, 0 100%, 100% 100%)`;
    // result.style.clipPath = `polygon(100% 0, 0 100%, 100% 100%)`;
    result.style.clipPath = `polygon(100% 0, -0.5px calc(100% + 0.5px), calc(100% + 0.5px) calc(100% + 0.5px))`;

    productPic.innerHTML = "";
    let deg = -90;
    for (let i = 0; i < 12; ++i) {
        let elem = document.createElement('div');
        elem.style.cssText = result.style.cssText;
        elem.classList.add("clipped-image");
        elem.classList.add("triangle-image");
        elem.style.transform = `rotate(${deg}deg)`;
        elem.style.transformOrigin = `bottom left`;
        if (i & 1 == 1) {
            elem.style.transform += ` scaleY(-1)`;
            deg += 60;
        }
        productPic.appendChild(elem);
    }
    subPicList = productPic.childNodes;
});

rectangleBtn.addEventListener('click', () => {
    overlay.style.height = `61.8px`;
    result.style.height = `61.8px`;
    overlay.style.clipPath = ``;
    result.style.clipPath = ``;

    productPic.innerHTML = "";
    let nodeList = [];
    for (let i = 0; i < 4; ++i) {
        let elem = document.createElement('div');
        elem.style.cssText = result.style.cssText;
        elem.classList.add("clipped-image");
        nodeList.push(elem);
    }
    nodeList[1].style.transform = `scaleX(-1)`;
    nodeList[2].style.transform = `scaleY(-1)`;
    nodeList[3].style.transform = `scaleX(-1) scaleY(-1)`;
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    for (const node of nodeList) {
        gridContainer.appendChild(node);
    }
    productPic.appendChild(gridContainer);
    subPicList = nodeList;
});

triangleBtn1.addEventListener('click', () => {
    overlay.style.height = `100px`;
    result.style.height = `100px`;
    overlay.style.clipPath = `polygon(100% 0, 0 100%, 100% 100%)`;
    // result.style.clipPath = `polygon(100% 0, 0 100%, 100% 100%)`;
    result.style.clipPath = `polygon(100% 0, -0.5px calc(100% + 0.5px), calc(100% + 0.5px) calc(100% + 0.5px))`;

    productPic.innerHTML = "";
    let deg = 0;
    for (let i = 0; i < 8; ++i) {
        let elem = document.createElement('div');
        elem.style.cssText = result.style.cssText;
        elem.classList.add("clipped-image");
        elem.classList.add("triangle-image");
        elem.style.transform = `rotate(${deg}deg)`;
        elem.style.transformOrigin = `bottom left`;
        if (i & 1 == 1) {
            elem.style.transform += ` scaleY(-1)`;
            deg += 90;
        }
        productPic.appendChild(elem);
    }
    subPicList = productPic.childNodes;
});

triangleBtn2.addEventListener('click', () => {
    overlay.style.height = `86.6025px`;
    result.style.height = `86.6025px`;
    overlay.style.clipPath = `polygon(50% 0, 0 100%, 100% 100%)`;
    // result.style.clipPath = `polygon(50% 0, 0 100%, 100% 100%)`;
    result.style.clipPath = `polygon(50% 0, -0.5px calc(100% + 0.5px), calc(100% + 0.5px) calc(100% + 0.5px))`;

    productPic.innerHTML = "";
    let deg = -60;
    for (let i = 0; i < 6; ++i) {
        let elem = document.createElement('div');
        elem.style.cssText = result.style.cssText;
        elem.classList.add("clipped-image");
        elem.classList.add("triangle-image");
        elem.style.transformOrigin = `bottom left`;
        // elem.style.transform = `rotate(${i * 60 - 60}deg)`;
        elem.style.transform = `rotate(${deg}deg)`;
        if (i & 1 == 1) {
            elem.style.transform += ` scaleY(-1)`;
            deg += 120;
        }
        productPic.appendChild(elem);
    }
    subPicList = productPic.childNodes;
});