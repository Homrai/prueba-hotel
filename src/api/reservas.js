export const buscarReservas = async ()=>{
    try {
        const response = await fetch('https://apimocha.com/pruebahoteles/reservas');
        const result = await response.json();
        return result
    } catch (error) {
        return {error}
    }
}


export const agregarReservasAPI= async (datos)=>{
    try {
        const data = await fetch("https://apimocha.com/pruebahoteles/reservas", {
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