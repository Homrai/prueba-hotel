export const buscarHoteles = async ()=>{
    try {
        const response = await fetch('https://apimocha.com/pruebahoteles/hoteles');
        const result = await response.json();
        return result
    } catch (error) {
        return {error}
    }
}


export const agregarHotelesAPI= async (datos)=>{
    try {
        const data = await fetch("https://apimocha.com/pruebahoteles/hoteles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            body: JSON.stringify(datos),
        });
        const res = await data.json();
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const editarHotelesAPI= async (id, datos)=>{
    try {
        const data = await fetch(`https://apimocha.com/pruebahoteles/hoteles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            body: JSON.stringify(datos),
        });
        return data.ok
        
    } catch (error) {
        console.log(error);
    }
};