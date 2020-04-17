/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const getTotalCovidBali = async () => {
   const browser = await puppeteer.launch({headless: true})
   const page = await browser.newPage()
   await page.goto('https://pendataan.baliprov.go.id/', {
    waitUntil: 'load',
    timeout: 0
   })
   const content = await page.content()
       .then(html => {
           const $ = cheerio.load(html)
           let totalData = []
           let kab = []
           let positif = []
           let perawatan = []
           let sembuh = []
           let meninggal = []

           $('body > div > div > div > div > div > div > div > div.card-body > h3').each((i,e) => {
               totalData.push($(e).text().trim())
           })

           // Data list kabupaten
            $('body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(1)').each((i,e) => {
                kab.push($(e).text().trim())
            })

            // Data jumlah positif
            $('body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(2)').each((i,e) => {
                positif.push($(e).text().trim())
            })
            
            // Data jumlah perawatan
            $('body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(3)').each((i,e) => {
                perawatan.push($(e).text().trim())
            })

            // Data Jumlah sembuh
            $('body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(4)').each((i,e) => {
                sembuh.push($(e).text().trim())
            })

            // Data jumlah meninggal
            $('body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(5)').each((i,e) => {
                meninggal.push($(e).text().trim())
            })

           data = {}
           data.provinsi = "bali"
           data.positif = totalData[0].replace(' Org','')
           data.perawatan = totalData[1].replace(' Org','')
           data.sembuh = totalData[2].replace(' Org','')
           data.meninggal = totalData[3].replace(' Org','')
           data.kabupaten = []

           let i
           for(i = 0; i < kab.length; i++){
                data.kabupaten[i] = {
                    kabupaten: kab[i],
                    positif: positif[i],
                    perawatan: perawatan[i],
                    sembuh: sembuh[i],
                    meninggal: meninggal[i]
                }
            }

           return data
       })

   return content
}

module.exports = getTotalCovidBali