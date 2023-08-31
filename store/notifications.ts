import { defineStore } from 'pinia'
import { Notification } from '../types/notification'

export const useNotificationsStore = defineStore('notification-store', {
  state: () => ({
    isNotifications: ref([] as Notification[] | null),
  }),
  getters: {
    getNotifications(state) {
      return state.isNotifications
    },
  },
  actions: {
    async setNotifications(userId: string) {
      const { data: notifications } = await useNotifications(userId)
      this.isNotifications = notifications
    },
  },
})
