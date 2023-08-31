const excludedRoutes = ['/']
const login = '/'

const isExcluded = (to: string): boolean => {
  return excludedRoutes?.some((path): boolean => {
    const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)

    console.log('regex', regex, to, regex.test(to))

    return regex.test(to)
  })
}

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (isExcluded(to.path)) return
  console.log('protected route')

  const user = useSupabaseUser()
  if (!user.value) {
    console.log('no user')
    return navigateTo(login)
  }
  console.log('have user:', user)
})
