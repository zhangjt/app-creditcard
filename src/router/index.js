import Vue from 'vue'
import Router from 'vue-router'

import LoansMarket from '@/view/LoansMarket'
import MyCreditCard from '@/view/MyCreditCard'
import MyCreditCardRecord from '@/view/MyCreditCardRecord'

const CreditCardIndex = r => require.ensure([], () => r(require('@/view/CreditCardIndex')), 'CreditCardIndex')
const BankInfo = r => require.ensure([], () => r(require('@/view/BankInfo')), 'bankInfo')
const loanHome = r => require.ensure([], () => r(require('@/view/loanHome')), 'loanHome')
const CreditCardInfo = r => require.ensure([], () => r(require('@/view/CreditCardInfo')), 'creditCardInfo')
const MyNetLoanRecord = r => require.ensure([], () => r(require('@/view/MyNetLoanRecord')), 'MyNetLoanRecord')
const MyLoanRebate = r => require.ensure([], () => r(require('@/view/MyLoanRebate')), 'myLoanRebate')
const MyLoanRecord = r => require.ensure([], () => r(require('@/view/MyLoanRecord')), 'myLoanRecord')
const UserAgreement = r => require.ensure([], () => r(require('@/view/UserAgreement')), 'userAgreement')
const LoanStateDetail = r => require.ensure([], () => r(require('@/view/LoanStateDetail')), 'LoanStateDetail')
const CreditCardProgressPage = r => require.ensure([], () => r(require('@/view/CreditCardProgressPage')), 'CreditCardProgressPage')


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/wap/cardmarket/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: BankInfo
    },
    {
      path: '/creditCardIndex',
      name: 'CreditCardIndex',
      meta: {
        title: '信用卡首页',
        keepAlive: false // 不需要缓存
      },
      component: CreditCardIndex
    },
    {
      path: '/bankInfo',
      name: 'BankInfo',
      meta: {
        title: '银行详情',
        keepAlive: false // 不需要缓存
      },
      component: BankInfo
    },
    {
      path: '/loanHome',
      name: 'loanHome',
      meta: {
        title: '贷款首页',
        keepAlive: false // 不需要缓存
      },
      component: loanHome
    },

    {
      path: '/loansMarket',
      name: 'LoansMarket',
      component: LoansMarket
    },
    {
      path: '/myCreditCard',
      name: 'MyCreditCard',
      component: MyCreditCard
    },
    {
      path: '/creditCardInfo',
      name: 'creditCardInfo',
      component: CreditCardInfo
    },
    {
      path: '/myCreditCardRecord',
      name: 'MyCreditCardRecord',
      component: MyCreditCardRecord
    },
    {
      path: '/myNetLoanRecord',
      name: 'MyNetLoanRecord',
      component: MyNetLoanRecord
    },
    {
      path: '/myLoanRebate',
      name: 'MyLoanRebate',
      component: MyLoanRebate
    },

    {
      path: '/myLoanRecord',
      name: 'MyLoanRecord',
      component: MyLoanRecord
    },
    {
      path: '/userAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: '/loanStateDetail',
      name: 'loanStateDetail',
      component: LoanStateDetail
    },
    {
      path: '/creditCardProgressPage',
      name: 'creditCardProgressPage',
      component: CreditCardProgressPage
    }
  ]
})
