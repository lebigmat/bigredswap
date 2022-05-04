# 🎈 It Swaps | forked from 🏗 scaffold-eth | for 🏰 BuidlGuidl

## Submission for 🚩 **Challenge 3: Minimum Viable Exchange**
Available on https://bigred-swap.surge.sh.

Contracts deployed on [Rinkeby](https://rinkeby.etherscan.io/address/0xab0baf912feade9B2df142073682d67BE6f787c8) at [0xab0baf912feade9B2df142073682d67BE6f787c8](https://rinkeby.etherscan.io/address/0xab0baf912feade9B2df142073682d67BE6f787c8).

![BigRed Swap screenshot!](/images/screenshot.png)

See [🏗 scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) for complete instructions.

### **Tabs**
#### 📑 Swap
Swap Balloons for Eth and Eth for Balloons.
The curve shows the estimated result of the swap.
#### 📑 Liquidity
Add and withdraw liquidity to and from the pool.
You can view your current share of the liquidity.

#### 📑 Eventlist
Monitor on-chain events including approvals requested by the frontend.

#### 📑 Debug Contracts
Raw access to all contracts methods and properties.

### **📦 Install**

> ❗️ NOTE: The current front-end may need to be refreshed as you carry out transactions to update your balance of balloons in the UI, etc.

```bash
git clone https://github.com/lebigmat/bigredswap.git bigredswap
cd bigredswap
yarn install
```

---

### **🔭 Environment 📺**

You'll have three terminals up for:

`yarn start` (react app frontend)

`yarn chain` (hardhat backend)

`yarn deploy` (to compile, deploy, and publish your contracts to the frontend)
