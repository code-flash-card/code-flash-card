export const textToColor = (colors:string[],str:string):string =>{
    const textToNum = (str:string)=>{
        return str.split('').reduce((total,s)=>s.charCodeAt(0)+total,0)
    }
    const calculatedIndex = textToNum(str) % colors.length
    return colors[calculatedIndex]
}
