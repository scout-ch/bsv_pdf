/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CantonsIdImport } from './routes/cantons.$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CantonsIdRoute = CantonsIdImport.update({
  path: '/cantons/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cantons/$id': {
      id: '/cantons/$id'
      path: '/cantons/$id'
      fullPath: '/cantons/$id'
      preLoaderRoute: typeof CantonsIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, CantonsIdRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cantons/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cantons/$id": {
      "filePath": "cantons.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
