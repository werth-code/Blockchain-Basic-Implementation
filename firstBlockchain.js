const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, prevHash = "") {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash
    this.hash = this.calculateHash()
    this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash();
        }
        console.log("Block Mined: " + this.hash)
    }
}



class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2021", "Genesis Block", "HEAD")
    }

    getLastBlock(){
        return this.chain[this.chain.length -1] //get last element in our chain array
    }

    addBlock(newBlock){ //add a new block in our chain
        newBlock.prevHash = this.getLastBlock().hash // set our previous has to the hash value of our last block (think linked list)
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    validateChain() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i-1]

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if(currentBlock.prevHash !== prevBlock.hash) return false;
        }
        return true
    }
}

let werthCoin = new Blockchain()

console.log("Mining...")
werthCoin.addBlock(new Block(1, "2020-01-01", [40]))
console.log("Mining...")
werthCoin.addBlock(new Block(2, "2020-01-01", [50]))

console.log(werthCoin)



// console.log(werthCoin)
// console.log(werthCoin.validateChain())

// werthCoin.chain[1].data = [5000]                             // Tests our chain validation
// werthCoin.chain[1].hash = werthCoin.chain[1].calculateHash() // Cannot change value - Even if recalculating hash

// console.log(werthCoin.validateChain()) 
