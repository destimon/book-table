export const auth_config = () => ({
  headers: {
    'x-auth-token': localStorage.getItem("token"),
  }
})

export const json_content_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}