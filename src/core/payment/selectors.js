import { createSelector } from 'reselect'

const getUser = (state) => {
  return state.user
}

const getCurrentPayment = (state) => {
  return state.current_payment
}

const getCurrentPayAccount = (state) => {
  return state.current_pay_account
}

export const getPaymentForm = () => createSelector(
  [getCurrentPayment, getUser, getCurrentPayAccount],
  (payment, user, pay_account) => {
    if(!payment.lines) return {}

    let total_amount = payment.lines.reduce((cnt, line) => cnt + line.amount, 0);

    return {
      email: user.email,
      loan_number: user.account_number,
      client_post_date: payment.client_post_date,
      total_amount_due: total_amount,
      pay_account_id: pay_account.id,
      delinquency_code: null,
      lines: payment.lines
    }
  }
)
