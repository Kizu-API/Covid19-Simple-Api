/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://pendataan.baliprov.go.id/";

const getTotalCovidBali = async () => {
  return new Promise(async (resolve, reject) => {
    await axios.get(url).then((html) => {
      if (html.status == 200) {
        const $ = cheerio.load(html.data);
        let totalData = [];
        let kab = [];
        let ppln = [];
        let ppdn = [];
        let transmisiLokal = [];
        let positifLainnya = [];
        let totalPositif = [];
        let dalamPerawatan = [];
        let sembuhKab = [];
        let meninggalKab = [];

        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(2) > div.card-body > div > table > tbody > tr > td"
        ).each((i, e) => {
          totalData.push($(e).text().trim());
        });

        // Data list kabupaten
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(1)"
        ).each((i, e) => {
          kab.push($(e).text().trim());
        });

        // Data jumlah positif
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(2)"
        ).each((i, e) => {
          ppln.push($(e).text().trim());
        });

        // Data jumlah perawatan
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(3)"
        ).each((i, e) => {
          ppdn.push($(e).text().trim());
        });

        // Data Jumlah sembuh
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(4)"
        ).each((i, e) => {
          transmisiLokal.push($(e).text().trim());
        });

        // Data jumlah meninggal
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(5)"
        ).each((i, e) => {
          positifLainnya.push($(e).text().trim());
        });

        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(6)"
        ).each((i, e) => {
          totalPositif.push($(e).text().trim());
        });

        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(7)"
        ).each((i, e) => {
          dalamPerawatan.push($(e).text().trim());
        });

        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(8)"
        ).each((i, e) => {
          sembuhKab.push($(e).text().trim());
        });

        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(9)"
        ).each((i, e) => {
          meninggalKab.push($(e).text().trim());
        });

        data = {};
        data.totalKasus = [];
        data.kabupaten = [];

        let j;
        for (j = 0; j < 1; j++) {
          data.totalKasus[j] = {
            provinsi: totalData[0],
            positif: {
              ppln: parseInt(totalData[1]),
              ppdn: parseInt(totalData[2]),
              transmisiLokal: parseInt(totalData[3]),
              positifLainnya: parseInt(totalData[4]),
              totalPositif: parseInt(totalData[5]),
            },
            dirawat: parseInt(totalData[6]),
            sembuh: parseInt(totalData[7]),
            meninggal: parseInt(totalData[8]),
          };
        }

        let i;
        for (i = 0; i < kab.length; i++) {
          data.kabupaten[i] = {
            kabupaten: kab[i],
            positif: {
              ppln: parseInt(ppln[i]),
              ppdn: parseInt(ppdn[i]),
              transmisiLokal: parseInt(transmisiLokal[i]),
              positifLainnya: parseInt(positifLainnya[i]),
              totalPositif: parseInt(totalPositif[i]),
            },
            perawatan: parseInt(dalamPerawatan[i]),
            sembuh: parseInt(sembuhKab[i]),
            meninggal: parseInt(meninggalKab[i]),
          };
        }
        resolve(data);
      } else {
        reject({
          code: html.status,
        });
      }
    });
  });
};

module.exports = getTotalCovidBali;
