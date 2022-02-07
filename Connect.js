import abi from "./abi/abi.json" assert {type: "json"};

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined"){
        rej("Please Install and Connect to MetaMask!")
    }
    window.ethereum.request({method: "eth_requestAccounts"});
    //res("wallect connected");

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0xE9E7a1f955e479a27489eB57B03753001E5FC86f");

    web3.eth.getAccounts().then((accounts) => {
        console.log("account[0]:" + accounts[0]);
        contract.methods
            .totalSupply()
            .call({from: accounts[0]})
            .then((supply) => {
            console.log("supply:" + supply);
                contract.methods
                    .walletOfOwner(accounts[0])
                    .call({from: accounts[0]})
                    .then((myTokenId) => {
                        res({supply: supply, myTokenId: myTokenId});
                });
            });
        });
    console.log(res.myTokenId);

});

export default connect;