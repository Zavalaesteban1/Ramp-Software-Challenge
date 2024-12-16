import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const [approved, setApproved] = useState(transaction.approved)
  // 1. Added new state for checkbox control
  // NEW: Controls visibility of approve/decline buttons
  const [checked, setChecked] = useState(false)

  // 2. Split the original onChange handler into separate functions for approve and decline
  const handleApprove = async () => {
    await consumerSetTransactionApproval({
      transactionId: transaction.id,
      newValue: true,
    })
    setApproved(true)
    // Hides the buttons after action
    setChecked(false)
  }

  const handleDecline = async () => {
    await consumerSetTransactionApproval({
      transactionId: transaction.id,
      newValue: false,
    })
    setApproved(false)
    // Hides the buttons after action
    setChecked(false)
  }

  // 3. Added new handler for checkbox
  const handleCheckboxChange = (newValue: boolean) => {
    setChecked(newValue)
  }

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
        {/* Added status display in the content section */}
        <p style={{ 
          color: approved ? '#4CAF50' : '#f44336',
          fontWeight: 'bold',
          marginTop: '5px'
        }}>
          Status: {approved ? 'Approved' : 'Not Approved'}
        </p>
      </div>
      {/*5. Restructured the checkbox and buttons area */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* 6. Added conditional rendering for approve/decline buttons */}
        {checked && (
          <div style={{ display: 'flex', gap: '5px' }}>
            {/* 7. Added Approve button with styling */}
            <button 
              className="RampButton" 
              onClick={handleApprove}
              disabled={loading}
              style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Approve
            </button>
            {/* 8. Added Decline button with styling */}
            <button 
              className="RampButton"
              onClick={handleDecline}
              disabled={loading}
              style={{ 
                backgroundColor: '#f44336',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Decline
            </button>
          </div>
        )}
         {/* 9. Modified checkbox implementation */}
        <div 
          onClick={() => handleCheckboxChange(!checked)}
          style={{ cursor: 'pointer' }}
        >
          <InputCheckbox
            id={transaction.id}
            // Now controlled by checked state instead of approved
            checked={checked}
            disabled={loading}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}
)