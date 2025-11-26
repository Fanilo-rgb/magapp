import {create} from "zustand"

import type {userRoleType} from "../types/types.ts";
import {persist} from "zustand/middleware";

export type userInfoType = {
  token: string,
  user: {
    _id: string,
    name: string,
    email: string,
    role: userRoleType
  }
}

type storeType = {
  information: Partial<userInfoType> | null
  createInfo: (info: userInfoType) => userInfoType
  setInfo: (info: userInfoType["user"]) => void
  getToken: () => string
  setToken: (token: string) => void
  deleteInfo: () => void
}

export const useUserInfoStore = create<storeType>() (
  persist(
    (set, get) => ({
      information: null,

      createInfo: (info) => {
        set((state) => ({
          information: { ...state.information , ...info }
        }))

        return info
      },

      setInfo: (info) => {
        set(state => ({
          information: {
            ...state.information,
            user: {...info}
          }
        }))
      },

      getToken: () => get().information?.token ?? "",

      setToken: (token) => set(state => ({
        information: {
          ...state.information,
          token
        }
      })),

      deleteInfo: () => set({ information: null })
    }),
    {
      name: "user-information"
    }
  )
)