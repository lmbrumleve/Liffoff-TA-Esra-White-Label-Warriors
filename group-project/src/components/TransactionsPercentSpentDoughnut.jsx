import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function TransactionsPercentSpentDoughnut() {
  return (
    <>
    <h2>Overall</h2>
        <Doughnut
            data={{
              labels: ["Food", "Transportation", "Lodging", "Recreation", "Souveneirs", "Other"],
              datasets:[
                {
                    label: "Amount",
                    data: [10, 20, 30, 40, 50, 60],
                    // backgroundColor:[
                    //     "rgba(43, 63, 229, 0.8)",
                    //     "rgba(250, 192, 19, 0.8)",
                    //     "rgba(253, 135, 135, 0.8)",
                    // ]

                }
              ]
            }}
        />
        </>
  )
}
