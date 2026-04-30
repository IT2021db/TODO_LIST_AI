import { ReactNode } from "react";

// 🔹 1. Type
export type RemoteData<T> =
  | { type: "idle"; isFetching?: boolean }
  | { type: "pending"; isFetching?: boolean }
  | { type: "error"; error: string; isFetching?: boolean }
  | { type: "success"; data: T; isFetching?: boolean };

// 🔹 2. Helpery (rd = RemoteData)
export const rd = {
  ofIdle: <T>(): RemoteData<T> => ({
    type: "idle",
  }),

  ofPending: <T>(): RemoteData<T> => ({
    type: "pending",
  }),

  ofError: <T>(error: string): RemoteData<T> => ({
    type: "error",
    error,
  }),

  of: <T>(data: T): RemoteData<T> => ({
    type: "success",
    data,
  }),

  // 🔥 3. Background fetching (not reset UI)
  withFetching: <T>(state: RemoteData<T>): RemoteData<T> => {
    if (state.type === "success") {
      return { ...state, isFetching: true };
    }
    return state;
  },

  // 🔹 4. Rendering helper (remove if)
  journey: <T>(state: RemoteData<T>) => ({
    wait: (loadingView: ReactNode) => ({
      catch: (errorView: (error: string) => ReactNode) => ({
        done: (successView: (data: T) => ReactNode) => {
          switch (state.type) {
            case "idle":
            case "pending":
              return loadingView;

            case "error":
              return errorView(state.error);

            case "success":
              return successView(state.data);
          }
        },
      }),
    }),
  }),
};
