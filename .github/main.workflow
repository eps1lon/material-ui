workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "nuxt/actions-yarn@master"
  args = "workspace @material-ui/core build"
}
