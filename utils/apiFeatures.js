class APIFeatures { //Create a reuseable module, later we'll import in other controllers
    constructor(query, queryString) {
    //automatically called when create a new obj, 1st mongoose query, 2nd query string from route. 
    this.query = query; //query that we get as an argument for database,
    this.queryString = queryString; //queryString at the request url
    }
    filter(){
           //Filtering.
        const queryObj = {...this.queryString};
            //  console.log(queryObj);
           let queryStr = JSON.stringify(queryObj); //Convert JS object to  Json string
            //  console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
           //let query = Tour.find(JSON.parse(queryStr)); //implementing a simple filter, Tour.find returns a query
           return this; //return this entire obj which then have access to other methods
    }
}
module.exports = APIFeatures;