

export const getBaseUrl=(type)=>{
    switch(type){
        case 'socket': return localStorage.getItem('socketUrl');
        case 'chatHistory': return localStorage.getItem('chatHistoryUrl');
        default: return localStorage.getItem('botDetailsUrl')
    }
}