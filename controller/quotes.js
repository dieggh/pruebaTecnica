const { getAll, getRC, getLow, getMid, getHigh } = require("../models/Quotes");



module.exports.getBestOptionsPerYear = async (req, res) =>{

    try {
        const { year } = req.params; //obtener año de los parámetros
        
        //leer archivo
        const data = await getAll();        
        //filtramos el arreglo para obtener solo los datos que cumplen con el parametro año
        const filteredData = data.filter(x => year >= x.yearRange[0] && x.yearRange[1] >= year); 
        
        //se obtiene la mejor cotizacion de acuerdo aun arreglo de objetos y la propiedad de precio
        //no se considera el extraCoveragePrice            
        const bestRC = getBestCotizacion(getRC(filteredData));
        const bestLow = getBestCotizacion(getLow(filteredData));
        const bestMid = getBestCotizacion(getMid(filteredData));
        const bestHigh = getBestCotizacion(getHigh(filteredData));

        res.status(200).json({
            status: true,
            bestRC, bestLow,  bestMid, bestHigh
        });

    } catch (error) {
        //manejar errores
        console.log(error)
        res.status(500).json({
            status: false
        });
    }

}

const getBestCotizacion = (data) => {

    if(data.length === 0){
        return null;
    }
    const bestCot = data.reduce((previous, current) => {
            
        const previousValue = parseFloat(previous.price.replace(',', ''));
        const currentValue = parseFloat(current.price.replace(',', ''));
        
        if(previousValue < currentValue){
            return previous;
        }else{
            return current;
        }
    });
    return bestCot;
}