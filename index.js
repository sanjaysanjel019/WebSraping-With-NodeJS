const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

const url = 'https://news.ycombinator.com/';

axios.get(url)
    .then(res=>{
        
        let getData = html =>{
            data = [];
            const $ =cheerio.load(html);
            $('table.itemlist tr td:nth-child(3)').each((i,elem) =>{
                data.push({
                    title:$(elem).text(),
                    link:$(elem).find('a.storylink').attr('href')
                })
            })
            let newData = JSON.stringify(data)
            fs.writeFile('ycombinator.json',newData, (err)=>{
                if(err) console.log(err);
                console.log("Data Received");
            })
        }
        
        getData(res.data);  
      }).catch(err=>{
        console.log(err);
    })

