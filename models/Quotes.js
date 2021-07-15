
const fs = require('fs');
const path = require('path');

const pathToFile = path.join(
    path.dirname(require.main.filename),
    'data',
    'quotes.json'
);

const aseguradoras = [
    'seguros atlas', 'qualitas', 'mapfre'
];

const autos = [
    'chevrolet', 'dodge', 'ford', 'gmc', 'honda'
]

module.exports = class Qoutes{    

    static getAll(){
        return new Promise((resolve, reject) => {
            
            fs.readFile(pathToFile , (err, data) => {
                if(err){
                    console.log(err)
                    //reject la promesa
                    reject(err);                    
                }
                //resolvemos la promesa con las datos como array
                const result = JSON.parse(data);                
                resolve(result.filter(x => aseguradoras.includes(x.company.toLowerCase()) && autos.includes(x.brand.toLowerCase()) ? x : null ));             
            });
           
        });       
    }

    static getRC (data){
        return data.filter(x => x.coverageType.toLowerCase() === 'rc');
    }
    static getLow (data){
        return data.filter(x => x.coverageType.toLowerCase() === 'low');
    }
    static getMid (data){
        return data.filter(x => x.coverageType.toLowerCase() === 'mid');
    }
    static getHigh (data){
        return data.filter(x => x.coverageType.toLowerCase() === 'high');
    }
}