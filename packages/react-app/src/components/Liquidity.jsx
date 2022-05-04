import { Card, Col, Input, Row } from "antd";
import { useBalance, useContractReader } from "eth-hooks";
import { useTokenBalance } from "eth-hooks/erc/erc-20/useTokenBalance";
import { ethers } from "ethers";
import React, { useState } from "react";
import Address from "./Address";
import TokenBalance from "./TokenBalance";

const contractName = "DEX";
const tokenName = "Balloons";

export default function Liquidity(props) {
  let display = [];

  const [values, setValues] = useState({});
  const tx = props.tx;

  const writeContracts = props.writeContracts;

  const contractAddress = props.readContracts[contractName].address;
  const contractBalance = useBalance(props.localProvider, contractAddress);

  const tokenBalance = useTokenBalance(props.readContracts[tokenName], contractAddress, props.localProvider);
  const liquidity = useContractReader(props.readContracts, contractName, "totalLiquidity");
  const userLiquidity = useContractReader(props.readContracts, contractName, "getLiquidity", [props.address]);

  const rowForm = (title, icon, onClick) => {
    return (
      <Row>
        <Col span={8} style={{ textAlign: "right", opacity: 0.333, paddingRight: 6, fontSize: 24 }}>
          {title}
        </Col>
        <Col span={16}>
          <div style={{ cursor: "pointer", margin: 2 }}>
            <Input
              onChange={e => {
                let newValues = { ...values };
                newValues[title] = e.target.value;
                setValues(newValues);
              }}
              value={values[title]}
              addonAfter={
                <div
                  type="default"
                  onClick={() => {
                    onClick(values[title]);
                    let newValues = { ...values };
                    newValues[title] = "";
                    setValues(newValues);
                  }}
                >
                  {icon}
                </div>
              }
            />
          </div>
        </Col>
      </Row>
    );
  };

  if (props.readContracts && props.readContracts[contractName]) {
    display.push(
      <div>
        <h2>
          Total liquidity ~ {liquidity ? parseFloat(ethers.utils.formatEther(liquidity)).toFixed(4) : "none"} / 
          Your liquidity ~ {userLiquidity ? parseFloat(ethers.utils.formatEther(userLiquidity)).toFixed(4) : "none"}
        </h2>
        <h5>({userLiquidity ? "" + (100 * parseFloat(ethers.utils.formatEther(userLiquidity)) / parseFloat(ethers.utils.formatEther(liquidity))).toFixed(8) + "%" : "none"})</h5>

        {rowForm("deposit", "📥", async value => {
          let valueInEther = ethers.utils.parseEther("" + value);
          let valuePlusExtra = ethers.utils.parseEther("" + value * 1.03);
          console.log("valuePlusExtra", valuePlusExtra);
          let allowance = await props.readContracts[tokenName].allowance(
            props.address,
            props.readContracts[contractName].address,
          );
          console.log("allowance", allowance);
          if (allowance.lt(valuePlusExtra)) {
            await tx(
              writeContracts[tokenName].approve(props.readContracts[contractName].address, valuePlusExtra, {
                gasLimit: 200000,
              }),
            );
          }
          await tx(writeContracts[contractName]["deposit"]({ value: valueInEther, gasLimit: 200000 }));
        })}

        {rowForm("withdraw", "📤", async value => {
          let valueInEther = ethers.utils.parseEther("" + value);
          let withdrawTxResult = await tx(writeContracts[contractName]["withdraw"](valueInEther));
          console.log("withdrawTxResult:", withdrawTxResult);
        })}
      </div>,
    );
  }

  return (
    <Card size="large" id="main_card">
      <Card
        title={
          <div>
            <Address value={contractAddress} />
            <div style={{ float: "right", fontSize: 24 }}>
              {parseFloat(ethers.utils.formatEther(contractBalance)).toFixed(4)} ⚖️
              <TokenBalance name={tokenName} img={"🎈"} address={contractAddress} contracts={props.readContracts} />
            </div>
          </div>
        }
        size="large"
        loading={false}
      >
        {display}
      </Card>
    </Card>
  );
}
