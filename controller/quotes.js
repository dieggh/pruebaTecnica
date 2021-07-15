const { getAll, getRC, getLow, getMid, getHigh } = require("../models/Quotes");



module.exports.getBestOptionsPerYear = async (req, res) =>{

    try {
        const { year } = req.params; //obtener año de los parámetros
        
        //leer archivo
        const data = await getAll();        
        const intYear = parseInt(year);
        //filtramos el arreglo para obtener solo los datos que cumplen con el parametro año
        const filteredData = data.filter(x => intYear >= x.yearRange[0] && x.yearRange[1] >= intYear); 
        
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

module.exports.getQuoteCar = async (req, res) =>{
    try {
        const { year, brand, hasAC } = req.params; //obtener datos de los parámetros
        
        //leer archivo
        const data = await getAll();
        const intYear = parseInt(year);
        //filtramos el arreglo para obtener solo los datos que cumplen con el parametro año y marca
        const filteredData = data.filter(x => intYear >= x.yearRange[0] && x.yearRange[1] >= intYear && x.brand.toLowerCase() === brand.toLowerCase()); 
        //realizamos la lógica para obtener los valores filtrados por coverageType y después los reducimos para obtener el más economico 
        const bestRc = getBestCotizacion(getRC(filteredData), hasAC );
        const bestLow = getBestCotizacion(getLow(filteredData), hasAC );
        const bestMid = getBestCotizacion(getMid(filteredData), hasAC );
        const bestHigh = getBestCotizacion(getHigh(filteredData), hasAC );

        res.status(200).json([bestRc, bestLow, bestMid, bestHigh]);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false
        });
    }
}


//get the cotiazcion with the lower price
const getBestCotizacion = (data, options = false) => {
    
    if(data.length === 0){
        return null;
    }
    let bestCot = {};
    if(options){
        bestCot = data.reduce((previous, current) => {
            //convertimos a número el precio y el extra, los sumamos y se realiza un redondeo a 2 decimales
            const previousValue = (parseFloat(previous.price.replace(',', '')) + parseFloat(previous.extraCoveragePrice.replace(',', ''))).toFixed(2);
            const currentValue = (parseFloat(current.price.replace(',', '')) + parseFloat(current.extraCoveragePrice.replace(',', ''))).toFixed(2);
          
            //validamos que valor es menor                           
            if(previousValue < currentValue){
                return previous;
            }else{
                return current;
            }            
        });
    }else{
        bestCot = data.reduce((previous, current) => {
            //convertimos a número el precio 
            const previousValue = parseFloat(previous.price.replace(',', ''));
            const currentValue = parseFloat(current.price.replace(',', ''));
           //comparamos que valor es menor
            if(previousValue < currentValue){
                return previous;
            }else{
                return current;
            }
        });
    }
    //regresamos el resultado
    return bestCot;
}