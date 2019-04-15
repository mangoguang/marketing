//防抖函数
export const Debounce = (fn, t) => {
    let delay = t || 300;
    let timer;
    console.log(delay);
    return function () {
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
    
};