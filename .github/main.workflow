action "create-preview-links" {
  uses = "./actions/preview-links"
  secrets = ["GITHUB_TOKEN"]
}

workflow "New workflow" {
  resolves = ["create-preview-links"]
  on = "pull_request"
}
