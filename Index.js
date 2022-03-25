

// COIN REQUEST
const table = document.getElementById("dataTable")

axios.get('https://api.coingecko.com/api/v3/coins')
    
    .then((res) => { 
        let coins = res.data
        coins.length = 10
            for (let coin of coins) {
            let row = document.createElement("tr")
            row.innerHTML += `
            <td class="coinNameDiv">
                <img class="coinImageTag" src ="${coin.image.small}">
                <div class = "container">
                    <a href = "/coins/${coin.id}"><span class = "coinName">${coin.name}</span></a>
                    <span class = "coinSymbol">${coin.symbol.toUpperCase()}</span>
                </div>
            </td>

            <td>
                $${comas(coin.market_data.current_price.usd)}
            </td>
            <td>
                <div class = "container priceChanges">
                    <span class = "priceAction">${factorise(coin.market_data.price_change_percentage_24h)}%</span>
                    <span class = "priceAction">$${factorise(coin.market_data.price_change_24h_in_currency.usd)}</span>
                </div>
            </td>
            <td>
                <div class = "container priceChanges">
                    <span class = "priceAction">${factorise(coin.market_data.market_cap_change_percentage_24h)}%</span>
                    <span class = "priceAction">${comas(coin.market_data.market_cap.usd)}</span>
                </div>
            </td>
            `
            table.append(row)
        }

    })
    .catch((err) => {
        console.error(err);
    });

// GLOBAL REQUEST
axios.get('https://api.coingecko.com/api/v3/global')
    .then((resp) => {
        document.getElementById("tmarketCryptos").innerHTML = `${comas(resp.data.data.active_cryptocurrencies)}`
        document.getElementById("BTCtdominance").innerHTML = `<span class = "textWrapper">${factorise(resp.data.data.market_cap_percentage.btc)}%</span>`
        document.getElementById("ETHtdominance").innerHTML = `<span class = "textWrapper">${factorise(resp.data.data.market_cap_percentage.eth)}%</span>`
        document.getElementById("tmarketVol").innerHTML = `$${comas(resp.data.data.total_volume.usd)}`
        // document.getElementsByClassName(".tmarketGas")
    }).catch((error) => {
        console.log(error)
    });


axios.get('https://api.coingecko.com/api/v3/search/trending')
    .then((trendRes) => {
        const trendingCoins = trendRes.data.coins
        trendingCoins.length = 6
        for (let trendyCoin of trendingCoins) {
            let trendingCoinsDiv = document.createElement("div")
            trendingCoinsDiv.innerHTML = `    
            <div class="trendingRecipient">
                <img class="coinImageTag" src ="${trendyCoin.item.small}">
                <a href = "/coins/${trendyCoin.item.id}"><h6 class="trendingRecipientTitle">${trendyCoin.item.name}</h6></a>
                <div class = "container trendingRecipientSub">
                    <p>Rank</p><p class="coinRak">#${trendyCoin.item.market_cap_rank}</p>
                </div>
            </div>
            `
            document.getElementById("trending").append(trendingCoinsDiv)
        };
    }).catch((error2) => {
        console.log(error2)
    })

    // Multiple api request (test)
    axios
        .all([
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin`),
            axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin`)
        ])
        .then(axios.spread((...responses) => {
            console.log(responses[0].data, responses[1].data)
        })).catch(err => {
        console.log(err)
    })


function comas(val) {
    return val.toLocaleString()
    // Add comas to the numbers
}

function factorise(value) {
    return value.toFixed(2)
    // Add 2 decimals to whole numbers
} 