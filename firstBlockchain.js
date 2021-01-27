const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, prevHash = "") {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash
    this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString()
    }

    getIndex() {
        return this.index
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2021", "Genesis Block", "HEAD")
    }

    getLastBlock(){
        return this.chain[this.chain.length -1] //get last element in our chain array
    }

    addBlock(newBlock){ //add a new block in our chain
        newBlock.prevHash = this.getLastBlock().hash // set our previous has to the hash value of our last block (think linked list)
        newBlock.hash = newBlock.calculateHash()
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
werthCoin.addBlock(new Block(1, "2020-01-01", [40]))
werthCoin.addBlock(new Block(2, "2020-01-01", [50]))

console.log(werthCoin)
console.log(werthCoin.validateChain())

werthCoin.chain[1].data = [5000]
werthCoin.chain[1].hash = werthCoin.chain[1].calculateHash() // Cannot change value - Even if recalculating hash

console.log(werthCoin.validateChain())

console.log(werthCoin)