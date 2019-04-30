action "preview-links" {
  uses = "./actions/preview-links"
}

workflow "New workflow" {
  on = "push"
  resolves = ["preview-links"]
}
