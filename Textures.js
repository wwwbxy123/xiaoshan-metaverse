import abi from "./abi/abi.json" assert {type: "json"};
import connect from './Connect.js'

const texture = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined"){
        rej("Please Install and Connect to MetaMask!")
    }
    window.ethereum.request({method: "eth_requestAccounts"});
    //res("wallect connected2");

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0xE9E7a1f955e479a27489eB57B03753001E5FC86f");
    
    connect.then((response) => {
        let myTokenId = response.myTokenId
        let uris = []
        let promises = []
        myTokenId.forEach((b) => {
            promises.push(web3.eth.getAccounts().then((accounts) => {
                contract.methods
                .tokenURI(b)
                .call({from: accounts[0]})
                .then((uri) => {
                    uris.push(uri)
                });
            }));
        })
        Promise.all(promises).then(() => {
            res({uris: uris});
        })
    })

});

export default texture;