export const auth_config = {
  headers: {
    'x-auth-token': localStorage.getItem("token"),
  }
}