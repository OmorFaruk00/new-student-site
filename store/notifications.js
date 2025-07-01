// store/SupportTicket.js
export const state = () => ({
  supportTicket: [],  // Array of notification objects
})

export const mutations = {
  setSupportTicket(state, ticket) {
    state.supportTicket = ticket
  },
  addSupportTicket(state, ticket) {
    state.supportTicket.unshift(ticket) // newest first
  },
  removeSupportTicket(state, id) {
    state.supportTicket = state.supportTicket.filter(n => n.id !== id)
  },
  markSupportTicketeen(state, id) {
    const notif = state.supportTicket.find(n => n.id === id)
    if (notif) notif.seen = true
  }
}

export const actions = {
  async fatchSupportTicket({ commit }) {
    try {
      const token = this.$cookies.get('token')
      const res = await this.$axios.get('/student/support-ticket-unseen', { params: { token } })
      commit('setSupportTicket', res.data)
    } catch (e) {
      console.error(e)
    }
  },

  async markAsSeen({ commit }, id) {
    try {
      const token = this.$cookies.get('token')
      await this.$axios.get(`/student/support-ticket-seen/${id}`, { params: { token } })
      commit('markSupportTicketeen', id)
      commit('removeSupportTicket', id) // remove after seen
    } catch (e) {
      console.error(e)
    }
  },

  // For real-time push SupportTicket (optional)
  addRealTimeNotification({ commit }, notification) {
    commit('addSupportTicket', notification)
  }
}
