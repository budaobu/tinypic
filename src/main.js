import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import Home from './views/Home.vue'
import './style.css'

const routes = [
  { path: '/', component: Home }
]

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // Custom setup hooks can go here
  },
)
