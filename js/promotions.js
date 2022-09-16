function promotion(){
    let promotionImg = ['/data/prom/1.png','/data/prom/2.png','/data/prom/3.png']
const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
let index = 1
img1.src = promotionImg[0]
const slideshow = () =>{
    img2.src = promotionImg[index]
    img2.classList.add('active')
    index++
    console.log(index)
    if(index == promotionImg.length){
        index = 0
    }
    setTimeout(()=>{
        img1.src = img2.src
        img2.classList.remove('active')
    },1000)
}
setInterval(slideshow, 4000)
}
export const promotionFunction = promotion()