action "create-preview-links" {
  uses = "./actions/preview-links"
  secrets = ["GITHUB_TOKEN"]
}

workflow "New workflow" {
  on = "push"
  resolves = ["create-preview-links"]
}
