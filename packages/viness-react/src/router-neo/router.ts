import { createRouter, createGroup, useLinkProps, useFocusReset, useLocation } from '@swan-io/chicane'
import { match, P } from 'ts-pattern'

const userRouteGroup = createGroup('User', '/users', {
    List: '/',
    Detail: '/:userId?:sortBy&:status[]'
})

const router = createRouter({
    Home: '/',
    ...userRouteGroup
})

const routes = router.useRoute(['Home', 'UserDetail'])

match(routes).with({ name: 'Home' }, () => '')

export { createRouter, createGroup, useLinkProps, useFocusReset, useLocation, match, P as Pattern }
