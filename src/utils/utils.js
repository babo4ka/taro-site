export const saveToLocalStorage = (key, data) =>{
    let item = JSON.parse(localStorage.getItem(key))

    if(item == undefined){
        localStorage.setItem(key, 
            JSON.stringify(
                {
                    last:1,
                    1:data
                }
            ))
    }else{
        let next = item.last + 1
        item.last = next
        item[next] = data

        localStorage.setItem(key, 
            JSON.stringify(
                item
            ))
    }
}

export const removeFromLocalStorage = (key, internalKey) =>{
    console.log("removing ", internalKey)
    let item = JSON.parse(localStorage.getItem(key))

    if(item != undefined){
        delete item[internalKey]
    }



    for(let i=internalKey; i<item.last; i++){
        item[i] = item[parseInt(i)+1]
    }


    delete item[item.last]

    item.last = parseInt(item.last)-1
    
    localStorage.setItem(key, 
        JSON.stringify(item))
}

export const removeAll = (key) =>{
    localStorage.removeItem(key)
}

export const getFromLocalStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}